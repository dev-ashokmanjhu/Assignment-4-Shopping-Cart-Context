import classes from "./CartItem.module.css";

const CartItem = (props) => {
  // fixed price to two decimal numbers
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={classes["cart-item"]}>
      <div className={classes.imgBox}>
        <img className={classes.cartItemImg} src={props.img} alt="thumbnail" />
      </div>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
