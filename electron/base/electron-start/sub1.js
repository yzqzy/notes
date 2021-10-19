window.addEventListener('DOMContentLoaded', () => {
  const oInput = document.getElementById('J-input');

  oInput.value = localStorage.getItem('name');
});