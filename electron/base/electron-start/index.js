window.addEventListener('DOMContentLoaded', () => {
  const oBtn = document.getElementById('J-btn');

  oBtn.addEventListener('click', () => {
    const options = {
      title: '提示',
      body: '消息通知',
      icon: './favicon.ico',
    };

    const notification = new window.Notification(options.title, options);

      notification.onclick = () => {
        console.log('click');
      }
  });
});
