import React from "react";
import styles from "./Input.module.css";

const Input = props => {
  const conditionalStyle = [styles.InputElement];

  if (props.invalid && props.shouldValidation && props.touched) {
    conditionalStyle.push(styles.Invalid);
  }

  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={conditionalStyle.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={conditionalStyle.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={conditionalStyle.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={conditionalStyle.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = <p>{props.errorMessage.eM}</p>;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
