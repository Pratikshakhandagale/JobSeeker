/* eslint-disable no-mixed-spaces-and-tabs */
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
// import Divider from "../components/Divider";
import Footer from "./FooterChat";
import Footer2 from "./Footer";
import HeaderChat from "./HeaderChat";
import Messages from "./Message";
import Axios from "axios";
import Header from "./Header";

const Chatbotui = () => {
  let [messages, setMessages] = useState([
    { from: "computer", text: "Welcome to the NEP NCF Sathi Bot. Talk to me to get any quesitons you have about NEP & NCF & I will do my best to answer it." },
    // { from: "me", text: "Hey there" },
    // { from: "me", text: "Myself Ferin Patel" },
    {
      from: "computer",
      text: "Here are some sample questions : What is the purpose of the National Curriculum Framework for the Foundational Stage (NCF-FS) How does the National Curriculum Framework for School Education (NCF) align with the vision of the National Education Policy (NEP) 2020",
    },
    ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    setMessages((old) => [...old, { from: "me", text: inputMessage }]);

    setIsLoading(true); // Start loading
    //chatbot
    try {
      const response = await Axios(
        `https://beta-ncfsaarathi.sunbird.org/ncf-chat/answer?model=gpt-4&q=${inputMessage}&sources=NCF_SE;NCF_FS;NEP`
      );
      const data = response.data;

      if (data) {
        setInputMessage("");
        setMessages((old) => [...old, { from: "computer", text: data }]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    // <><div className={styles.menuDiv}>
    //   <button onClick={() => navigate("/")}>🏠</button>
    // </div>
    <>
      <Header />
      <Flex w="100%" h="85vh" justify="center" align="center" marginTop="80px">
        <Flex h="100%" flexDir="column">
          <HeaderChat />
          <Messages messages={messages} />
          {isLoading && (
            <div>Loading...</div> // Display loading indicator
          )}
          <div>
            <Footer
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default Chatbotui;
