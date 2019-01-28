import { Machine } from "xstate";

const appMachine = Machine({
  initial: "loginPage",
  states: {
    
    loginPage: {
      onEntry: ["error"],
      on: {
        SUBMIT: "loading",
        SIGNUP: "signUpPage"
      }
    },

    signUpPage: {
      on: {
        SUBMIT: "loading"
      }
    },
    
    loading: {
      onExit: ["setUser"],
      on: {
        SUCCESS: "homePage",
        FAIL: "loginPage"
      }
    },

    homePage: {
      on: {
        LOGOUT: "loginPage",
        ADD_RECIPE: "addRecipePage"
      }
    },

    addRecipePage: {
      on: {
        RETURN: "homePage"
      }
    }
  }
});

export default appMachine;
