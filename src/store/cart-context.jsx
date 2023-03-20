import React from "react";
// initializing context
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  additem: (item) => {},
  updateItem: (item) => {},
  removeItem: (id) => {},
  resetItem: () => {},
  cartIsValid: true,
});
export default CartContext;
