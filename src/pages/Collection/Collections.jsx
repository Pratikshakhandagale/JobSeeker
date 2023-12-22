import React, { useState, useEffect } from "react";
import ProductCard from ".././Card";
import ".././Homepage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaUndo } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { getAllCollections } from "../../api/Apicall";
import CollectionCards from "./CollectionCards";

function App() {
  const [story, setStory] = useState([]);
  const [selectedata, setselectedata] = useState(
    localStorage.getItem("selectedata") || "all"
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
  const resetFilters = () => {
    setselectedata("all");
    setLanguage("all");
    setAgeGroup("all");
    setActor("all");
  };
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    getCollection();
  }, []);

  const getCollection = async () => {
    let response = await getAllCollections();
    setStory(response);
    const jsonString = JSON.stringify(response);
    localStorage.setItem("collectionList", jsonString);
  };

  // get data from the local storage
  const storedData = localStorage.getItem("collectionList");
  let parsedArray = "";
  if (
    storedData === "undefined" ||
    storedData === undefined ||
    storedData === null
  ) {
    localStorage.setItem("collectionList", JSON.stringify([]));
    getCollection();
  } else {
    parsedArray = JSON.parse(storedData);
  }
  // Filter your data based on the search input
  const filteredStory = parsedArray.filter((product) => {
    const title = product.title || "";
    const description = product.description || "";
    const categoryFilter =
      selectedata === "all" || product?.themes === selectedata;
    const languageFilter = language === "all" || product?.language === language;
    const ageGroupFilter = ageGroup === "all" || product?.minAge == ageGroup;
    const actorFilter = actor === "all" || product?.actor === actor;

    return (
      categoryFilter &&
      languageFilter &&
      ageGroupFilter &&
      actorFilter &&
      (title.toLowerCase().includes(searchText.toLowerCase()) ||
        description.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  useEffect(() => {
    if (selectedata === "all") {
      localStorage.removeItem("selectedata");
    } else {
      localStorage.setItem("selectedata", selectedata);
    }
  }, [selectedata]);

  useEffect(() => {
    if (language === "all") {
      localStorage.removeItem("language");
    } else {
      localStorage.setItem("language", language);
    }
  }, [language]);

  useEffect(() => {
    if (ageGroup === "all") {
      localStorage.removeItem("ageGroup");
    } else {
      localStorage.setItem("ageGroup", ageGroup);
    }
  }, [ageGroup]);

  useEffect(() => {
    if (actor === "all") {
      localStorage.removeItem("actor");
    } else {
      localStorage.setItem("actor", actor);
    }
  }, [actor]);

  // Filter the story array based on selectedata

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
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "10px" }}>
                    <select
                      className="filters"
                      value={ageGroup}
                      onChange={(e) => setAgeGroup(e.target.value)}
                    >
                      <option value="all">{t("age")}</option>
                      <option value={1}>{t("1")}</option>
                      <option value={2}>{t("2")}</option>
                      <option value={3}>{t("3")}</option>
                      <option value={4}>{t("4")}</option>
                      <option value={5}>{t("5")}</option>
                    </select>
                  </div>

                  <div style={{ marginRight: "10px" }}>
                    <select
                      className="filters"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="all">{t("language")}</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Gujarati">Gujarati</option>
                      <option value="Assamese">Assamese</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Kannada">Kannada</option>
                    </select>
                  </div>

                  <div style={{ marginRight: "10px" }}>
                    <select
                      className="filters"
                      value={selectedata}
                      onChange={(e) => setselectedata(e.target.value)}
                    >
                      <option value="all">{t("type")}</option>
                      <option value="Video">{t("video")}</option>
                      <option value="Audio">{t("audio")}</option>
                      <option value="Read">{t("read")}</option>
                      <option value="Food">{t("Food")}</option>
                      <option value="Animals">{t("Animals")}</option>
                      <option value="Others">{t("Others")}</option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    marginLeft: "5px",
                  }}
                >
                  <button onClick={resetFilters}>
                    <FaUndo />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder={t("searchCollection")}
                value={searchText}
                onChange={handleSearchChange}
                style={{
                  border: "1px solid #007bff",
                  borderRadius: "5px",
                  padding: "5px",
                  width: "100%",
                  backgroundColor: "#ffffff",
                  textAlign: "center",
                }}
              />
            </div>
          </div>
          {filteredStory?.length === 0 ? (
            <p>No data available for the selected filters.</p>
          ) : (
            filteredStory?.map((product, index) => (
              <div key={index}>
                <CollectionCards product={product} />
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

export default App;
