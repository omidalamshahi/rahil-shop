import axios from 'axios';
import { steamMutation } from './reducer';
import { getSteamMarketItemInfo } from '../../hooks/getSteamMarketItemInfo';

const safeAdd = (...args) =>
  args.reduce((sum, n) => sum + Math.round(n * 1000), 0) / 1000;

export const getDataBase = () => {
  console.log('getDataBase-action');
  return async (dispatch) => {
    dispatch(steamMutation.getDataBaseStart());
    try {
      const registeredItems =
        JSON.parse(localStorage.getItem('registeredItems')) || {};
      const historyTimeline =
        JSON.parse(localStorage.getItem('historyTimeline')) || {};
      // console.log(historyTimeline);
      const itemsHistory =
        JSON.parse(localStorage.getItem('itemsHistory')) || {};
      const transactions =
        JSON.parse(localStorage.getItem('transactions')) || {};
      dispatch(
        steamMutation.getDataBaseSuccess({
          registeredItems,
          historyTimeline,
          itemsHistory,
          transactions,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(steamMutation.getDataBaseFailure(error));
    }
  };
};

// _______________________________________________________________
export const registerItem = ({ newItem }) => {
  console.log('registerItem-action');
  return (dispatch, getState) => {
    const oldRegisteredItems = getState().steam.registeredItems.data || {};
    dispatch(steamMutation.registerItemStart());
    const requiredFields = [
      'itemId',
      'gameId',
      'imgId',
      'itemName',
      'itemHashName',
      'itemRegisteredDate',
      'itemType',
    ];
    if (requiredFields.some((f) => !newItem[f])) return;

    try {
      const newRegisteredItems = {
        ...oldRegisteredItems,
        [newItem.itemId]: {
          itemId: newItem.itemId,
          gameId: newItem.gameId,
          imgId: newItem.imgId,
          itemName: newItem.itemName,
          itemHashName: newItem.itemHashName,
          itemRegisteredDate: newItem.itemRegisteredDate,
          itemType: newItem.itemType,
        },
      };
      // console.log(newRegisteredItems);
      localStorage.setItem(
        'registeredItems',
        JSON.stringify(newRegisteredItems)
      );

      if (
        Object.values(oldRegisteredItems).find(
          (item) => item.itemId === newItem.itemId
        )
      ) {
        // alert('Item already exists.');
        return;
      }
      dispatch(
        steamMutation.registerItemSuccess({ newData: newRegisteredItems })
      );
    } catch (error) {
      console.log(error);
      dispatch(steamMutation.registerItemFailure(error));
    }
  };
};

export const deleteRegisteredItems = ({ itemId }) => {
  console.log('deleteRegisteredItems-action');
  return async (dispatch, getState) => {
    dispatch(steamMutation.removeRegisteredItemStart());
    try {
      // RegisteredItems
      const oldRegisteredItems = getState().steam.registeredItems.data;
      const { [itemId]: deletedRegisteredItems, ...newRegisteredItems } =
        oldRegisteredItems;
      // Transactions
      const oldTransactions = getState().steam.transactions.data;
      const transactionsToRemove = Object.keys(oldTransactions).filter(
        (transactionId) => transactionId.includes(itemId)
      );
      const newTransactions = Object.fromEntries(
        Object.entries(oldTransactions).filter(
          ([key]) => !transactionsToRemove.includes(key)
        )
      );
      // HistoryTimeline
      const oldHistoryTimeline = getState().steam.historyTimeline.data;
      const newHistoryTimeline = Object.keys(oldHistoryTimeline).reduce(
        (acc, key) => {
          acc[key] = oldHistoryTimeline[key].filter((item) => {
            return !transactionsToRemove.includes(item);
          });
          return acc;
        },
        {}
      );
      // itemsHistory
      const oldItemsHistory = getState().steam.itemsHistory.data;
      const { [itemId]: deletedItemsHistory, ...newItemsHistory } =
        oldItemsHistory;

      dispatch(
        steamMutation.removeRegisteredItemSuccess({
          newRegisteredItems,
          newTransactions,
          newHistoryTimeline,
          newItemsHistory,
        })
      );

      localStorage.setItem(
        'registeredItems',
        JSON.stringify(newRegisteredItems)
      );
      localStorage.setItem('transactions', JSON.stringify(newTransactions));
      localStorage.setItem(
        'historyTimeline',
        JSON.stringify(newHistoryTimeline)
      );
      localStorage.setItem('itemsHistory', JSON.stringify(newItemsHistory));
    } catch (error) {
      console.log(error);
      dispatch(steamMutation.removeRegisteredItemFailure(error));
    }
  };
};

//not functional
export const updateRegisteredItems = ({ newData }) => {
  console.log('updateRegisteredItems-action');
  return async (dispatch, getState) => {
    dispatch(steamMutation.updateRegisteredItemsStart());
    try {
      localStorage.setItem('registeredItems', JSON.stringify(newData));
      dispatch(steamMutation.updateRegisteredItemsSuccess({ newData }));
    } catch (error) {
      console.log(error);
      dispatch(steamMutation.updateRegisteredItemsFailure(error));
    }
  };
};

// _______________________________________________________________
//not functional
export const updateItemsHistory = ({ newData }) => {
  console.log('updateItemsHistory-action');
  return async (dispatch, getState) => {
    dispatch(steamMutation.updateItemsHistoryStart());
    try {
      localStorage.setItem('itemsHistory', JSON.stringify(newData));
      dispatch(steamMutation.updateItemsHistorySuccess({ newData }));
    } catch (error) {
      console.log(error);
      dispatch(steamMutation.updateItemsHistoryFailure(error));
    }
  };
};

//_______________________________________________________________
//not functional
export const updateHistoryTimeline = ({ newData }) => {
  console.log('updateHistoryTimeline-action');
  return async (dispatch, getState) => {
    dispatch(steamMutation.updateHistoryTimelineStart());
    try {
      localStorage.setItem('historyTimeline', JSON.stringify(newData));
      dispatch(steamMutation.updateHistoryTimelineSuccess({ newData }));
    } catch (error) {
      console.log(error);
      dispatch(steamMutation.updateHistoryTimelineFailure(error));
    }
  };
};
//_______________________________________________________________

export const addTransaction = ({ transactionData }) => {
  return async (dispatch, getState) => {
    dispatch(steamMutation.addTransactionStart());
    try {
      if (
        (transactionData.transactionType !== 'buy' &&
          transactionData.transactionType !== 'sell') ||
        transactionData.itemId === '' ||
        transactionData.transactionId === '' ||
        transactionData.transactionPrice === ''
      ) {
        throw 'incorrect input';
      }

      const {
        itemInspectUrl,
        transactionType,
        transactionId,
        transactionPrice,
        itemDrop = false,
        itemUnboxed = false,
        itemTraded = false,
        transactionDate,
        transactionCount,
      } = transactionData;
      const itemId = transactionId.split('-')[0];

      // transactions
      const oldTransactions = getState().steam.transactions.data;
      const newTransaction = {
        [transactionData.transactionId]: {
          transactionType,
          transactionPrice,
          transactionDate,
          ...(transactionCount !== 1 && { transactionCount }),
          ...(itemDrop && transactionType === 'sell' && { itemDrop }),
          ...(itemUnboxed && { itemUnboxed }),
          ...(itemTraded && { itemTraded }),
          ...(itemInspectUrl && { itemInspectUrl }),
        },
      };

      const newTransactions = { ...oldTransactions, ...newTransaction };

      //historyTimeline
      const limit = 2000;
      const oldHistoryTimeline = getState().steam.historyTimeline.data;
      const oldHistoryTimelineKeys = Object.keys(oldHistoryTimeline);
      const historyTimelineLastSectionKey = oldHistoryTimelineKeys.length
        ? oldHistoryTimelineKeys[oldHistoryTimelineKeys.length - 1]
        : `${limit}x0`;
      const historyTimelineLastSectionLength =
        oldHistoryTimeline[historyTimelineLastSectionKey]?.length || 0;
      const historyTimeLineNewSectionKey =
        historyTimelineLastSectionLength < limit
          ? historyTimelineLastSectionKey
          : `${limit}x${+historyTimelineLastSectionKey.split('x')[1] + 1}`;
      const newHistoryTimeline = {
        ...oldHistoryTimeline,
        [historyTimeLineNewSectionKey]: [
          ...(oldHistoryTimeline[historyTimeLineNewSectionKey] || []),
          transactionData.transactionId,
        ],
      };

      // itemsHistory
      const oldItemsHistory = getState().steam.itemsHistory.data;
      const price = parseFloat(transactionPrice * transactionCount) || 0;
      const priceDelta =
        itemDrop || itemUnboxed // || transactionIgnore
          ? 0
          : transactionType === 'sell'
          ? price
          : -price;
      const inventoryDelta =
        itemDrop || itemUnboxed
          ? 0
          : transactionType === 'sell'
          ? -1 * transactionCount
          : 1 * transactionCount;

      const oldItemHistory = {
        balance: 0,
        inventory: 0,
        transactionHistory: [],
        ...(oldItemsHistory[itemId] || {}),
      };
      const newItemHistory = {
        balance: safeAdd(oldItemHistory.balance, priceDelta),
        inventory: oldItemHistory.inventory + inventoryDelta,
        transactionHistory: [
          ...oldItemHistory.transactionHistory,
          transactionId,
        ],
      };

      const newItemsHistory = {
        ...oldItemsHistory,
        [itemId]: newItemHistory,
      };

      dispatch(
        steamMutation.addTransactionSuccess({
          newTransaction,
          newHistoryTimeline,
          newItemsHistory,
        })
      );
      localStorage.setItem('transactions', JSON.stringify(newTransactions));
      localStorage.setItem(
        'historyTimeline',
        JSON.stringify(newHistoryTimeline)
      );
      localStorage.setItem('itemsHistory', JSON.stringify(newItemsHistory));
    } catch (error) {
      console.log(error);
      dispatch(steamMutation.addTransactionFailure(error));
    }
  };
};

//not functional
// export const updateTransactions = ({ newData }) => {
//   console.log('updateTransactions-action');
//   return async (dispatch, getState) => {
//     dispatch(steamMutation.updateTransactionsStart());
//     try {
//       localStorage.setItem('transactions', JSON.stringify(newData));
//       dispatch(steamMutation.updateTransactionsSuccess({ newData }));
//     } catch (error) {
//       console.log(error);
//       dispatch(steamMutation.updateTransactionsFailure(error));
//     }
//   };
// };

export const updateTransaction = ({ transactionData }) => {
  console.log('editTransaction-action');
  return async (dispatch, getState) => {
    dispatch(steamMutation.updateTransactionStart());
    try {
      const {
        transactionId,
        transactionType,
        transactionPrice,
        itemDrop,
        itemUnboxed,
        // transactionIgnore,
        transactionDate,
        transactionCount,
        itemTraded,
      } = transactionData;

      if (
        (transactionType !== 'buy' && transactionType !== 'sell') ||
        transactionId === '' ||
        transactionPrice === ''
      ) {
        throw 'incorrect input';
      }
      // transactions
      const oldTransactions = getState().steam.transactions.data;
      const oldTransaction = oldTransactions[transactionData.transactionId];
      // const newTransaction = {
      //   [transactionData.transactionId]: transactionData,
      // };
      const newTransaction = {
        [transactionData.transactionId]: {
          // transactionId,
          transactionType,
          transactionPrice,
          transactionDate,
          ...(transactionCount !== 1 && { transactionCount: transactionCount }),
          ...(itemDrop && transactionType === 'sell' && { itemDrop: itemDrop }),
          // ...(transactionIgnore && { transactionIgnore: transactionIgnore }),
          ...(itemUnboxed && { itemUnboxed: itemUnboxed }),
          ...(itemTraded && { itemTraded: itemTraded }),
        },
      };

      const newTransactions = { ...oldTransactions, ...newTransaction };

      // itemsHistory
      const oldItemsHistory = getState().steam.itemsHistory.data;
      const oldPrice = parseFloat(oldTransaction.transactionPrice) || 0;

      const oldPriceDelta =
        oldTransaction.itemDrop || oldTransaction.itemUnboxed // || oldTransaction.transactionIgnore
          ? 0
          : oldTransaction.transactionType === 'sell'
          ? -oldPrice
          : oldPrice;
      const oldInventoryDelta =
        oldTransaction.itemDrop || oldTransaction.itemUnboxed
          ? 0
          : oldTransaction.transactionType === 'sell'
          ? 1 * (oldTransaction.transactionCount || 1)
          : -1 * (oldTransaction.transactionCount || 1);

      // const { transactionType, transactionPrice, itemDrop, transactionIgnore } =
      //   transactionData;
      const itemId = transactionData.transactionId.split('-')[0];
      const price = parseFloat(transactionPrice) || 0;
      const priceDelta =
        itemDrop || itemUnboxed // || transactionIgnore
          ? 0
          : transactionType === 'sell'
          ? price
          : -price;
      const inventoryDelta =
        itemDrop || itemUnboxed
          ? 0
          : transactionType === 'sell'
          ? -transactionCount
          : transactionCount;

      const oldItemHistory = {
        balance: 0,
        inventory: 0,
        transactionHistory: [],
        ...(oldItemsHistory[itemId] || {}),
      };
      const newItemHistory = {
        balance: safeAdd(
          oldItemHistory.balance,
          priceDelta * transactionCount,
          oldPriceDelta * (oldTransaction.transactionCount || 1)
        ),
        inventory:
          oldItemHistory.inventory + inventoryDelta + oldInventoryDelta,
        transactionHistory: oldItemHistory.transactionHistory,
      };

      const newItemsHistory = {
        ...oldItemsHistory,
        [itemId]: newItemHistory,
      };
      dispatch(
        steamMutation.updateTransactionSuccess({
          newTransaction,
          newItemsHistory,
        })
      );
      localStorage.setItem('transactions', JSON.stringify(newTransactions));
      localStorage.setItem('itemsHistory', JSON.stringify(newItemsHistory));
    } catch (error) {
      console.log(error);
      dispatch(steamMutation.updateTransactionFailure(error));
    }
  };
};

export const deleteTransaction = ({ transactionId }) => {
  return async (dispatch, getState) => {
    dispatch(steamMutation.deleteTransactionStart());

    //transactions
    const oldTransactions = getState().steam.transactions.data;
    const { [transactionId]: deletedTransaction, ...newTransactions } =
      oldTransactions;
    const oldItemsHistory = getState().steam.itemsHistory.data;
    const itemId = transactionId.split('-')[0];
    const newItemTransactionHistory = oldItemsHistory[
      itemId
    ].transactionHistory.filter((a) => a !== transactionId);

    const {
      transactionType,
      transactionPrice,
      itemDrop,
      // transactionIgnore,
      itemUnboxed,
      // itemId,
      transactionCount = 1,
    } = deletedTransaction;
    const price = parseFloat(transactionPrice) || 0;
    console.log(transactionCount);

    const priceDelta =
      itemDrop || itemUnboxed // || transactionIgnore
        ? 0
        : transactionType === 'sell'
        ? -price
        : price;
    const inventoryDelta =
      itemDrop || itemUnboxed ? 0 : transactionType === 'sell' ? 1 : -1;

    const oldItemHistory = {
      balance: 0,
      inventory: 0,
      transactionHistory: [],
      ...(oldItemsHistory[itemId] || {}),
    };
    const newItemHistory = {
      balance: safeAdd(oldItemHistory.balance, priceDelta * transactionCount),
      inventory: oldItemHistory.inventory + inventoryDelta * transactionCount,
      transactionHistory: newItemTransactionHistory,
    };

    const newItemsHistory = {
      ...oldItemsHistory,
      [itemId]: newItemHistory,
    };

    //historyTimeline
    const oldHistoryTimeline = getState().steam.historyTimeline.data;
    const oldHistoryTimelineKeys = Object.keys(oldHistoryTimeline);
    const historyTimelineSectionKey =
      oldHistoryTimelineKeys.find((key) =>
        oldHistoryTimeline[key].includes(transactionId)
      ) || null;

    const newHistoryTimeline = {
      ...oldHistoryTimeline,
      [historyTimelineSectionKey]: oldHistoryTimeline[
        historyTimelineSectionKey
      ].filter((item) => item !== transactionId),
    };

    try {
      dispatch(
        steamMutation.deleteTransactionSuccess({
          newTransactions,
          newItemsHistory,
          newHistoryTimeline,
        })
      );
      localStorage.setItem('transactions', JSON.stringify(newTransactions));
      localStorage.setItem('itemsHistory', JSON.stringify(newItemsHistory));
      localStorage.setItem(
        'historyTimeline',
        JSON.stringify(newHistoryTimeline)
      );
    } catch (error) {
      console.log(error);
      dispatch(steamMutation.deleteTransactionFailure(error));
    }
  };
};
