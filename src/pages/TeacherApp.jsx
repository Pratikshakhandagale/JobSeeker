import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TeacherApp.module.css";
import Header from "./Header";
import { useTranslation } from "react-i18next";
import Footer from "./Footer";

function TeacherApp() {
  const { t } = useTranslation();
  const [localqr, setLocalQr] = useState("");
  const [board, setBoard] = useState("");
  const [studentgrade, setStudentGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const [displayText, setDisplayText] = useState("");
  const [displayText2, setDisplayText2] = useState(
    "Some Practice Questions on Air around Us Grade 6 from class 6 science chapter 15"
  );
  const [displayText3, setDisplayText3] = useState(
    "Acute and Chronic Diseases"
  );
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const qrcode = localStorage.getItem("scannedcode");
    const localstorageboard = localStorage.getItem("board");
    const localstoragestudentgrade = localStorage.getItem("studentgrade");
    const localstoragesubject = localStorage.getItem("subject");
    const localstoragedescription = localStorage.getItem("description");

    console.log(qrcode);
    console.log(localstorageboard);
    console.log(localstoragestudentgrade);
    console.log(localstoragesubject);
    console.log(localstoragedescription);
    setLocalQr(qrcode);
    setBoard(localstorageboard);
    setStudentGrade(localstoragestudentgrade);
    setSubject(localstoragesubject);
    setDescription(localstoragedescription);
  }, []);

  // useEffect(() => {
  //   for (var i = localStorage.length - 1; i >= 0; i--) {
  //     var key = localStorage.key(i);

  //     if (key !== "token") {
  //       localStorage.removeItem(key);
  //     }
  //   }

  //   // localStorage.clear();
  // }, []);

  const myclick0 = () => {
    window.open(`https://diksha.gov.in/get/dial/${localqr}`);
  };

  const myclick = () => {
    console.log(displayText);
    localStorage.setItem(
      "displayText",
      `Some Practice Questions to ask students on ${description} for ${studentgrade} subject ${subject}`
    );
    navigate("/chatbot");
  };
  const myclick2 = () => {
    console.log(displayText2);
    localStorage.setItem(
      "displayText",
      `Some Practice quiz for students on ${description} for ${studentgrade} subject ${subject}`
    );
    navigate("/chatbot");
  };
  const myclick3 = () => {
    console.log(displayText3);
    localStorage.setItem(
      "displayText",
      `Some Class Activity for students on ${description} for ${studentgrade} on subject ${subject}`
    );
    navigate("/chatbot");
  };
  const myclick4 = () => {
    window.open("http://139.59.21.40:5001/");
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div className={styles.outerdiv}>
      <Header />
      <h2
        style={{ display: "flex", alignItems: "center" }}
        onClick={handleBackButton}
      >
        {" "}
        {/* <ArrowBackIcon style={{ color: "gray" }} /> */}
      </h2>
      {/* <h3>Dial code : {localqr}</h3> */}
      <div>
        {board}, {studentgrade}, {subject}
      </div>
      <h3 style={{ color: "red" }}>{description}</h3>
      <button className={styles.button} onClick={myclick0}>
        {" "}
        <span>{t("conceptButton")}</span>
        {/* <LaunchIcon /> */}
      </button>
      <button className={styles.button} onClick={myclick}>
        {" "}
        {t("QuestionsButton")}
      </button>
      <button className={styles.button} onClick={myclick2}>
        {" "}
        {t("PracticeButton")}
      </button>
      <button className={styles.button} onClick={myclick3}>
        {" "}
        {t("ActivityButton")}
      </button>

      <Footer />
    </div>
  );
}

export default TeacherApp;
