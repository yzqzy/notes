import React from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  FormControl,
  FormHelperText,
  RadioGroup,
  Radio,
  Select,
  Switch,
  FormLabel,
  Flex,
  Button
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaCheck } from 'react-icons/fa';

export default function Form () {
  return (
    <form>
      <Stack spacing="6">
        <FormControl isDisabled isInvalid>
          <InputGroup>
            <InputLeftAddon children={ <FaUserAlt /> } />
            <Input placeholder="请输入用户名" />
          </InputGroup>
          <FormHelperText fontSize="xs">用户名是必填项</FormHelperText>
        </FormControl>
        <InputGroup>
          <InputLeftAddon children={ <FaLock /> } />
          <Input type="password" placeholder="请输入密码" />
          <InputRightAddon children={ <FaCheck /> } />
        </InputGroup>
        <RadioGroup defaultValue="0">
          <Stack direction="row" spacing="4">
            <Radio value="0">男</Radio>
            <Radio value="1">女</Radio>
          </Stack>
        </RadioGroup>
        <Select placeholder="请选择学科">
          <option value="Java">Java</option>
          <option value="大前端">大前端</option>
        </Select>
        <Flex>
          <Switch id="deal" mr="3" />
          <FormLabel htmlFor="deal">是否同意协议</FormLabel>
        </Flex>
        <Button _hover={{ bgColor: 'tomato' }} colorScheme="teal">注册</Button>
      </Stack>
    </form>
  )
}