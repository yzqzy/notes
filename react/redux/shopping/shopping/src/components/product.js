import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../store/actions/product.actions";
import * as cartActions from '../store/actions/cart.actions';

class Product extends Component {
  componentDidMount() {
    const { loadProducts } = this.props;
    // 向服务器端发送请求 获取商品列表数据
    loadProducts();
  }
  render() {
    const { products, addProductToCart } = this.props;
    console.log(products);
    return (
      <section className="container content-section">
        <h2 className="section-header">商品列表</h2>
        <div className="shop-items">
          {products.map((product) => (
            <div className="shop-item" key={product.id}>
              <img className="shop-item-image" src={`http://localhost:3005${product.thumbnail}`} alt="" />
              <span className="shop-item-title">{product.title}</span>
              <div className="shop-item-details">
                <span className="shop-item-price">￥{product.price}</span>
                <button
                  className="btn btn-primary shop-item-button"
                  type="button"
                  onClick={() => addProductToCart(product.id)}
                >
                  加入购物车
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(productActions, dispatch),
  ...bindActionCreators(cartActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
