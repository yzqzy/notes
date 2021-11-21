import { useEffect } from 'react';

function Timer () {
  useEffect(() => {
    let timer = setInterval(() => {
      console.log('timer running.');
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>Timer Test</div>
  )
}

export default Timer;