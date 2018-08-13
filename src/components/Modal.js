import React, { Component } from "react";
import "./Modal.css";
import Button from "./Button";

/**
 * @class Modal Component to add new notes. Renders as popup.
 * @prop {Boolean} visible - should the Modal be visible or not
 * @prop {Function} onAddNote -  handle note add. (AddButton handle)
 * @prop {Function} onClose - handle closing the modal. (CancelButton handle)
 */
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteTitle: "",
      noteContent: "",
      onAddNote: props.onAddNote,
      onClose: props.onClose
    };
  }

  // Add Notes
  onAddNotes = () => {
    const { onAddNote, noteTitle, noteContent } = this.state;
    if (noteTitle.length > 0 && noteContent.length > 0) {
      onAddNote(noteTitle, noteContent);
      this.setState({ noteTitle: "", noteContent: "" }); // reseting note title and content after adding
    } else {
      alert("Please, add note title and content!");
    }
  };

  // Hide/Close Modal
  onHideModal = () => {
    const { onClose } = this.state;
    onClose();
  };

  // Handle title text change
  onTitleChange = e => {
    this.setState({
      noteTitle: e.target.value
    });
  };
  // Handle content change
  onContentChange = e => {
    this.setState({
      noteContent: e.target.value
    });
  };
  render() {
    const { visible } = this.props;
    const { noteTitle, noteContent } = this.state;
    return (
      <div className={`modal ${visible ? "modalShow" : "modal"}`}>
        <div className="titleDiv">
          <p className="titleHeader">Title</p>
          <input
            value={noteTitle}
            type="text"
            className="titleInput"
            placeholder="enter note title"
            onChange={this.onTitleChange}
          />
        </div>
        <div className="bodyDiv">
          <div className="emptyBodyDiv" />
          <textarea
            onChange={this.onContentChange}
            value={noteContent}
            type="text"
            cols={100}
            rows={5}
            required
            className="bodyInput"
            placeholder="write your note here..."
          />
        </div>
        <div className="modalHeader">
          <Button onClick={this.onAddNotes} className="addButton" title="ADD" />
          <Button
            onClick={this.onHideModal}
            className="cancelButton"
            title="CANCEL"
          />
        </div>
      </div>
    );
  }
}
export default Modal;
