import CounterStore from "./CounterStore";
import { createContext, useContext } from "react";

class RootStore {
  constructor () {
    this.counterStore = new CounterStore();
  }
}

const rootStore = new RootStore();

const RootStoreContext = createContext();

export const RootStoreProvider = ({ children }) => {
  return (
    <RootStoreContext.Provider value={ rootStore }>{ children }</RootStoreContext.Provider>
  )
};

export const useRootStore = () => {
  return useContext(RootStoreContext);
}