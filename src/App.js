import React, { Component } from "react";
import "./App.css";
import Notes from "./components/Notes";
import Button from "./components/Button";
import Modal from "./components/Modal";
import Draggable from "./dragDrop/Draggable";

const appNoteKey = "sticky-notes-app-demo";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNoteModalShow: false,
      notes: {},
      hasError: false
    };
  }
  componentWillMount() {
    // getting Notes from storage
    let localNotes = localStorage.getItem(appNoteKey);
    if (localNotes) {
      try {
        localNotes = JSON.parse(localNotes); // parse Notes to JSON
        this.setState({ notes: localNotes }); // setting notes in state
      } catch (error) {
        this.setState({ hasError: true }); // in case there is some error in getting notes from localstorage
      }
    }
  }

  componentDidMount() {
    this.refs.dropArea.addEventListener("dragover", this.onDragOver); // dragover event listener for the drop target
    this.refs.dropArea.addEventListener("drop", this.onDrop); // drop event listener for the drop target
  }
  // Show Add Note Modal and Clear Previous data if any
  showModal = () => {
    this.setState({
      addNoteModalShow: true
    });
  };

  // hide Add Note Modal and clear the data
  hideModal = () => {
    this.setState({
      addNoteModalShow: false
    });
  };

  /**
   * Adding Note to Note list
   */

  onAddNote = (title, content) => {
    const notes = this.state.notes; // get notes object from state
    notes[title] = { content: content, posX: null, posY: null }; // create new note using title as key
    this.setState(
      { notes }, // set updated notes object as notes
      localStorage.setItem(appNoteKey, JSON.stringify(notes)) // update notes in local storage
    );
  };

  /**
   * update Note position according to drag position
   * @param {String} key  -  key to access note from notes object(title of note)
   * @param {Number} posX -  note position from left
   * @param {Number} posY -  note position from top
   */
  updateNote = (key, posX, posY) => {
    const notes = this.state.notes;
    notes[key] = { ...notes[key], posX: posX, posY: posY };
    this.setState({ notes });
    localStorage.setItem(appNoteKey, JSON.stringify(notes));
  };

  /**
   * Render Note from using the state Notes object
   */
  _renderNotes = notes => {
    return Object.keys(notes).map((key, index) => (
      <Draggable
        posX={notes[key].posX}
        posY={notes[key].posY}
        ref={key}
        key={key}
        forwardRef={key}
        id={key}
      >
        <Notes key={key} title={key} content={notes[key]["content"]} />
      </Draggable>
    ));
  };

  //on Drag Over
  onDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
  };

  // on Drop handler
  onDrop = e => {
    // stopping event bubbling
    e.preventDefault();
    e.stopPropagation();
    // get drag data stored in data transfer
    const data = e.dataTransfer.getData("text");

    const ele = document.getElementById(data);
    // get Drop Area position attributes/ values
    const parentData = this.refs.dropArea.getBoundingClientRect();
    const { top, left } = parentData;
    // get mouse position
    const { clientX, clientY } = e;
    // calculate position of mouse relative to the drop Area
    const posX = Math.abs(clientX - left);
    const posY = Math.abs(clientY - top);
    // update position of dragged element
    // this.refs[data].updatePostion(posX, posY);
    this.updateNote(data, posX, posY);
    this.refs.dropArea.appendChild(ele);
    console.log("addad dropped here", this.refs[data], parentData);
  };

  render() {
    const { addNoteModalShow, notes } = this.state;
    return (
      <div className="App">
        <Button
          className="createButton"
          title="CREATE NOTES"
          onClick={this.showModal}
        />
        <h2 style={{ color: "white", textAlign: "center" }}> Sticky Notes </h2>
        <Modal
          visible={addNoteModalShow}
          onAddNote={this.onAddNote}
          onClose={this.hideModal}
        />
        <div
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}
          className="Notesbg"
          ref={"dropArea"}
        >
          {this._renderNotes(notes)}
        </div>
      </div>
    );
  }
}

export default App;
