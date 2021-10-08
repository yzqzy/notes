const json = [
  {
    title: "一",
    key: "1",
    children: [{ title: "三", key: "3", children: [] }]
  },
 {
    title: "二",
    key: "2",
    children: [{ title: "四", key: "4", children: [] }]
  },
];

class Demo extends React.Component {
  dfs = (n) => {
    return (
      <TreeNode title={n.title} key={n.key}>
        { n.children.map(this.dfs) }
      </TreeNode>
    );
  }

  render () {
    return (
      <Tree>
        { json.map(this.dfs) }
      </Tree>
    )
  }
}