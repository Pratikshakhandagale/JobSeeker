import React, { useState } from "react";
import styles from "./footer.module.css";
import { useTranslation } from "react-i18next";
import config from "../api/config.json";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBookmark } from "react-icons/fa";
import { Divider } from "@chakra-ui/react";

function Footer() {
  const { t } = useTranslation();
  let configData = localStorage.getItem("config");
  let localData = JSON.parse(configData);
  let configuredData = config;
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("home");
  let path = location?.pathname;
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <footer className={styles.footer}>
      {/* <div style={{ marginBottom: "10px" }}>
        <nav>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Link
              to="/"
              onClick={() => handleTabClick("home")}
              className={path === "/" ? styles.selected : ""}
            >
              <FaHome fontSize="25px" />
            </Link>
            <Divider orientation="vertical" />
            <Link
              to="/bookmarks"
              onClick={() => handleTabClick("bookmarks")}
              className={path === "/bookmarks" ? styles.selected : ""}
            >
              <FaBookmark fontSize="25px" />
            </Link>
          </div>
        </nav>
      </div> */}
      <hr />
      <p style={{ marginTop: "10px" }}>
        <a
          className={styles.pointer}
          href="https://www.tekdi.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {configuredData?.footerText
            ? configuredData?.footerText
            : `${t("footerText")} ❤️ ${t("footerText1")}`}
        </a>
        
      </p>
    </footer>
  );
}

export default Footer;
