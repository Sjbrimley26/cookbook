import React, { Component } from "react";
import { SoloBox } from "../";
import { Auth } from "../context";
import { serverURL } from "../../config";

const fetchJSON = (url, json) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(json),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  handleInput(e) {
    const mapping = {
      emailInput: "email",
      passwordInput: "password",
      nameInput: "name"
    };
    this.setState({
      [mapping[e.target.id]]: e.target.value
    });
  }

  login(e) {
    e.preventDefault();
    this.props.transition({ type: "SUBMIT" });
    fetchJSON(`${serverURL}/login`, this.state)
      .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            return Promise.reject("Server error! Try again in a moment.");
          }
        })
        .then(json => {
          this.props.transition({
            type: "SUCCESS",
            ...json
          });
        })
        .catch(
          error => this.props.transition({
            type: "FAIL",
            error
          })
        )
  }

  signUp(e) {
    e.preventDefault();
    this.props.transition({
      type: "SIGNUP"
    });
    if (!this.state.name) {
      return;
    }
    this.props.transition({
      type: "SUBMIT"
    });
    fetchJSON(`${serverURL}/newUser`, this.state)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then(json => {
        this.props.transition({
          type: "SUCCESS",
          json
        });
      })
      .catch(
        error => this.props.transition({
          type: "FAIL",
          error
        })
      )
  }

  render() {
    return (
      <Auth.Consumer>
        {({ machineState }) => (
          <SoloBox width="300" height="200">
            <form 
              id="loginForm"
              onChange={this.handleInput}
            >
              <input 
                type="email"
                placeholder="Email"
                id="emailInput"
              ></input>
              <input 
                type="password"
                placeholder="Password"
                id="passwordInput"
              ></input>
              { machineState === "signUpPage" ? (
                <input
                  type="text"
                  placeholder="Username"
                  id="nameInput"
                ></input>
              ) : null }
              <span id="submitters">
                <input
                  type="submit"
                  id="loginButton"
                  onClick={this.login}
                  value={ machineState === "loading" ? "Logging in..." : "Login" }
                  disabled={ ["loading", "signUpPage"].includes(machineState) ? true : false }
                ></input>
                <input
                  type="submit"
                  id="signUpButton"
                  onClick={this.signUp}
                  value={ machineState === "loading" ? "Logging in..." : "Sign Up" }
                  disabled={ machineState === "loading" ? true : false }
                ></input>
              </span>
            </form>
          </SoloBox>
        )}
      </Auth.Consumer>
    )
  }
}

export default LoginPage;
