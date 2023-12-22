import React, { useState, useEffect } from "react";
import { getImageUrl } from "../../api/Apicall";
import { Image } from "@chakra-ui/react";
import kidsImage from "../../assets/kids.png";
import onestdefaultImage from "../../assets/onestdefault.png";

function ImageLoader({ imageId, src, headers }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getImageUrl(imageId)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("Error loading image:", error);
        setImageError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [imageId]);

  const handleImageError = () => {
    setImageError(true);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (imageError) {
    return (
      <Image
        src={onestdefaultImage}
        alt="Image"
        style={{
          maxWidth: "100%",
          maxHeight: "125px",
          overflow: "hidden",
          objectFit: "cover",
          minHeight: "125px",

          borderRadius: headers ? "20%" : "",
        }}
        objectFit="cover"
        p="10px"
        loading="lazy"
      />
    );
  } else if (imageId === null) {
    return (
      <div
        style={{
          background: "white",
          display: "inline-block",
        }}
      >
        <img
          src={onestdefaultImage}
          alt="Image"
          style={{
            maxWidth: "100%",
            maxHeight: "125px",
            overflow: "hidden",
            objectFit: "cover",
            minHeight: "125px",
            borderRadius: headers ? "20%" : "",
          }}
          p="10px"
          loading="lazy"
        />
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "top",
        }}
      >
        <Image
          src={imageUrl}
          alt="Image"
          style={{
            maxWidth: "100%",
            maxHeight: "125px",
            overflow: "hidden",
            objectFit: "cover",
            minHeight: "125px",
            borderRadius: headers ? "20%" : "",
          }}
          p="10px"
          loading="lazy"
          onError={handleImageError}
        />
      </div>
    );
  }
}

export default ImageLoader;
