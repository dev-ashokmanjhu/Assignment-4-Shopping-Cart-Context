import { useEffect, useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./ProductForm.module.css";

const ProductForm = (props) => {
  // For quantity validation
  const [quantityIsValid, setQunatityIsValid] = useState(true);
  // use ref for geting form input value
  const quantityInputRef = useRef();

  useEffect(() => {
    quantityInputRef.current.value = +props.cartQuantity || 1;
  }, [props.cartQuantity]);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredQuantity = quantityInputRef.current.value;

    const enteredQuantityNumber = +enteredQuantity;
    // validation for empty input and numbers between 1 to 10
    if (
      enteredQuantity.trim().length === 0 ||
      enteredQuantityNumber < 1 ||
      enteredQuantityNumber > 10
    ) {
      setQunatityIsValid(false);
      return;
    } else {
      setQunatityIsValid(true);
    }
    // calling  function for adding item to context
    props.onAddToCart(enteredQuantityNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={quantityInputRef}
        label="Quantity"
        input={{
          id: "quantity_" + props.id,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
        }}
      />
      <button>Add To Cart</button>
      {!quantityIsValid && (
        <p className={classes.warningText}>
          Please enter a valid Quantity (1-10).
        </p>
      )}
    </form>
  );
};

export default ProductForm;
