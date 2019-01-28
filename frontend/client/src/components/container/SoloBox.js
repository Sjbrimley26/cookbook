import React, { Component } from "react";
import debounce from "lodash/debounce";
import "../../assets/styles/SoloBox.css";

class SoloBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenSize: [window.innerWidth, window.innerHeight],
      mounted: false
    };
    this.resize = this.resize.bind(this);
  }

  resize() {
    if (this.state.mounted) {
      this.setState({
        screenSize: [window.innerWidth, window.innerHeight]
      });
    }
  }

  componentDidMount() {
    this.setState({ mounted: true });
    window.addEventListener("resize", debounce(this.resize, 20));
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
    window.removeEventListener("resize", debounce(this.resize, 20));
  }

  render() {
    const height = parseInt(this.props.height);
    const width = parseInt(this.props.width);
    const { screenSize } = this.state;
    
    const renderedWidth = width > screenSize[0] - 20
                          ? screenSize[0] - 40 
                          : width;

    const renderedHeight = height > screenSize[1] - 20
                           ? screenSize[1] - 40 
                           : height;

    const style = {
      height: renderedHeight + "px",
      width: renderedWidth + "px",
      left: `calc(50% - ${renderedWidth / 2}px)`,
      top: `calc(50% - ${renderedHeight / 2}px)`
    };

    return (
      <div className="soloBox" style={style}>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default SoloBox;
