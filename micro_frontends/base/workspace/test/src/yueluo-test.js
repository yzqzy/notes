let testContainer = null

export async function bootstrap () {
  console.log('应用正在启动');
}

export async function mount () {
  console.log('应用正在挂载');

  testContainer = document.createElement('div');
  testContainer.id = 'test-container';
  testContainer.innerHTML = 'hello, single spa test！';

  document.body.appendChild(testContainer);
}

export async function unmount () {
  console.log('应用正在卸载');
  
  document.body.removeChild(testContainer);
}