import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
  items: [],
  totalAmount: 0,
  cartIsValid: true,
};

const cartReducer = (state, action) => {
  // reducers condition depends on action type  add update remove reset
  if (action.type === "ADD") {
    const numberOfCartItems = state.items.reduce((curNumber, item) => {
      return curNumber + item.quantity;
    }, 0);

    if (numberOfCartItems + action.item.quantity > 20) {
      return {
        items: state.items,
        totalAmount: state.totalAmount,
        cartIsValid: false,
      };
    }
    // checking item already exist or not in the cart behalf of it add item in cart
    const existingCartItmeIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItmeIndex];
    // make variable for not direct mutate the state
    let updatedItems;
    // conditionaly adding items to the cart
    if (existingCartItem) {
      // overriding only quantity state of cart item
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      // getting a copy of current state
      updatedItems = [...state.items];
      // changing current item state
      updatedItems[existingCartItmeIndex] = updatedItem;
    } else {
      // adding item to the item state with concat methods without mutating the state
      updatedItems = state.items.concat(action.item);
    }
    // updating the total amount however it exist or not in cart
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;
    // return updated state
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      cartIsValid: true,
    };
  }
  if (action.type === "UPDATE") {
    const numberOfCartItems = state.items.reduce((curNumber, item) => {
      return curNumber + item.quantity;
    }, 0);

    // checking item already exist or not in the cart behalf of it add item in cart
    const existingCartItmeIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItmeIndex];
    // checking cart limit reached after updating total cart limit
    let totalCartItems = numberOfCartItems;
    if (existingCartItem) {
      totalCartItems = numberOfCartItems - existingCartItem.quantity;
    }
    if (totalCartItems + action.item.quantity > 20) {
      return {
        items: state.items,
        totalAmount: state.totalAmount,
        cartIsValid: false,
      };
    }
    // make variable for not direct mutate the state
    let updatedItems;
    // conditionaly adding items to the cart
    if (existingCartItem) {
      // overriding only quantity state of cart item
      const updatedItem = {
        ...existingCartItem,
        quantity: action.item.quantity,
      };
      // getting a copy of current state
      updatedItems = [...state.items];
      // changing current item state
      updatedItems[existingCartItmeIndex] = updatedItem;
    } else {
      // adding item to the item state with concat methods without mutating the state
      updatedItems = state.items.concat(action.item);
    }
    // updating the total amount however it exist or not in cart
    let totAmount = state.totalAmount;
    if (existingCartItem) {
      totAmount =
        state.totalAmount - existingCartItem.price * existingCartItem.quantity;
    }
    const updatedTotalAmount =
      totAmount + action.item.price * action.item.quantity;
    // return updated state
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      cartIsValid: true,
    };
  }
  if (action.type === "REMOVE") {
    // checking item already exist or not in the cart behalf of it add item in cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    // updating the total amount however it exist or not in cart
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    //remove item or decrease quantity of item based on condition
    if (existingItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      // making copy of current state
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    // returning updated state
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      cartIsValid: true,
    };
  }
  if (action.type === "RESET") {
    return defaultState;
  }

  return defaultState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const addItemtoCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const updateItemtoCartHandler = (item) => {
    dispatchCartAction({ type: "UPDATE", item: item });
  };
  const removeItemtoCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const resetItemsHandler = () => {
    dispatchCartAction({ type: "RESET" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemtoCartHandler,
    updateItem: updateItemtoCartHandler,
    removeItem: removeItemtoCartHandler,
    resetItem: resetItemsHandler,
    cartIsValid: cartState.cartIsValid,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
