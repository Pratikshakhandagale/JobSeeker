import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import SunbirdVideoPlayer from "../../Player";
import Header from "../../Header";
import ImageLoader from "../../../components/Common/getImagesData";
import { useTranslation } from "react-i18next";
import Footer from "../../Footer";

function BookMarkContentDetails() {
  const location = useLocation();
  const state = location?.state;
  const [showIframe, setShowIframe] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const parts = state?.product?.images[0].url.split("/");
  const filename = parts[parts.length - 1];
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
            <h1 style={{ fontSize: "18px" }}>{state?.product?.title}</h1>
            <h1 style={{ fontSize: "14px", fontStyle: "italic" }}>
              {state?.product?.publisher}
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
                  ? state.product.PDF?.data[0]?.url
                  : state?.product?.link
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
          <div className="left-column">
            <ImageLoader imageId={filename} alt="Product Image" />{" "}
          </div>
          <div className="right-column">
            <p>
              {t("Language")}: {state?.product?.language}
            </p>
            <p>
              {t("Age")}: {state?.product?.minAge}
            </p>
            <p>
              {t("Theme")}: {state?.product?.themes}
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

export default BookMarkContentDetails;
