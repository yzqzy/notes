const obj = {
  tag: 'div',
  children: [
    { tag: 'span', children: 'hello world' }
  ]
};

function Render(obj, root) {
  const el = document.createElement(obj.tag);
  
  if (typeof obj.children === 'string') {
    const text = document.createTextNode(obj.children);
    el.appendChild(text);
  } else if (obj.children) {
    obj.children.forEach((child) => Render(child, el));
  }
  
  root.appendChild(el);
};

Render(obj, document.body);



// const hmtl = `
//   <div>
//     <span>hello world</span>
//   </div>
// `;

// const obj = Compiler(hmtl);

// Render(obj, document.body);


//   <div>
//     <span>hello world</span>
//   </div>

const div = document.createElement('div');
const span = document.createElement('span');

span.innerText = 'hello world'
div.appendChild(span);

document.body.appendChild(div);