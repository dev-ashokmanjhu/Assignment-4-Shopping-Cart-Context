import React from "react";

import classes from "./Input.module.css";
// getting all input configuration from props for making it reusable
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input style={{ textAlign: "center" }} ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
