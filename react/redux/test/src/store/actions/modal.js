import { HIDE_MODAL, SHOW_MODAL } from "../const/modal";

export const show = () => ({ type: SHOW_MODAL });
export const hide = () => ({ type: HIDE_MODAL });

export const show_async = () => dispatch => {
  setTimeout(() => dispatch(show()), 2 * 1000);
}