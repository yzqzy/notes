const oBtn = document.querySelector('#btn');

oBtn.onclick = async function () {
  const { default: Test } = await import('./index.module');
  const { plus } = await import('./index2.module');

  console.log(plus(1, 2));
  
  new Test();
}