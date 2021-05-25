function loader (sourceCode) {
  let style = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(sourceCode)};
    document.head.appendChild(style);
  `;

  return style;
}

module.exports = loader;