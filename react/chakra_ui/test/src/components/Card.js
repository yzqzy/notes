import React from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  Flex,
  Button
} from '@chakra-ui/react';
import ChakraUI from '../assets/images/chakra-ui.png';
import { AiFillStar } from 'react-icons/ai';

export default function Card () {
  return (
    <Box
      w={ 400 }
      borderRadius="lg"
      boxShadow="lg"
      bgColor="gray.200"
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
          <Text>月落</Text>
        </Stack>
        <Text as="h3" pt={ 3 } pb={ 2 } color="gray.500" fontSize="xl" fontWeight="semibold">Chakra-UI 框架专题课程</Text>
        <Text fontWeight="light" fontSize="sm" lineHeight="tall">
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
          <Text ml={ 1 }>100 评论</Text>
        </Flex>
      </Box>
      <Button w="100%" colorScheme="teal"> 登录</Button>
    </Box>
  )
}
