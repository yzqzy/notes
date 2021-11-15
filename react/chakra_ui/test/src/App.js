import React from 'react';
import { Button, Box, Text, useColorMode, useColorModeValue, LightMode } from '@chakra-ui/react';

function App () {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('tomato', 'skyblue');

  return (
    <Box w={ 200 } h={ 100 } bgColor={ bgColor }>
      <Text>{ colorMode }</Text>
      <Button onClick={ toggleColorMode }>按钮</Button> <br />
      <LightMode>
        <Button onClick={ toggleColorMode }>按钮</Button>
      </LightMode>
    </Box>
  );
}

export default App;
