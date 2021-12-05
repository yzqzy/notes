import express from "express";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";

import goods from "./data/goods";
import cart from "./data/cart.json";

// 改造写文件方法
const writeFile = promisify(fs.writeFile);

// 创建网站服务器实例对象
const app = express();
// 支持跨域访问
app.use(cors());
// 配置静态资源访问目录
app.use(express.static(path.join(__dirname, "public")));
// 处理格式为application/x-www-form-urlencoded的请求参数
app.use(bodyParser.urlencoded({ extended: false }));
// 处理格式为application/json的请求参数
app.use(bodyParser.json());

// 获取商品列表
app.get("/goods", (req, res) => {
  res.send(goods);
});

// 将商品加入购物车
app.post("/cart/add", async (req, res) => {
  // gid 商品id
  const { gid } = req.body;
  // 判断商品id是否存在
  if (!gid) return res.status(400).send({ msg: "商品id不存在" });
  // 查看购物车中是否存在该商品
  const existGoods = cart.find((item) => item.gid == gid);
  // 存在
  if (existGoods) {
    // 将商品数量在原有基础上加一
    existGoods.count = existGoods.count + 1;
    // 存储商品
    await writeFile("./data/cart.json", JSON.stringify(cart));
    // 将商品响应到客户端
    res.send(existGoods);
  } else {
    // 不存在
    // 在商品列表中找到要添加到购物车的商品
    let target = goods.find((item) => item.id == gid);
    // 如果商品没找到
    if (!target) return res.status(400).send({ msg: "商品不存在" });
    // 拷贝商品数据
    target = JSON.parse(JSON.stringify(target));
    // 将商品数量设置为一
    target.count = 1;
    // 更改商品id字段为gid (id => gid)
    target.gid = target.id;
    // 为购物车中的商品添加id
    target.id = uuidv4();
    // 将商品添加到购物车中
    cart.push(target);
    // 存储商品
    await writeFile("./data/cart.json", JSON.stringify(cart));
    // 将商品响应到客户端
    res.send(target);
  }
});

// 获取购物车中的商品
app.get("/cart", (req, res) => {
  res.send(cart);
});

// 从购物车中删除商品
app.delete("/cart/delete", async (req, res) => {
  // 购物车中的商品id
  const { cid } = req.query;
  // 如果购物车id不存在
  if (!cid) return res.status(400).send({ msg: "购物车商品id不存在" });
  // 查找要删除的购物车中的商品的索引
  const index = cart.findIndex((item) => item.id == cid);
  // 从购物车中删除商品
  let result = cart.splice(index, 1);
  // 如果删除失败
  if (result.length == 0) return res.status(400).send({ msg: "商品删除失败" });
  // 存储结果
  await writeFile("./data/cart.json", JSON.stringify(cart));
  // 响应
  res.send({ msg: "商品删除成功" });
});

// 更改购物车中的商品数量
app.put("/cart", async (req, res) => {
  // 购物车中的商品id
  const { cid, count } = req.body;
  // 如果购物车商品id不存在
  if (!cid) return res.status(400).send({ msg: "购物车商品id不存在" });
  // 查找购物车中的商品
  const cartGoods = cart.find((item) => item.id == cid);
  if (!cartGoods) res.status(400).send({ msg: "商品不存在" });
  // 更改商品数量
  cartGoods.count = count;
  // 存储结果
  await writeFile("./data/cart.json", JSON.stringify(cart));
  // 响应
  res.send(cartGoods);
});

// 监听端口
app.listen(3005);
