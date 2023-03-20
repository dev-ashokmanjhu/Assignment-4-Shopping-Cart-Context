import { useContext } from "react";
import Modal from "../Layout/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../store/cart-context";

const Cart = (props) => {
  // getting Context data
  const cartCtx = useContext(CartContext);
  // making total amount to last two decimal numbers
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  //checking cart is empty or not
  const hasItems = cartCtx.items.length > 0;
  // function for removing item which get id as argument and redirect to cotext action
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  // function for adding Item which get item as argument and redirect to addItem context action and only increase 1 quantity
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };
  // function for reset Item which set state to defaultstate
  const resetItemsHandler = () => {
    cartCtx.resetItem();
  };
  // get items from context and map over them to show in cart and cartItem components
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          img={item.image}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // wrap it in Modal for making overlay
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        {!(numberOfCartItems === 0) && (
          <button
            className={classes["button--alt"]}
            onClick={resetItemsHandler}
          >
            Reset
          </button>
        )}
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
