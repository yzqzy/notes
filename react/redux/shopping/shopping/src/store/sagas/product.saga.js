import { takeEvery, put } from 'redux-saga/effects';
import { loadProducts, saveProducts } from '../actions/product.actions';
import axios from 'axios';

// 加载商品列表数据
function* handleLoadProducts () {
  // 向服务器端发送请求 加载商品列表数据
  const { data } = yield axios.get('http://localhost:3005/goods');
  // 将商品列表数据保存到本地的store对象中
  yield put(saveProducts(data));
}
 
export default function* productSaga () {
  // 加载商品列表数据
  yield takeEvery(loadProducts, handleLoadProducts)
}