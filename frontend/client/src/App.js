import React, { Component } from "react";

import {
  Auth,
  appMachine,
  LoginPage,
  HomePage,
  AddRecipePage
} from "./components";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machineState: appMachine.initialState.value,
      error: "",
      logout: e => this.logout(e),
      user: {}
    };
  }

  transition(event) {
    const nextMachineState = 
      appMachine.transition(this.state.machineState, event.type);

    const nextState = nextMachineState.actions.reduce(
      (state, action) => this.command(action, event) || state,
      undefined
    );

    this.setState({
      machineState: nextMachineState.value,
      ...nextState
    });
  }

  command(action, event) {
    switch(action.type) {
      case "setUser":
        const requiredProps = ["name", "recipes", "token", "id"];
        return requiredProps.every(prop => prop in event)
                ? requiredProps.reduce((userObj, prop) =>  {
                    userObj.user[prop] = event[prop];
                    return userObj;
                  }, { user: {} })
                :  { user: {} };

      case "unsetUser":
        return { user: {} };

      case "error":
        return event.error
                ? { error: event.error }
                : undefined;
      
      default:
        break;
    }
  }

  logout(e) {
    e.preventDefault();
    this.transition({ type: "LOGOUT" });
  }

  render() {
    console.log(this.state);
    const now = Date.now();
    return (
      <Auth.Provider value={this.state}>
        <div>
          <div className="error">{this.state.error.message}</div>
          {this.state.machineState  === "homePage" ? (
            <HomePage
              key={now}
              transition={event => this.transition(event)}
              command={this.command}
              id={this.state.user.id}
            >
            </HomePage>
          ) : this.state.machineState === "addRecipePage" ? (
            <AddRecipePage
              key={now}
              transition={event => this.transition(event)}
              command={this.command}
              id={this.state.user.id}
            ></AddRecipePage>
          ) : (
            <LoginPage
              key={now}
              transition={event => this.transition(event)}
              command={this.command}
            ></LoginPage>
          )}
        </div>
      </Auth.Provider>
    );
  }

}

export default App;
