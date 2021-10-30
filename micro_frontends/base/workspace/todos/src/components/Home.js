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

  if (toolsModule) {
    toolsModule.sayHello('@yueluo/todos');
  }

  return <div>Home works</div>;
}

export default Home;
