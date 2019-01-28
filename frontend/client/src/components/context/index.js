import React from "react";
import appMachine from "./stateMachine";

const Auth = React.createContext({
  currentState: "login",
  logout: () => {},
  user:  {}
});

export { appMachine, Auth };
