import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCartAction } from '../../store/action';

const SuccessPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCartAction());
  }, []);

  return <h1>Payment Successful!</h1>;
};
export default SuccessPage;
