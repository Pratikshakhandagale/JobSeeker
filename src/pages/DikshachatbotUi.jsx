/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from "react";// import Divider from "../components/Divider";
import Footer from "./FooterDiksha";
import Footer2 from "./Footer";
import HeaderDiksha from "./HeaderDiksha";
import Messages from "./Message";
import Axios from "axios";
import Header from "./Header";
import { Flex } from "@chakra-ui/react";
import styles from "./Chatbot.module.css";
import imagePath from "../assets/ChatBot_logo.png";
import MessagesDiksha from "./MessageDiksha"
const DikshachatbotUi = () => {
  const [messages, setMessages] = useState([
    { from: "computer", text: "Welcome to the Diksha AI Discovery Bot." },
    // Add more initial messages here if needed
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    setMessages((old) => [...old, { from: "me", text: inputMessage }]);
    setIsLoading(true); // Start loading
  
    try {
      const requestBody = {
        audioCode: "",
      };
      const queryParams = {
        searchType: "text",
        searchString: inputMessage,
      };
  
      const response = await Axios.post(
        `https://aidiscovery.uniteframework.io/intent/openai/search`,
        requestBody,
        {
          params: queryParams,
        }
      );
      const data = response.data.result.data;
  
      if (response) {
       
        const botMessage = data;
        if (data && Array.isArray(data)) {
          // const extractedData = data.slice(0, 3).map(item => {
          //   const { title, link } = item;
          //   return { title, link };
          // });
  
          const extractedData = data.reduce((result, item) => {
            const { title, link } = item;
            result[title] = link; 
            return result;
          }, {});
          console.log("extractedData",extractedData)

          // Create a new message for the user's input
          const userMessage = { from: "me", text: inputMessage };
  
          // Create a new array combining old messages, user message, and bot messages
          const extractedDataList = Object.entries(extractedData); // Slice the first three items

          const extractedDataMessage = {
            from: "computer",
            text: (
              <React.Fragment>
              <div>Based on your search, here are some diksha content...</div>
              <ul style={{marginLeft: "8px"}}>
                {extractedDataList.map(([key, value]) => (
                  <li key={key}>
                    <a
                      href={value}
                      style={{ color: 'blue' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {key}
                    </a>
                  </li>
                ))}
              </ul>
            </React.Fragment>
            
            
            ),
          };
          
          const newMessages = [...messages, userMessage, extractedDataMessage];
          // Set the updated messages
          setMessages(newMessages);
          setInputMessage("");

        } else {
          console.error('API request failed');
        }
      } else {
        console.error('API request failed');
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
    <div className={styles.chatcontainer}>

<div className={styles.chatcontent}>
  <HeaderDiksha />
  <MessagesDiksha messages={messages} />
  {isLoading && <div className={styles.loading}>Loading...</div>}
</div>
<Footer
  inputMessage={inputMessage}
  setInputMessage={setInputMessage}
  handleSendMessage={handleSendMessage} />
</div>
      </Flex>
      
   </>
  );
};

export default DikshachatbotUi;
