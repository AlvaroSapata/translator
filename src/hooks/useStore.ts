import { useReducer } from "react";
import { Action, type State } from "../types";

// 1. Create an initial state
const initialState: State = {
  fromLanguage: "auto",
  toLanguage: "string",
  fromText: "string",
  result: "string",
  loading: false,
};

// 2. Create a reducer
function reducer(state: State, action: Action) {
  // Destructure the action object into type
  const { type } = action;

  // Handle the action INTERCHANGE_LANGUAGES type, return a new state in wich fromLanguage and toLanguage are swapped
  if (type === "INTERCHANGE_LANGUAGES") {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }
  // Handle the action SET_FROM_LANGUAGE type, return a new state in wich fromLanguage is set to the payload (from action)
  if (type === "SET_FROM_LANGUAGE") {
    return {
      ...state,
      fromLanguage: action.payload,
    };
  }
  // Handle the action SET_TO_LANGUAGE type, return a new state in wich toLanguage is set to the payload (from action)
  if (type === "SET_TO_LANGUAGE") {
    return {
      ...state,
      toLanguage: action.payload,
    };
  }
  // Handle the action SET_FROM_TEXT type, return a new state in wich fromText is set to the payload (from action)
  if (type === "SET_FROM_TEXT") {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: "",
    };
  }
  // Handle the action SET_RESULT type, return a new state in wich result is set to the payload (from action)
  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }
  return state;
}

export function useStore() {
  // 3. Use the useReducer hook

  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  // 4. Create dispatch functions

  const interchangeLanguages = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  };

  const setFromLanguage = (payload: string) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: string) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };

  const setResult = (payload: string) => {
    dispatch({ type: "SET_RESULT", payload });
  };

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
