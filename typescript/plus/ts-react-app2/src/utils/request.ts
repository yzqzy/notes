import Axios from 'axios';
import { message } from 'antd';

const axios = Axios.create({
  timeout: 20000
});

axios.interceptors.response.use(
  function(response) {
    if (response.data && response.data.error_code) {
      const errorMsg = response.data.error_msg;
      message.error(errorMsg);
      return Promise.reject(errorMsg);
    }
    return response.data;
  },
  function (error) {
    return Promise.reject(error)
  }
)

export function get(url: string, data: any) {
  return axios.get(url, {
    params: data
  });
}

export function post(url: string, data: any) {
  return axios({
    method: 'post',
    url,
    data
  });
}

export default axios;
