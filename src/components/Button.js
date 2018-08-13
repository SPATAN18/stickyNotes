import React from "react";
import "./Button.css";

/**
 * Button Component
 * @prop {Function} onClick  - onClick handler function
 * @prop {String} title -  title of the button
 * @prop {String} className - css class name to be applied for styling
 * @prop {Object} style - JSX Style object
 */
const Button = ({ onClick, title, className, style }) => (
  <button
    onClick={() => onClick()}
    style={style}
    className={`${className} "button"`}
  >
    {title}
  </button>
);

export default Button;
