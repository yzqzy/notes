import { INCREMENT, DECREMENT } from "../const/counter";

export const increment = payload => ({ type: INCREMENT, payload });
export const decrement = payload => ({ type: DECREMENT, payload });
