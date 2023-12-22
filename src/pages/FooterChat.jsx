import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

const FooterChat = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  return (
	<Flex w="100%" mt="5">
  	<Input
    	placeholder="Type Something..."
    	
    	borderRadius="none"
		border= "1px solid black"

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
  	/>
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