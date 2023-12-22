import React, { useState, useEffect } from "react";
import "../../Homepage.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Header";
import Footer from "../../Footer";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FaUndo } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import BookMarksCards from "./LocalBookMarksCard";
import { DeleteIcon } from "@chakra-ui/icons";
import Loading from "../../../components/Loading";

function MyBookMarksContentList({ item }) {
  const location = useLocation();
  const items = location?.state;
  let filteredStory = [];
  const [isLoading, setIsLoading] = useState(false);

  const storedData = JSON.parse(localStorage.getItem("myBookMarks"));
  const initialStory = storedData ? storedData : [];

  const [story, setStory] = useState(initialStory);

  // const [story, setStory] = useState(
  //   JSON.parse(localStorage.getItem("myBookMarks") || [])
  // );
  useEffect(() => {}, [story]);

  const { t } = useTranslation();

  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleDelete = (code) => {
    const updatedStory = story.filter((item) => item.code !== code);

    setStory(updatedStory);

    localStorage.setItem("myBookMarks", JSON.stringify(updatedStory));
  };
  // Filter your data based on the search input
  if (Array.isArray(story)) {
    filteredStory = story?.filter((product) => {
      const title = product.title || "";
      const description = product.description || "";

      return (
        title.toLowerCase().includes(searchText.toLowerCase()) ||
        description.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }

  // Filter the story array based on selectedCategory

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="App">
        {isLoading ? (
          <Loading />
        ) : (
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
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <input
                type="text"
                placeholder={t("searchCollection")}
                value={searchText}
                onChange={handleSearchChange}
                style={{ border: "2px solid black", width: "100%" }}
              /> */}
              </div>
            </div>
            {filteredStory?.length === 0 ? (
              <p>No data available in this bookmark.</p>
            ) : (
              filteredStory?.map((product, index) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <div key={index}>
                    <BookMarksCards product={product} />
                  </div>
                  <div>
                    <Popover placement="top">
                      <PopoverTrigger>
                        <DeleteIcon
                          boxSize={4}
                          color="red.500"
                          cursor="pointer"
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation!</PopoverHeader>
                        <PopoverBody>Are you sure ?</PopoverBody>
                        <Button
                          onClick={() => handleDelete(product?.code)}
                          colorScheme="red"
                          size="sm"
                          mt={3}
                        >
                          Yes, Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div style={{ marginTop: "100px" }}>
        <Footer />
      </div>
    </div>
  );
}

export default MyBookMarksContentList;
