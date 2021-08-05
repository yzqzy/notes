interface Post {
  title: string;
  content: string;
  subtitle?: string; // 可选属性
  readonly summary: string; // 定义后不能再次修改
}

function printPost (post: Post) {
  console.log(post.title);
  console.log(post.content);
}

const hello = {
  title: 'Hello TypeScript',
  content: 'a javascript superset',
  summary: ''
};

const hello2 = {
  title: 'Hello TypeScript',
  content: 'a javascript superset',
  subtitle: 'typescipt',
  summary: ''
};


// 动态成员

interface $Cache {
  [key: string]: string;
}

const cache: $Cache = {};

cache.foo = 'foo';