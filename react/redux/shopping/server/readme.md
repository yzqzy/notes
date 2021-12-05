## 购物车案例接口文档

基础URL地址：http://localhost:3005

### 1. 获取商品列表

| 请求地址 | 请求方式 |
| -------- | -------- |
| /goods   | GET      |

```javascript
[
    {
        "id": 1,
        "title": "岚爵冬季新款托斯卡纳羊皮毛一体外套",
        "price": 3773,
        "thumbnail": "/images/01.webp"
    },
    {
        "id": 2,
        "title": "魔方插排插线板接线板多功能家用电源转换器",
        "price": 35,
        "thumbnail": "/images/02.webp"
    },
    {
        "id": 3,
        "title": "新款吸顶灯简约现代轻奢大气家用北欧卧室灯亮超亮",
        "price": 588,
        "thumbnail": "/images/03.webp"
    },
    {
        "id": 4,
        "title": "回力帆布鞋男高帮帆布鞋男鞋2020新款春季潮",
        "price": 69,
        "thumbnail": "/images/04.webp"
    }
]
```

### 2. 将商品加入购物车

| 请求地址  | 请求方式 |
| --------- | -------- |
| /cart/add | POST     |

| 参数名称 | 含义   |
| -------- | ------ |
| gid      | 商品id |

```javascript
{
    "id": "3c0bae49-1f46-43b9-9568-48234c8b3a63",
    "title": "岚爵冬季新款托斯卡纳羊皮毛一体外套",
    "price": 3773,
    "thumbnail": "/images/01.webp",
    "count": 1,
    "gid": 1
}
```

### 3. 获取购物车中的商品

| 请求地址 | 请求方式 |
| -------- | -------- |
| /cart    | get      |

```javascript
[
    {
        "id": "3c0bae49-1f46-43b9-9568-48234c8b3a63",
        "title": "岚爵冬季新款托斯卡纳羊皮毛一体外套",
        "price": 3773,
        "thumbnail": "/images/01.webp",
        "count": 100,
        "gid": 1
    }
]
```

### 4. 从购物车中删除商品

| 请求地址     | 请求方式 |
| ------------ | -------- |
| /cart/delete | DELETE   |

| 参数名称 | 含义             |
| -------- | ---------------- |
| cid      | 购物车中的商品id |

```javascript
{
    "msg": "任务名称修改成功",
    "index": "0"
}
```

### 5. 更改购物车中的商品数量

| 请求地址 | 请求方式 |
| -------- | -------- |
| /cart    | PUT      |

| 参数名称 | 含义             |
| -------- | ---------------- |
| cid      | 购物车中的商品id |
| count    | 商品目标数量     |

```javascript
{
    "id": "3c0bae49-1f46-43b9-9568-48234c8b3a63",
    "title": "岚爵冬季新款托斯卡纳羊皮毛一体外套",
    "price": 3773,
    "thumbnail": "/images/01.webp",
    "count": 100,
    "gid": 1
}
```

![联系方式](https://s.zceme.cn/fed/cover-h.jpg)