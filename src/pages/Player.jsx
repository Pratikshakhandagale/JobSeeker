import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PDFViewer from "./PDFViewer";
import {
  getDikshaContentWithBody,
  getSunbirdContent,
  getdikshaContent,
  getShikshaWithBody,
} from "../api/Apicall";

const SunbirdVideoPlayer = (props) => {
  const [url, setUrl] = React.useState();
  const [data, setData] = React.useState();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  const getSunBirdLink = async (id) => {
    const match = id.match(/\/do_([^\/]+)$/);
    const identifier = match ? match[0].replace("-latest", "") : null;
    let response = await getSunbirdContent(identifier);
    setUrl(response?.previewUrl);
  };

  const getDikshaLink = async (id) => {
    const match = id.match(/\/do_([^\/]+)$/);
    const identifier = match ? match[0].replace("-latest", "") : null;
    let response = await getdikshaContent(identifier);
    setUrl(response?.previewUrl);
  };

  const getContentWithBody = async (id) => {
    const match = id.match(/\/do_([^\/]+)$/);
    const identifier = match ? match[0].replace("-latest", "") : null;
    let response = await getDikshaContentWithBody(identifier);
    setData(response);
    if (response?.streamingUrl) {
      setUrl(response?.streamingUrl);
    } else {
      setUrl(response?.artifactUrl);
    }
  };

  const getsunbirdContentWithBody = async (id) => {
    const match = id.match(/\/do_([^\/]+)$/);
    const identifier = match ? match[0].replace("-latest", "") : null;
    let response = await getShikshaWithBody(identifier);
    setData(response);
    if (response?.streamingUrl) {
      setUrl(response?.streamingUrl);
    } else {
      setUrl(response?.artifactUrl);
    }
  };
  React.useEffect(() => {
    console.log("props.url",props)
    if(props?.url == null){
      getContentWithBody(props?.url);
    }
    else if (props?.url.startsWith("http://")) {
      window.open(props.url, "_blank");
      navigate("/");
    } else if (props?.url.startsWith("https://sunbird")) {
      getSunBirdLink(props?.url);
    } else if (props?.url.startsWith("https://diksha")) {
      getDikshaLink(props?.url);
    } else if (props?.url.startsWith("/uploads")) {
      window.open(url, "_blank");
      navigate("/");
    } else if (props?.url.includes("watch?v")) {
      setUrl(props?.url.replace("watch?v=", "embed/"));
    } else {
      setUrl(props.url.replace("/view", "/preview"));
    }
  }, [props?.mediaType]);

  if (url) {
    const fileExtension = url.split(".").pop().toLowerCase();
    if (fileExtension === "pdf") {
      return (
        <div>
          {/* {isLoading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                fontSize: "25px",
              }}
            >
              🌀 Loading...
            </div>
          )} */}
          <PDFViewer
            id="preview"
            allow="autoplay; fullscreen"
            onLoad={handleIframeLoad}
            url={url}
          />
        </div>
      );
    } else {
      return (
        <div>
          {isLoading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                fontSize: "25px",
              }}
            >
              🌀 Loading...
            </div>
          )}
         
            <iframe
              id="preview"
              width="100%"
              height="500vh"
              name={JSON.stringify(props)}
              src={`${url}?autoplay=1#toolbar=0`}
              allow="autoplay; fullscreen"
              onLoad={handleIframeLoad}
            />
          
        </div>
      );
    }
  } else {
    return <h2>{`${props?.mimeType} this mime type not compatible`}</h2>;
  }
};

export default React.memo(SunbirdVideoPlayer);
