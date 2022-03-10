const initData = {
  // 点集
  nodes: [
    {
      id: 'node1', // 节点的唯一标识
      x: 100, // 节点横坐标
      y: 200, // 节点纵坐标
      label: '起始点', // 节点文本
    },
    {
      id: 'node2',
      x: 300,
      y: 200,
      label: '目标点',
    },
  ],
  // 边集
  edges: [
    // 表示一条从 node1 节点连接到 node2 节点的边
    {
      source: 'node1', // 起始点 id
      target: 'node2', // 目标点 id
      label: '我是连线', // 边的文本
    },
  ],
};

// 实例化 minimap 插件
const minimap = new G6.Minimap({
  size: [100, 100],
  className: 'minimap',
  type: 'delegate',
});

const grid = new G6.Grid();

const graph = new G6.Graph({
  container: 'mountNode', // 指定挂载容器
  width: 1200, // 图的宽度
  height: 800, // 图的高度

  modes: {
    default: [
      // 允许拖拽画布、放缩画布、拖拽节点
      'drag-canvas',
      'zoom-canvas',
      'drag-node',

      {
        type: 'tooltip', // 提示框
        formatText(model) {
          // 提示框文本内容
          const text = 'label: ' + model.label + '<br/> class: ' + model.class;
          return text;
        },
      },
      {
        type: 'edge-tooltip', // 边提示框
        formatText(model) {
          // 边提示框文本内容
          const text =
            'source: ' +
            model.source +
            '<br/> target: ' +
            model.target +
            '<br/> weight: ' +
            model.weight;
          return text;
        },
      },
    ], 
  },

  plugins: [minimap, grid], // 将 minimap 实例配置到图上

  // 自动适配画布
  // fitView: true,
  // fitViewPadding: [20, 40, 50, 20],
  // 节点在默认状态下的样式配置（style）和其他配置

  layout: {
    // Object，可选，布局的方法及其配置项，默认为 random 布局。
    type: 'force', // 指定为力导向布局
    // type: 'circular', // 指定为力导向布局
    preventOverlap: true, // 防止节点重叠
    // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
    linkDistance: 100, // 指定边距离为100
  },

  defaultNode: {
    size: 30, // 节点大小
    // ...                 // 节点的其他配置
    // 节点样式配置
    style: {
      fill: 'steelblue', // 节点填充色
      stroke: '#666', // 节点描边色
      lineWidth: 1, // 节点描边粗细
    },
    // 节点上的标签文本配置
    labelCfg: {
      // 节点上的标签文本样式配置
      style: {
        fill: '#fff', // 节点标签文字颜色
      },
    },
  },
  // 边在默认状态下的样式配置（style）和其他配置
  defaultEdge: {
    // ...                 // 边的其他配置
    // 边样式配置
    // style: {
    //   opacity: 0.6, // 边透明度
    //   stroke: 'grey', // 边描边颜色
    // },
    // 边上的标签文本配置
    labelCfg: {
      autoRotate: true, // 边上的标签文本根据边的方向旋转
    },
  },

  // 节点不同状态下的样式集合
  nodeStateStyles: {
    // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
    hover: {
      fill: 'lightsteelblue',
    },
    // 鼠标点击节点，即 click 状态为 true 时的样式
    click: {
      stroke: '#000',
      lineWidth: 3,
    },
  },
  // 边不同状态下的样式集合
  edgeStateStyles: {
    // 鼠标点击边，即 click 状态为 true 时的样式
    click: {
      stroke: 'steelblue',
    },
  },
});


const main = async () => {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json',
  );
  const remoteData = await response.json();

  // 遍历节点数据
  const nodes = remoteData.nodes;
  nodes.forEach((node) => {
    if (!node.style) {
      node.style = {};
    }
    switch (
      node.class // 根据节点数据中的 class 属性配置图形
    ) {
      case 'c0': {
        node.type = 'circle'; // class = 'c0' 时节点图形为 circle
        break;
      }
      case 'c1': {
        node.type = 'rect'; // class = 'c1' 时节点图形为 rect
        node.size = [35, 20]; // class = 'c1' 时节点大小
        break;
      }
      case 'c2': {
        node.type = 'ellipse'; // class = 'c2' 时节点图形为 ellipse
        node.size = [35, 20]; // class = 'c2' 时节点大小
        break;
      }
    }
  });

  // 遍历边数据
  const edges = remoteData.edges;
  edges.forEach((edge) => {
    if (!edge.style) {
      edge.style = {};
    }
    edge.style.lineWidth = edge.weight; // 边的粗细映射边数据中的 weight 属性数值
    edge.style.opacity = 0.6;
    edge.style.stroke = 'grey';
  });

  // 鼠标进入节点
  graph.on('node:mouseenter', (e) => {
    const nodeItem = e.item; // 获取鼠标进入的节点元素对象
    graph.setItemState(nodeItem, 'hover', true); // 设置当前节点的 hover 状态为 true
  });

  // 鼠标离开节点
  graph.on('node:mouseleave', (e) => {
    const nodeItem = e.item; // 获取鼠标离开的节点元素对象
    graph.setItemState(nodeItem, 'hover', false); // 设置当前节点的 hover 状态为 false
  });

  // 点击节点
  graph.on('node:click', (e) => {
    // 先将所有当前是 click 状态的节点置为非 click 状态
    const clickNodes = graph.findAllByState('node', 'click');
    clickNodes.forEach((cn) => {
      graph.setItemState(cn, 'click', false);
    });
    const nodeItem = e.item; // 获取被点击的节点元素对象
    graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
  });

  // 点击边
  graph.on('edge:click', (e) => {
    // 先将所有当前是 click 状态的边置为非 click 状态
    const clickEdges = graph.findAllByState('edge', 'click');
    clickEdges.forEach((ce) => {
      graph.setItemState(ce, 'click', false);
    });
    const edgeItem = e.item; // 获取被点击的边元素对象
    graph.setItemState(edgeItem, 'click', true); // 设置当前边的 click 状态为 true
  });

  graph.data(remoteData); // 加载远程数据
  graph.render(); // 渲染
};

main();