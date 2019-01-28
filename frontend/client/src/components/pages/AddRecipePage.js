import React, { Component } from "react";
import { SoloBox } from "../container";
import { addRecipe } from "../../io";

class AddRecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      directions: [],
      author: this.props.id,
      name: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.submitRecipe = this.submitRecipe.bind(this);
  }

  handleInput(e) {
    const mapping = {
      ingredientsInput: "ingredients",
      directionsInput: "directions",
      authorInput: "author",
      nameInput: "name"
    };

    const multiLines = [
      "ingredientsInput",
      "directionsInput"
    ];

    let value;

    if (multiLines.includes(e.target.id)) {
      value = e.target.value
                .split(/\n/g);
    } else {
      value = e.target.value;
    }

    this.setState({
      [mapping[e.target.id]]: value
    });
  }

  submitRecipe(e) {
    e.preventDefault();
    console.log("submitted recipe", this.state);
    addRecipe(this.state);
    this.props.transition({ type: "RETURN" });
  }
  
  render() {
    return (
      <SoloBox width="600" height="400">
        <form id="addRecipeForm" onChange={this.handleInput}>
          <input type="text" placeholder="Name" id="nameInput"></input>
          <textarea
            placeholder="Ingredients: 1 per line"
            id="ingredientsInput"
            rows="4"
          ></textarea>
          <textarea
            placeholder="Directions: 1 per line"
            id="directionsInput"
            rows="4"
          ></textarea>
          <input type="submit" onClick={this.submitRecipe}></input>
        </form>
      </SoloBox>
    )
  }
}

export default AddRecipePage;
