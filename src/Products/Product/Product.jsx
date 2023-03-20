import { useContext } from "react";
import ProductForm from "./ProductForm";
import classes from "./Product.module.css";
import CartContext from "../../store/cart-context";

const Product = (props) => {
  // getting data from context
  const cartCtx = useContext(CartContext);
  // fixed price for two decimal numbers
  const price = `$${props.price.toFixed(2)}`;
  // function for adding item to context
  const productIndex = cartCtx.items.findIndex((item) => item.id === props.id);
  const product = cartCtx.items[productIndex];
  // it get item quantity from function props and send data of props product to context
  const addToCartHandler = (quantity) => {
    cartCtx.updateItem({
      id: props.id,
      name: props.name,
      quantity: quantity,
      price: props.price,
      image: props.img,
    });
  };

  return (
    <li className={classes.products}>
      <div>
        <img src={props.img} alt="image" />
        <h3>{props.name}</h3>
        <div className={classes.description}>
          {props.description.slice(0, 50)}...
        </div>
        <h3 className={classes.price}>{price}</h3>
      </div>
      <div>
        <ProductForm
          id={props.id}
          cartQuantity={cartCtx.items ? product?.quantity : ""}
          onAddToCart={addToCartHandler}
        />
      </div>
    </li>
  );
};

export default Product;
