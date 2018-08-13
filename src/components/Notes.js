import React from "react";
import "./Notes.css";

const Notes = ({ title, content, dragStart, dragEnd }) => (
  <div className="Notes">
    <div>
      <h5>{title}</h5>
    </div>
    <div>
      <p>{content}</p>
    </div>
  </div>
);

export default Notes;
