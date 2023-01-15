import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {

// ----------------------------------------------
// Alternative way to assign class
   // let buttonClass = 'button';
   // let disabledButton = '';

   // if (props.danger) {
   //    buttonClass += ' button--danger'
   // } else if (props.confirm) {
   //    buttonClass += ' button--confirm'
   // }
// ----------------------------------------------

   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });
   
   return (
   <button className={buttonClass} disabled={props.disabled} onClick={props.onClick}>
      {props.children}
   </button>
   );
}
