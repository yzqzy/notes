import React from "react";
import { Box, Tabs, Tab, TabList, TabPanels, TabPanel, Image } from "@chakra-ui/react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

import chakraUILight from '../assets/images/chakra-ui-light.png';

export default function Form () {
  return (
    <Box bgColor="gray.200" p={3} boxShadow="lg" borderRadius="lg">
      <Image w={ 250 } mx="auto" mt="2" mb="6" src={ chakraUILight } />
      <Tabs isFitted>
        <TabList>
          <Tab _focus={{ boxShadow: 'none' }}>注册</Tab>
          <Tab _focus={{ boxShadow: 'none' }}>登录</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignUp />
          </TabPanel>
          <TabPanel>
            <SignIn />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}