import React from 'react';
import { Button, useColorMode } from '@chakra-ui/react';
import Form from './components/Form';

function App () {
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Button
        colorScheme="teal"
        mt="10px"
        ml="10px"
        onClick={toggleColorMode}
      >
        切换模式
      </Button>
      <Form />
    </>
  );
}

export default App;
