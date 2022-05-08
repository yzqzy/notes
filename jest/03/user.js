import axios from "axios";

export const getAllUsers = () => {
  return axios.get('/users.json').then(res => res.data);
}
