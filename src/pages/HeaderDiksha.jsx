import React from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";
import imagePath from "../assets/ChatBot_logo.png";
const HeaderDiksha = () => {
  return (
    <Flex w="100%">
      <Avatar size="lg" src={imagePath}>
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
       Diksha AI Discovery Bot 
        </Text>
        <Text color="green.500">Online</Text>
      </Flex>

    </Flex>
	
  );
};

export default HeaderDiksha;
