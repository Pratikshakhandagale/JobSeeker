import React, { useState, useEffect } from "react";
import ProductCard from "../Card";
import "../Homepage.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaUndo } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { getContentbyCollectionId } from "../../api/Apicall";
import CollectionProductCard from "./CollectionContentCard";

function CollectionDetails() {
  const location = useLocation();
  const product = location?.state;
  const [story, setStory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory") || "all"
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "all"
  );
  const [ageGroup, setAgeGroup] = useState(
    localStorage.getItem("ageGroup") || "all"
  );
  const [actor, setActor] = useState(localStorage.getItem("actor") || "all");
  const [currentPage, setCurrentPage] = useState(0); // Current page for pagination

  const itemsPerPage = 10; // Number of items per page
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getContentData = async () => {
    let response = await getContentbyCollectionId(product?.product?.id);

    const jsonString = JSON.stringify(response?.collectionContentRelation);
    localStorage.setItem("collectionList", jsonString);
    setStory(response?.collectionContentRelation);
  };
  useEffect(() => {
    getContentData();
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="App">
        <div className="product-container" style={{ marginTop: "70px" }}>
          <div
            style={{
              position: "sticky",
              top: "70px",
              zIndex: 10,
              background: "#fff",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}></div>

            <div style={{ marginLeft: "5px" }}></div>
          </div>

          {story?.length === 0 ? (
            <p>No data available for the selected filters.</p>
          ) : (
            story?.map((product, index) => (
              <div key={index}>
                <CollectionProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default CollectionDetails;
