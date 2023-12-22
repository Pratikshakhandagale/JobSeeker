import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import SunbirdVideoPlayer from "./Player";
import Header from "./Header";
import imagePath from "../assets/TSHeader.png";
import ImageLoader from "../components/Common/getImagesData";
import { useTranslation } from "react-i18next";
import Footer from "./Footer";

function StoryDetatils() {
 
  const location = useLocation();
  const state = location?.state;
  const [showIframe, setShowIframe] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();
  console.log(state.product)
  // const parts = state?.product?.descriptor?.images[0].url.split("/");
  // const filename = parts[parts.length - 1];

  return (
    <div>
      <div>
        <Header />
      </div>
      <div
        className="product-card"
        style={{
          marginTop: "60px",
          height: "auto",
          width: "auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="player-header">
          <div className="title-wrapper">
            <h1 style={{ fontSize: "12px" }}>
              {state?.product?.title}
            </h1>
            <h1 style={{ fontSize: "10px", fontStyle: "italic" }}>
              {state?.product?.publishDate}
            </h1>
          </div>
          <button
            className="player-button"
            onClick={() => {
              navigate(-1);
            }}
          >
            {showIframe ? "X" : "▶"}
          </button>
        </div>
        {showIframe && (
          <div className="video-player">
            <SunbirdVideoPlayer
              url={
                state?.product?.PDF?.data
                  ? state.product?.PDF?.data[0]?.url
                  : state?.product?.url
              }
              width="90vh"
              height="50vh"
            />
          </div>
        )}
        <div
          className="container"
          style={{ display: "flex", marginBottom: "100px" }}
        >
          {/* <div className="left-column">
            <ImageLoader imageId={filename} alt="Product Image" />{" "}
          </div> */}
          <div className="right-column">
            <p>
              {t("Title")}: {state?.product?.title}
            </p>
            <p>
              {t("Crop")}: {state?.product?.crop}
            </p>
            <p>
              {t("Description")}: {state?.product?.description}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default StoryDetatils;
