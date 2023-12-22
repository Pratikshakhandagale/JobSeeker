import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text, Box, VStack } from "@chakra-ui/react";

const fontSize = "md";

const Messages = ({ messages }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => {
      if (elementRef.current) {
        elementRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);

    return <div ref={elementRef} />;
  };
  return (
    <Flex
      flexDirection="column"
      h="100%"
      overflowY="auto"
      px={{ base: 2, md: 3 }}
      py={{ base: 3, md: 4 }}
    >
      {messages.map((item, index) => (
        <Flex
          key={index}
          justify={item.from === "me" ? "flex-end" : "flex-start"}
          alignItems="center"
          mb={{ base: 2, md: 3 }}
        >
          {item.from !== "me" && (
            <Box
              as="img"
              src="https://beta-ncfsaarathi.sunbird.org/assets/img/ncp/humanavatar.png"
              alt="Avatar"
              bg="blue.300"
              borderRadius="full"
              boxSize="30px"
              mr="2"
            />
          )}
          <Flex
            bg={item.from === "me" ? "#61A7E9" : "gray.100"}
            color="black"
            p="3"

            maxWidth="70%"
            whiteSpace="normal"
            overflow="hidden"
            textOverflow="ellipsis"
            borderRadius="md"
            boxShadow="sm"
          >
            <Text fontSize={fontSize} style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
              {item.text}
            </Text>
          </Flex>
        </Flex>
      ))}
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;
