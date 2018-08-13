import React, { Component } from "react";

/**
 * Makes the child draggable. wrap the component with <Draggable> </Draggable> that needs to be made draggable.
 * @prop {Number} posX - position of the element from left
 * @prop {Number} posY - position od the element from top
 * @prop {String} forwardRef - ref for the child component
 * @prop {String} id - id for the component to locate on DOM
 */
class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 2,
      posX: props.posX,
      posY: props.posY
    };
  }
  componentDidMount() {
    const { forwardRef } = this.props;
    this.refs[forwardRef].addEventListener("dragstart", this.handleDragStart); // adding dragStart event listener to the element
    this.refs[forwardRef].addEventListener("dragend", this.handleDragEnd); //  adding dragEnd event listener to the element
  }
  componentWillUnmount() {
    const { forwardRef } = this.props;
    this.refs[forwardRef].removeEventListener(
      "dragstart",
      this.handleDragStart
    );
    this.refs[forwardRef].removeEventListener("dragend", this.handleDragEnd);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ posX: nextProps.posX, posY: nextProps.posY });
  }

  // Dragstart Handler
  handleDragStart = ev => {
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.clearData();
    ev.dataTransfer.setData("text/plain", this.props.id);
    this.setState({ zIndex: 12 });
  };

  // Dragend Handler
  handleDragEnd = ev => {
    this.setState({ zIndex: 2 });
  };

  render() {
    const { forwardRef, id } = this.props;
    const { zIndex, posX, posY } = this.state;
    return (
      <div
        draggable
        style={{
          display: "inline-block",
          zIndex: zIndex,
          position: "absolute",
          top: posY,
          left: posX
        }}
        ref={forwardRef}
        id={id}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Draggable;
