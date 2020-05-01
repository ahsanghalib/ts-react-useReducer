import React, { createContext, useReducer, Dispatch } from "react";
import { ActionsType, InitialStateType } from "./Types";
import { initialState, Reducers } from "./Reducers";

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ActionsType>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppStoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<typeof Reducers>(Reducers, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppStoreProvider, AppContext };
