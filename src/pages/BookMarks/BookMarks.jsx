import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "./bookmarks.css";
import { getAllBookMarks, removebookmarkFromList } from "../../api/Apicall";
import { DeleteIcon } from "@chakra-ui/icons";
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
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [bookmarks, setbookmarks] = useState([]);
  useEffect(() => {
    getMyBookMarks();
  }, []);

  const getMyBookMarks = async () => {
    let response = await getAllBookMarks();
    setbookmarks(response);
  };

  const handleDelete = async (id) => {
    let response = await removebookmarkFromList(id);
    if (response?.delete_bookmark) {
      getMyBookMarks();
    }
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="App">
        <div className="product-container" style={{ marginTop: "70px" }}>
          <table className="bookmark-table">
            <thead>
              <tr>
                <th style={{ color: "white" }}>Bookmark Title</th>
                <th style={{ color: "white" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookmarks.length === 0 ? (
                <tr>
                  <td colSpan="2">No BookMarks available</td>
                </tr>
              ) : (
                bookmarks?.map((item) => (
                  <tr key={item.id}>
                    <td
                      style={{
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.textDecoration = "underline";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.textDecoration = "none";
                      }}
                      onClick={() => {
                        navigate("/myBookMarksContent", {
                          state: {
                            item: item?.id,
                          },
                        });
                      }}
                    >
                      {item.title}
                    </td>
                    <td>
                      <Popover>
                        <PopoverTrigger>
                          <Button>
                            <DeleteIcon
                              boxSize={4}
                              color="red.500"
                              cursor="pointer"
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Confirmation!</PopoverHeader>
                          <PopoverBody>
                            Are you sure you want to delete this item?
                          </PopoverBody>
                          <Button
                            onClick={() => handleDelete(item?.id)}
                            colorScheme="red"
                            size="sm"
                            mt={2}
                          >
                            Yes, Delete
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
