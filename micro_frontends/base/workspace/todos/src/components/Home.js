import React, { useState, useEffect } from 'react';

function useToolsModule () {
  const [toolsModule, setToolsModule] = useState();

  useEffect(() => {
    System.import('@yueluo/tools').then(setToolsModule);
  }, []);

  return toolsModule;
}

const Home = () => {
  const toolsModule = useToolsModule();

  useEffect(() => {
    let subjection = null;

    if (toolsModule) {
      toolsModule.sayHello('@yueluo/todos');
      subjection = toolsModule.sharedSubject.subscribe(console.log);
    }

    return () => subjection && subjection.unsubscribe();
  });


  return (
    <div>
      Home works
      <button onClick={() => toolsModule.sharedSubject.next('@yueluo/todos -> hello')}>Send Message</button>
    </div>
  );
}

export default Home;