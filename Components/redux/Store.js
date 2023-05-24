import { createStore } from "redux";
import { Reducers } from "./Reducers";
// console.log("on store");
export const myStore = createStore(Reducers);