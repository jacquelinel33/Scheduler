import React from "react";

import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {
  // classNames takes an object where the keys are the class names and the values are conditions that determine whether a class should be added. If the condition is true, the corresponding class is added to the class list.
   const buttonClass = classNames (
      "button", {
         " button--confirm": props.confirm,
         " button--danger": props.danger
      }
   )

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
