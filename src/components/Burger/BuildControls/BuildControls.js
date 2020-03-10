import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = props => {
  return (
    <div className={styles.BuildControls}>
      {controls.map(control => {
        return (
          <BuildControl
            label={control.label}
            key={control.label}
            added={props.addIngredient.bind(this,control.type)}
            removed={props.removeIngredient.bind(this, control.type)}
          ></BuildControl>
        );
      })}
    </div>
  );
};

export default BuildControls;