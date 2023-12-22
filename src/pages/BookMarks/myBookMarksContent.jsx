import React, { useState, useEffect } from "react";
import ProductCard from "../Card";
import ".././Homepage.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
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
import { getBookmarksbyId, removeFrombookmark } from "../../api/Apicall";
import BookMarksCards from "./BookMarksCard";
import { DeleteIcon } from "@chakra-ui/icons";

function MyBookMarksContentList({ item }) {
  const location = useLocation();
  const items = location?.state;
  const [story, setStory] = useState([]);

  const { t } = useTranslation();

  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleDelete = async (id) => {
    let response = await removeFrombookmark(id);
    if (response?.data) {
      getCollection();
    }
  };

  // Filter your data based on the search input
  const filteredStory = story?.filter((product) => {
    const title = product.bookmarkContentFlnContentRelation.title || "";
    const description =
      product.bookmarkContentFlnContentRelation.description || "";

    return (
      title.toLowerCase().includes(searchText.toLowerCase()) ||
      description.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  useEffect(() => {
    getCollection();
  }, []);

  const getCollection = async () => {
    let response = await getBookmarksbyId(items?.item);
    setStory(response);
  };

  // Filter the story array based on selectedCategory

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
                  <BookMarksCards
                    product={product?.bookmarkContentFlnContentRelation}
                  />
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
                        onClick={() =>
                          handleDelete(
                            product?.bookmarkContentFlnContentRelation?.id
                          )
                        }
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
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default MyBookMarksContentList;
