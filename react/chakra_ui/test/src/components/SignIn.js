import React from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  FormControl,
  FormHelperText,
  Button
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaCheck } from 'react-icons/fa';

export default function SignIn () {
  return (
    <form>
      <Stack spacing="6">
        <FormControl>
          <InputGroup>
            <InputLeftAddon children={ <FaUserAlt /> } />
            <Input bgColor="white" placeholder="请输入用户名" />
          </InputGroup>
          <FormHelperText fontSize="xs">用户名是必填项</FormHelperText>
        </FormControl>
        <InputGroup>
          <InputLeftAddon children={ <FaLock /> } />
          <Input bgColor="white" type="password" placeholder="请输入密码" />
          <InputRightAddon children={ <FaCheck /> } />
        </InputGroup>
        <Button _hover={{ bgColor: 'tomato' }} colorScheme="teal">登录</Button>
      </Stack>
    </form>
  )
}