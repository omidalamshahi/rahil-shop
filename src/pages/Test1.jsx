// import { useState } from "react";

// function Test1() {
//   const [quantity, setQuantity] = useState(1);

//   const handleCheckout = async () => {
//     const res = await fetch(`/api/create-checkout-session?qty=${quantity}`, {
//       method: "POST",
//     });
//     const data = await res.json();
//     window.location.href = data.url; // redirect to Stripe Checkout
//   };

//   return (
//     <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
//       <h1>Buy Product</h1>
//       <label>
//         Quantity:
//         <input
//           type="number"
//           min="1"
//           max="99"
//           value={quantity}
//           onChange={(e) => setQuantity(Number(e.target.value))}
//           style={{ marginLeft: "0.5rem", width: "50px" }}
//         />
//       </label>
//       <button
//         onClick={handleCheckout}
//         style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
//       >
//         Checkout
//       </button>
//     </div>
//   );
// }

// export default Test1;


const Test1 = () => {
  return (
    <div>Test1</div>
  )
}
export default Test1