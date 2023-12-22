import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./Card";
import "./Homepage.css";
// import axios from "axios";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import {
  addContentToBookmarks,
  createBookmarks,
  getallContent,
  getAllBookMarks,
  getTekdiallContent,
} from "../api/Apicall";
import Footer from "./Footer";
import Header from "./Header";
// import StarRating from "../components/Common/StarRating";
// import Loading from "../components/Loading";
// import CourseShimmer from "../components/Common/CourseShimmer";
import swal from "sweetalert";
import config from "../api/config.json";
import {
  Paginator,
  Container,
  Previous,
  Next,
  PageGroup,
  usePaginator,
} from "chakra-paginator";
import filterlogo from "/src/assets/Filter.svg";
import styles from "./Card.module.css";

function App() {
  const token = localStorage.getItem("token");
  const [story, setStory] = useState([]);
  const dtp = [];
  let configDatas = localStorage.getItem("config");
  let localData = JSON.parse(configDatas);
  const navigate = useNavigate();
  const { t } = useTranslation();
  let configuredData = config;
  //Rating
  const [currentRating, setCurrentRating] = useState(0);
  const handleRatingChange = (newRating) => {
    setCurrentRating(newRating);
  };
  const [openbookmarkModal, setopenbookmarkModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [listModal, setListModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [myAllBookmarks, setMyAllBookMarks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    configuredData?.filters?.contentType || "all"
  );
  const [district, setdistrict] = useState(
    configuredData?.filters?.district || "all"
  );
  const [jobStateGroup, setjobStateGroup] = useState(
    configuredData?.filters?.state || "all"
  );
  const [jobDistrictGroup, setjobDistrictGroup] = useState(
    configuredData?.filters?.target || "all"
  );
  const [educationGroup, seteducationGroup] = useState(
    configuredData?.filters?.branch || "all"
  );
  const [jobRoleGroup, setjobRoleGroup] = useState(
    configuredData?.filters?.language || "all"
  );

  const [sectorGroup, setsectorGroup] = useState(
    configuredData?.filters?.crop || "all"
  );
  const [subSectorGroup, setsubSectorGroup] = useState(
    configuredData?.filters?.publisher || "all"
  );
  const [actor, setActor] = useState(localStorage.getItem("actor") || "all");
  const [currentPage, setCurrentPage] = useState(0); // Current page for pagination

  const itemsPerPage = 10; // Current page for pagination
  const [selectedItems, setSelectedItems] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedProductstoLocal, setselectedProductstoLocal] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  useEffect(() => {
    setLoading(true);
    // searchResponse();
  }, []);

  useEffect(() => {
    const handlePageChange = () => {
      const state = { currentPage };
      const title = "";
      const url = window.location.href.split("?")[0];
      window.history.pushState(state, title, url);
    };

    handlePageChange();
    window.addEventListener("popstate", handlePageChange);

    return () => {
      window.removeEventListener("popstate", handlePageChange);
    };
  }, [currentPage]);
  const [storedValues, setStoredValues] = useState(null); // Variable to store entered values

  // Function to handle storing values on "Enter" click
  const handleSubmitenter = () => {
    const enteredValues = {
     
      jobStateGroup,
      district,
      selectedCategory,
      jobDistrictGroup,
      educationGroup,
      jobRoleGroup,
      sectorGroup,
      subSectorGroup,
    };
    searchResponse();
    onClose();
    setStoredValues(enteredValues);
  };

  useEffect(() => {
    searchResponse();
  }, [])
  
  const searchResponse = async () => {


    try {
      let bodyData = {
        "state": jobStateGroup,
        "district": district,
        "region": selectedCategory,
        "target_users": jobDistrictGroup,
        "language": jobRoleGroup,
        "crop": sectorGroup,
        "publisher": subSectorGroup,
      };
      for (const key in bodyData) {
        if (bodyData[key] === "all" || bodyData[key] === "All") {
          delete bodyData[key];
        }
      }

console.log("response", bodyData);

   bodyData['bpp_id']= "dash-beckn.tibilapps.com"
    
        let response = await getallContent(bodyData);
        console.log("response", response);
        // localStorage.setItem(
        //   "storyList",
        //   JSON.stringify(response.data.cache_db)
        // );
        setStory(response.data.jobs_cache);

        const stored = [];
        for (const item of response.data.jobs_cache) {
          stored.push(item);
        }

        setCourses(stored);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    token ? myBookMarksList() : null;
  }, []);
  const myBookMarksList = async () => {
    let response = await getAllBookMarks();
    setMyAllBookMarks(response);
  };

  const handleProductSelect = (productId) => {
    //add bookmark to localstorage

    setselectedProductstoLocal((prevSelected) => {
      const newDescriptors = new Set([...prevSelected, productId?.descriptor]);
      return Array.from(newDescriptors);
    });

    //add bookmark to api
    if (selectedProducts.includes(productId?.id)) {
      setSelectedProducts(
        selectedProducts.filter((id) => id !== productId?.id)
      );
    } else {
      setSelectedProducts([...selectedProducts, productId?.id]);
    }
  };

  // useEffect(() => {
  //   getContentData();
  // }, []);
  // const getContentData = async () => {
  //   let bodyData = {
  //     orderBy: configuredData?.orderBy,
  //   };
  //   try {
  //     const response = await getallContent(bodyData ? bodyData : "");
  //     const jsonString = JSON.stringify(response?.data?.fln_content);
  //     localStorage.setItem("storyList", jsonString);
  //     setStory(response?.data?.fln_content);
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    if (selectedCategory === "all") {
      localStorage.removeItem("selectedCategory");
    } else {
      localStorage.setItem("selectedCategory", selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (district === "all") {
      localStorage.removeItem("district");
    } else {
      localStorage.setItem("district", district);
    }
  }, [district]);

  useEffect(() => {
    if (jobStateGroup === "all") {
      localStorage.removeItem("jobStateGroup");
    } else {
      localStorage.setItem("jobStateGroup", jobStateGroup);
    }
  }, [jobStateGroup]);

  useEffect(() => {
    if (actor === "all") {
      localStorage.removeItem("actor");
    } else {
      localStorage.setItem("actor", actor);
    }
  }, [actor]);

  useEffect(() => {
    if (sectorGroup === "all") {
      localStorage.removeItem("sectorGroup");
    } else {
      localStorage.setItem("sectorGroup", sectorGroup);
    }
  }, [sectorGroup]);
  useEffect(() => {
    if (subSectorGroup === "all") {
      localStorage.removeItem("subSectorGroup");
    } else {
      localStorage.setItem("subSectorGroup", subSectorGroup);
    }
  }, [subSectorGroup]);
  useEffect(() => {
    if (jobDistrictGroup === "all") {
      localStorage.removeItem("jobDistrictGroup");
    } else {
      localStorage.setItem("jobDistrictGroup", jobDistrictGroup);
    }
  }, [jobDistrictGroup]);

  useEffect(() => {
    if (educationGroup === "all") {
      localStorage.removeItem("educationGroup");
    } else {
      localStorage.setItem("educationGroup", educationGroup);
    }
  }, [educationGroup]);
  // get data from the local storage
  const storedData = localStorage.getItem("storyList");
  let parsedArray = [];
  if (
    storedData === "undefined" ||
    storedData === undefined ||
    storedData === null
  ) {
    localStorage.setItem("storyList", JSON.stringify([]));
    // window.location.reload();
    searchResponse();
  } else {
    parsedArray = JSON.parse(storedData);
  }
  // Filter the story array based on selectedCategory
  // const filteredStory = stored?.filter((item) => {
  //   const title = item?.descriptor.title || "";
  //   const description = item?.descriptor.description || "";
  //   const categoryFilter =
  //     selectedCategory === "all" ||
  //     item?.descriptor?.themes === selectedCategory;
  //   const districtFilter =
  //     district === "all" || item?.descriptor?.district === district;
  //   const jobStateGroupFilter =
  //     jobStateGroup === "all" || item?.descriptor?.state == jobStateGroup;
  //   const tragetGroupFilter =
  //     jobDistrictGroup === "all" || item?.descriptor?.target == jobDistrictGroup;
  //   const educationGroupFilter =
  //     educationGroup === "all" || item?.descriptor?.branch == educationGroup;
  //   const jobRoleGroupFilter =
  //     jobRoleGroup === "all" || item?.descriptor?.language == jobRoleGroup;

  //   const actorFilter = actor === "all" || item?.descriptor?.actor === actor;

  //   return (
  //     categoryFilter &&
  //     districtFilter &&
  //     jobStateGroupFilter &&
  //     actorFilter &&
  //     tragetGroupFilter &&
  //     educationGroupFilter &&
  //     jobRoleGroupFilter &&
  //     (title.toLowerCase().includes(searchText.toLowerCase()) ||
  //       description.toLowerCase().includes(searchText.toLowerCase()))
  //   );
  // });

  // Slice the filteredStory array based on pagination
  console.log("story",story)
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStory = story?.slice(startIndex, endIndex);
  // const paginatedStory1 = filteredStory?.slice(startIndex, endIndex);

  const pageCount = Math.ceil(story?.length / itemsPerPage);
  const breakLabel = pageCount > 5 ? "..." : null;

  console.log("pageCount", pageCount);
  // Function to handle page change
  const handlePageClick = (selected) => {
    setCurrentPage(selected.selected);
  };

  // let filteredStory1 = JSON.parse(storedData);
  // // eslint-disable-next-line no-const-assign
  // filteredStory1 = paginatedStory1?.filter((item) => {
  //   const title = item?.descriptor.title || "";
  //   const description = item?.descriptor.description || "";

  //   return (
  //     title.toLowerCase().includes(searchText.toLowerCase()) ||
  //     description.toLowerCase().includes(searchText.toLowerCase())
  //   );
  // });
  const resetFilters = () => {
    setSelectedCategory("all");
    setdistrict("all");
    setjobStateGroup("all");
    setjobDistrictGroup("all");
    seteducationGroup("all");
    setActor("all");
    setjobRoleGroup("all");
  };
  const showMessage = () => {
    setMessageOpen(true);
    // Additional logic for showing the message
  };

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const hideMessage = () => {
    setMessageOpen(false);
    // Additional logic for hiding the message
  };
  useEffect(() => {
    // Check if any filter is selected
    const anyFilterSelected =
      jobStateGroup !== "all" ||
      district !== "all" ||
      selectedCategory !== "all" ||
      jobDistrictGroup !== "all" ||
      educationGroup !== "all" ||
      jobRoleGroup !== "all" ||
      sectorGroup !== "all" ||
      subSectorGroup !== "all";
    // Update button color based on the condition
    const button = document.getElementById("filterButton");
    if (button) {
      button.style.backgroundColor = anyFilterSelected ? "green" : "white";
    }
  }, [
    jobStateGroup,
    district,
    selectedCategory,
    jobDistrictGroup,
    educationGroup,
    jobRoleGroup,
    sectorGroup,
    subSectorGroup,
  ]);
  const activeStyles = {
    w: 7,
    bg: "blue.500",
    fontSize: "sm",
    _hover: {
      bg: "blue.300",
    },
  };

  return (
    <div
      style={{ background: "linear-gradient(to bottom, #FFFFFF, #EFDA2F )" }}
    >
      <div>
        <Header />
      </div>
      <div className="App">
        <div className="product-container" style={{ marginTop: "70px" }}>
          <div
            style={{
              position: "sticky",
              top: "70px",
              zIndex: 1,
              background: "#fff",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between", // Aligns items to left and right
              alignItems: "center",
              flexDirection: "row", // Ensures horizontal arrangement
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Button to open the message */}
              <label style={{ paddingRight: "20px" }}>
                {t("Filter_your_results")}
              </label>
            </div>

            <Button
              style={{ border: "solid 0.5px" }}
              id="filterButton"
              onClick={onOpen}
            >
              <img src={filterlogo} alt="Filter icon"></img>
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />

              <ModalContent>
                <ModalHeader>
                  <ModalCloseButton />
                </ModalHeader>
                <br />

                <ModalBody>
                  <Select
                    style={{ backgroundColor: "#F4F9F3", color: "gray" }}
                    className="filters"
                    value={sectorGroup}
                    onChange={(e) => setsectorGroup(e.target.value)}
                  >
                    <option value="all">{t("Sector")}</option>
                    {configuredData?.searchFilters.sector.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </Select>{" "}
                  <br />
                  <Select
                    style={{ backgroundColor: "#F4F9F3", color: "gray" }}
                    className="filters"
                    value={subSectorGroup}
                    onChange={(e) => setsubSectorGroup(e.target.value)}
                  >
                    <option value="all">{t("Sub_sector")}</option>
                    {configuredData?.searchFilters.subSector.map(
                      (subSector) => (
                        <option key={subSector} value={subSector}>
                          {subSector}
                        </option>
                      )
                    )}
                  </Select>{" "}
                  <br />
                  <Select
                    style={{ backgroundColor: "#F4F9F3", color: "gray" }}
                    className="filters"
                    value={jobRoleGroup}
                    onChange={(e) => setjobRoleGroup(e.target.value)}
                  >
                    <option value="all">{t("Job_role")}</option>
                    {configuredData?.searchFilters.jobRole.map((jobRole) => (
                      <option key={jobRole} value={jobRole}>
                        {jobRole}
                      </option>
                    ))}
                  </Select>{" "}  <br />
                  <Select
                    style={{ backgroundColor: "#F4F9F3", color: "gray" }}
                    className="filters"
                    value={jobStateGroup}
                    onChange={(e) => setjobStateGroup(e.target.value)}
                  >
                    <option value="all">{t("Job_state")}</option>
                    {configuredData?.searchFilters.jobState.map((jobState) => (
                      <option key={jobState} value={jobState}>
                        {jobState}
                      </option>
                    ))}
                  </Select>
                  <br />
                  {/* <Select
                    style={{ backgroundColor: "#F4F9F3", color: "gray" }}
                    className="filters"
                    value={district}
                    onChange={(e) => setdistrict(e.target.value)}
                  >
                    <option value="all">{t("district")}</option>
                    {configuredData?.searchFilters.district.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </Select>{" "}
                  <br /> */}
                  {/* <Select
                    style={{ backgroundColor: "#F4F9F3", color: "gray" }}
                    className="filters"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">{t("type")}</option>
                    {configuredData?.searchFilters.type.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>{" "}
                  <br /> */}
                  <Select
                    style={{ backgroundColor: "#F4F9F3", color: "gray" }}
                    className="filters"
                    value={jobDistrictGroup}
                    onChange={(e) => setjobDistrictGroup(e.target.value)}
                  >
                    <option value="all">{t("Job_destrict")}</option>
                    {configuredData?.searchFilters.jobDistrict.map((jobDistrict) => (
                      <option key={jobDistrict} value={jobDistrict}>
                        {jobDistrict}
                      </option>
                    ))}
                  </Select>{" "}
                  <br />
                  <Select
                    style={{ backgroundColor: "#F4F9F3", color: "gray" }}
                    className="filters"
                    value={educationGroup}
                    onChange={(e) => seteducationGroup(e.target.value)}
                  >
                    <option value="all">{t("Education")}</option>
                    {configuredData?.searchFilters.education.map((education) => (
                      <option key={education} value={education}>
                        {education}
                      </option>
                    ))}
                  </Select>{" "}
                  <br />
                  <Button onClick={handleSubmitenter}>Enter</Button>
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
          <div className={styles.grid_holder}>
          {paginatedStory?.length === 0 ? (
            <p>No data available for the selected filters.</p>
          ) : (
            paginatedStory?.map((product, index) => (
              <div  key={index}>
                <ProductCard product={product} />
              </div>
            ))
          )}

          </div>
          
          {/* Pagination */}
          <div>
            {console.log({ currentPage })}
            {pageCount > 1 && (
              <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                breakLabel={breakLabel}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                forcePage={currentPage}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
