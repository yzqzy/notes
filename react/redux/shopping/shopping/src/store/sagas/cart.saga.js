import { takeEvery, put} from 'redux-saga/effects';
import { addProductToCart, addProductToLocalCart, loadCarts, saveCarts, deleteProductFromCart, deleteProductFromLocalCart, changeServiceProductNumber, changeLocalProductNumber } from '../actions/cart.actions';
import axios from 'axios';

// 将商品添加到购物车中
function* handleAddProductToCart (action) {
  const { data } = yield axios.post('http://localhost:3005/cart/add', {gid: action.payload})
  yield put(addProductToLocalCart(data))
}

// 向服务器端发送请求 获取购物车列表数据
function* handleLoadCarts () {
  const { data } = yield axios.get('http://localhost:3005/cart');
  yield put(saveCarts(data))
}

// 向服务器端发送请求 告诉服务器端我们要删除哪一个商品
function* handleDeleteProductFromCart (action) {
  const { data } = yield axios.delete('http://localhost:3005/cart/delete', {
    params: {
      cid: action.payload
    }
  })
  yield put(deleteProductFromLocalCart(data.index));
}

// 向服务器端发送请求 告诉服务器端我们要将哪一个商品的数量更改成什么
function* handleChangeServiceProductNumber (action) {
  const { data } = yield axios.put('http://localhost:3005/cart', action.payload)
  yield put(changeLocalProductNumber(data))
}

export default function* cartSaga () {
  // 将商品添加到购物车中
  yield takeEvery(addProductToCart, handleAddProductToCart);
  // 向服务器端发送请求 获取购物车列表数据
  yield takeEvery(loadCarts, handleLoadCarts);
  // 向服务器端发送请求 告诉服务器端我们要删除哪一个商品
  yield takeEvery(deleteProductFromCart, handleDeleteProductFromCart);
  // 向服务器端发送请求 告诉服务器端我们要将哪一个商品的数量更改成什么
  yield takeEvery(changeServiceProductNumber, handleChangeServiceProductNumber)
}