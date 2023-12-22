import React, { useState, useEffect } from "react";
import Header from "./Header";
import styles from "./SplashScreen.module.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "./Footer";

function SplashScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);
  const storyApp = () => {
    navigate("/home");
  };

  const qrscanner = () => {
    navigate("/qrscanner");
  };

  const chatbot = () => {
    navigate("/chatbotui");
  };

  const activity = () => {
    window.open("http://20.219.197.218/explore");
  };
  const dikshachat = () => {
    navigate("/dikshachatui");
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className={styles.innerDiv}>
        <div className={styles.buttonDiv}>
          <Button
            onClick={dikshachat}
            background="#F6B26B"
            size="lg"
            width={60}
            margin={3}
          >
            {t("button5")}
          </Button>

          <Button
            onClick={chatbot}
            background="#F6B26B"
            size="lg"
            width={60}
            margin={3}
          >
            {t("button2")}
          </Button>
          <Button
            onClick={qrscanner}
            background="#F6B26B"
            size="lg"
            width={60}
            margin={3}
          >
            {t("button3")}
          </Button>
          <Button
            onClick={storyApp}
            background="#F6B26B"
            size="lg"
            width={60}
            margin={3}
          >
            {t("button1")}
          </Button>
          {/* <Button
            onClick={activity}
            background="#F6B26B"
            size="lg"
            width={60}
            margin={3}
          >
            {t("button4")}
          </Button> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SplashScreen;
