import React from 'react';
import { Box, Button, useColorMode, Flex } from '@chakra-ui/react';
import Form from './components/Form';
import Card from './components/Card';

function App () {
  const { toggleColorMode } = useColorMode();

  return (
    <Box>
      <Button
        colorScheme="teal"
        mt="10px"
        ml="10px"
        mb="30px"
        onClick={toggleColorMode}
      >
        切换模式
      </Button>
      <Flex width="100%">
        <Box width={ 400 }>
          <Form />
        </Box>
        <Box width={ 400 } ml="30px">
          <Card />
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
