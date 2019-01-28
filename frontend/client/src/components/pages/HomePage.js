import React, { Component } from "react";
import { SoloBox } from "../container";
import { RecipeCard } from "../presentational";
import { subscribeToNewRecipes, unsubscribeFromNewRecipes, getUserRecipes } from "../../io";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRecipes: [],
      userRecipes: []
    };
    this.goToAddRecipe = this.goToAddRecipe.bind(this);
  }

  goToAddRecipe() {
    this.props.transition({ type: "ADD_RECIPE" });
  }

  componentDidMount() {
    getUserRecipes(this.props.id, recipes => {
      this.setState({ userRecipes: recipes });
    });
    subscribeToNewRecipes(newRecipe => {
      this.setState({
        newRecipes: [...this.state.newRecipes, newRecipe]
      });
    });
  }

  componentWillUnmount() {
    unsubscribeFromNewRecipes();
  }

  render() {
    const { newRecipes, userRecipes } = this.state;
    return (
      <SoloBox width="700" height="800">
        <div className="homePage">
          <h3>Your Recipes</h3>
          <ul>
            {userRecipes.map((recipe, i) => {
              return (
                <li key={i} style={{ display: "list-item" }}>{recipe}</li>
              );
            })}
          </ul>
          <button onClick={this.goToAddRecipe}>Add A Recipe</button>
          <h3>New Recipes</h3>
          {newRecipes.map(({ name, directions, ingredients}, index) => {
            return (
              <RecipeCard
                name={name}
                directions={directions}
                ingredients={ingredients}
                key={index}
              ></RecipeCard>
            )
          })}
        </div>
      </SoloBox>
    )
  }
}

export default HomePage;
