import React from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  Flex,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import ChakraUI from '../assets/images/chakra-ui.png';
import { AiFillStar } from 'react-icons/ai';

export default function Card () {
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.100');

  return (
    <Box
      w={ 400 }
      borderRadius="lg"
      boxShadow="lg"
      bgColor={ bgColor }
      overflow="hidden"
    >
      <Image src={ ChakraUI } />
      <Box
        p={ 3 }
      >
        <Stack direction="row" align="center">
          <Badge variant="solid" colorScheme="teal" borderRadius="full" px="2">New</Badge>
          <Badge variant="solid" colorScheme="teal" borderRadius="full" px="2">React</Badge>
          <Badge variant="solid" colorScheme="teal" borderRadius="full" px="2">Chakra-UI</Badge>
          <Text color={ textColor }>月落</Text>
        </Stack>
        <Text as="h3" pt={ 3 } pb={ 2 } color={ textColor } fontSize="xl" fontWeight="semibold">Chakra-UI 框架专题课程</Text>
        <Text fontWeight="light" fontSize="sm" color={ textColor } lineHeight="tall">
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          xxxxxxxxxxxxxxxxxxxxxxx
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        </Text>
        <Flex align="center" mt={ 2 }>
          <Flex color="teal.500">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </Flex>
          <AiFillStar />
          <Text color={ textColor } ml={ 1 }>100 评论</Text>
        </Flex>
      </Box>
      <Button w="100%" colorScheme="teal"> 登录</Button>
    </Box>
  )
}
