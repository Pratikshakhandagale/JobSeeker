import React from "react";
import { Flex, Input, Button, Image } from "@chakra-ui/react";
import imagePath from "../assets/microphone.png";
import styles from "./Chatbot.module.css";

const FooterChat = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  return (
    <Flex w="90%" mt="5">
      <div style={{ position: "relative", flex: 1 }}>
        <Input
          placeholder="Type Something..."
          borderRadius="none"
          border="1px solid black"
          _focus={{
            border: "1px solid black",
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          style={{ paddingRight: "30px" }} // Add some right padding for the image
        />
        <Image
          src={imagePath}
          alt="Audio Logo"
          w="20px"
          h="20px"
          position="absolute"
          right="5px"
          top="50%"
          transform="translateY(-50%)"
		//   _hover={{
		// 	text:"New function to come"
		//   }}
		title="Upcoming Feature"
        />	
      </div>&nbsp; &nbsp;
      <Button
        bg="#61A7E9"
        color="black"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
};

export default FooterChat;
