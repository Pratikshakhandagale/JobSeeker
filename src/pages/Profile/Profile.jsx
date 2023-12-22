import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import {
  Button,
  Input,
  Textarea,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Center,
  Box,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import styles from "./Profile.module.css";
import { useForm } from "react-hook-form";
import {
  addConfiguration,
  getConfiguration,
  uploadImage,
} from "../../api/Apicall";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import ConfigurationsSchema from "../../schema/configSchema";
import Loading from "../../components/Loading";

function Profile() {
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [configData, setConfigData] = useState({});
  const { t } = useTranslation();
  const [formData1, setFormData1] = useState({});
  const [formData2, setFormData2] = useState({});
  const [formData3, setFormData3] = useState({});
  const [imageUploadData, setimageUploadData] = useState({});
  const [selectedata, setselectedata] = useState("/dsep/search");
  const [ordereddata, setOrdereddata] = useState("createdAt");
  const [filterdata, setFilterdata] = useState("default");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCongif = async () => {
      let response = await getConfiguration();
      setConfigData(response);
      setIsLoading(false);
    };
    getCongif();
  }, []);

  const handleTabChange = (index) => {
    setSelectedOption(index);
  };
  const handleNext = () => {
    if (selectedOption < 2) {
      setSelectedOption(selectedOption + 1);
    }
  };
  const handleTabReset = () => {
    setSelectedOption(0);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(ConfigurationsSchema) });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = useForm();

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    formState: { errors: errors3 },
    reset: reset3,
  } = useForm();

  const initialDisplayOrder = {
    title: 1,
    author: 2,
    description: 3,
    publisher: 4,
  };

  const [displayOrder, setDisplayOrder] = useState({});
  useEffect(() => {
    setDisplayOrder(initialDisplayOrder);
  }, []);
  const initialfilterDisplayOrder = {
    minAge: "all",
    language: "all",
    contentType: "all",
  };

  const [filters, setFilters] = useState({});
  useEffect(() => {
    setFilters(initialfilterDisplayOrder);
  }, []);
  const handleReset = () => {
    // Reset the form and displayOrder to initial values
    reset3(initialDisplayOrder);
    setDisplayOrder(initialDisplayOrder);
    setFilters(initialfilterDisplayOrder);
  };

  const onSubmit = async (data) => {
    setFormData1(data);
  };
  const onSubmit2 = async (data) => {
    setFormData2(data);
  };
  const onSubmit3 = async (data) => {
    setFormData3(data);
    try {
      const formData = new FormData();

      if (selectedFile) {
        formData.append("file", selectedFile);
        const imageUploadResponse = await uploadImage(formData);
        setimageUploadData(imageUploadResponse);
        data.logo = imageUploadResponse?.key;
      } else {
        data.logo = configData?.logo;
      }
      const combinedFormData = {
        ...formData1,
        ...formData2,
        ...data,
        logo: data.logo || configData?.logo,
      };
      let response = await addConfiguration(combinedFormData);
      if (response?.data?.update_Seeker) {
        reset();
        reset2();
        reset3();
        alert("Created successfully");
        setIsLoading(true);
        let response = await getConfiguration();
        setConfigData(response);
        setIsLoading(false);
        handleTabReset();
      } else {
        alert(response?.errors[0]?.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="App">
        <div className="product-container" style={{ marginTop: "70px" }}>
          {isLoading ? (
            <Loading />
          ) : (
            <Tabs
              isFitted
              variant="solid-rounded"
              colorScheme="messenger"
              size="md"
              index={selectedOption}
              onChange={handleTabChange}
            >
              <TabList>
                <Tab>{t("Headers")}</Tab>
                <Tab>{t("Other")}</Tab>
                <Tab>{t("List_Order")}</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box>
                    <div>
                      <label className={styles.labelText}>
                        Client Admin Logged in
                      </label>
                      <br />
                      <br />
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        autoComplete="off"
                      >
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <label className={styles.labelText}>
                                  Site Name:
                                </label>
                              </td>
                              <td className={styles.contentDisplay}>
                                <div>
                                  <Input
                                    type="text"
                                    id="siteName"
                                    name="siteName"
                                    placeholder="Site Name"
                                    {...register("siteName", {
                                      required: true,
                                    })}
                                    defaultValue={configData?.siteName}
                                  />
                                  <p style={{ color: "red" }}>
                                    {errors.siteName && (
                                      <p>{errors.siteName.message}</p>
                                    )}
                                  </p>
                                </div>
                              </td>
                            </tr>
                            <br />

                            <tr>
                              <td>
                                <label className={styles.labelText}>
                                  Site by-line:
                                </label>
                              </td>
                              <td className={styles.contentDisplay}>
                                <div>
                                  <Input
                                    type="text"
                                    id="siteByLine"
                                    name="siteByLine"
                                    placeholder="Site by-line"
                                    {...register("siteByLine")}
                                    defaultValue={configData?.siteByLine}
                                  />
                                  <p style={{ color: "red" }}>
                                    {errors.siteByLine && (
                                      <p>{errors.siteByLine.message}</p>
                                    )}
                                  </p>
                                </div>
                              </td>
                            </tr>
                            <br />
                            <tr>
                              <td>
                                <label className={styles.labelText}>
                                  Logo:
                                </label>
                              </td>
                              <td className={styles.contentDisplay}>
                                <div>
                                  {configData?.logo ? (
                                    <div>
                                      <p>
                                        Previously uploaded file:{" "}
                                        {configData?.logo}
                                      </p>
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="file"
                                        id="file"
                                        defaultValue={configData?.logo}
                                        hidden
                                        style={{ border: "1px solid black" }}
                                      />
                                      <Input
                                        type="file"
                                        id="logo"
                                        name="logo"
                                        placeholder="Logo"
                                        onChange={(e) => {
                                          setSelectedFile(e.target.files[0]);
                                        }}
                                      />
                                      <p style={{ color: "red" }}>
                                        {errors.logo && (
                                          <p>{errors.logo.message}</p>
                                        )}
                                      </p>
                                    </div>
                                  ) : (
                                    <div>
                                      <Input
                                        type="file"
                                        id="logo"
                                        name="logo"
                                        placeholder="Logo"
                                        onChange={(e) => {
                                          setSelectedFile(e.target.files[0]);
                                        }}
                                      />
                                      <p style={{ color: "red" }}>
                                        {errors.logo && (
                                          <p>{errors.logo.message}</p>
                                        )}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                            <br />

                            <tr>
                              <td>
                                <label className={styles.labelText}>
                                  Get Content From:
                                </label>
                              </td>
                              <td className={styles.contentDisplay}>
                                <div>
                                  <select
                                    className="filters"
                                    // value={selectedata}
                                    onChange={(e) =>
                                      setselectedata(e.target.value)
                                    }
                                    {...register("apiEndPoint", {
                                      required: true,
                                    })}
                                  >
                                    <option value={configData?.apiEndPoint}>
                                      {configData?.apiEndPoint}
                                    </option>
                                    <option value="/dsep/search">
                                      {"Tekdi Network"}
                                    </option>
                                    <option value="/search">
                                      {"Onest network"}
                                    </option>
                                  </select>
                                  {/* <Textarea
                                  type="text"
                                  id="apiEndPoint"
                                  name="apiEndPoint"
                                  placeholder="Get Content From"
                                  {...register("apiEndPoint", {
                                    required: true,
                                  })}
                                /> */}
                                  <p style={{ color: "red" }}>
                                    {errors.apiEndPoint && (
                                      <p>{errors.apiEndPoint.message}</p>
                                    )}
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="container">
                          <div style={{ marginTop: "25px" }}>
                            <Button
                              style={{
                                background: "#0F75BC",
                                color: "white",
                              }}
                              onClick={() => {
                                reset();
                              }}
                            >
                              Reset
                            </Button>
                          </div>
                          <div style={{ marginTop: "25px" }}>
                            <Button
                              style={{ background: "#0F75BC", color: "white" }}
                              type="submit"
                              onClick={() => {
                                handleNext();
                              }}
                            >
                              Save & Next
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box>
                    <div>
                      <label className={styles.labelText}>
                        Client Admin Logged in
                      </label>
                      <br />
                      <br />
                      <form
                        onSubmit={handleSubmit2(onSubmit2)}
                        autoComplete="off"
                      >
                        <div className={styles.tabledata}>
                          <div>
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <label className={styles.labelText}>
                                      BookMarks:
                                    </label>
                                  </td>
                                  <td className={styles.contentDisplay}>
                                    <div>
                                      <Input
                                        type="text"
                                        id="bookmark"
                                        name="bookmark"
                                        placeholder="Bookmark"
                                        {...register2("bookmark", {
                                          required: true,
                                        })}
                                        defaultValue={
                                          configData?.bookmark
                                            ? configData?.bookmark
                                            : "BookMark"
                                        }
                                      />
                                      <p style={{ color: "red" }}>
                                        {errors2.bookmark && (
                                          <p>{errors2.bookmark.message}</p>
                                        )}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <br />

                                <tr>
                                  <td>
                                    <label className={styles.labelText}>
                                      Rating:
                                    </label>
                                  </td>
                                  <td className={styles.contentDisplay}>
                                    <div>
                                      <Input
                                        type="text"
                                        id="rating"
                                        name="rating"
                                        placeholder="Rating"
                                        {...register2("rating")}
                                        defaultValue={
                                          configData?.rating
                                            ? configData?.rating
                                            : "Rating"
                                        }
                                      />
                                      <p style={{ color: "red" }}>
                                        {errors2.rating && (
                                          <p>{errors2.rating.message}</p>
                                        )}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <br />

                                <tr>
                                  <td>
                                    <label className={styles.labelText}>
                                      Share:
                                    </label>
                                  </td>
                                  <td className={styles.contentDisplay}>
                                    <div>
                                      <Input
                                        type="text"
                                        id="share"
                                        name="share"
                                        placeholder="Share"
                                        {...register2("share")}
                                        defaultValue={
                                          configData?.share
                                            ? configData?.share
                                            : "Share"
                                        }
                                      />
                                      <p style={{ color: "red" }}>
                                        {errors2.share && (
                                          <p>{errors2.share.message}</p>
                                        )}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <br />
                                <tr>
                                  <td>
                                    <label className={styles.labelText}>
                                      Pagination:
                                    </label>
                                  </td>
                                  <td className={styles.contentDisplay}>
                                    <div>
                                      <Input
                                        type="number"
                                        id="pagination"
                                        name="pagination"
                                        placeholder="pagination"
                                        {...register2("pagination", {
                                          required: true,
                                        })}
                                        defaultValue={
                                          configData?.pagination
                                            ? configData?.pagination
                                            : "10"
                                        }
                                      />
                                      <p style={{ color: "red" }}>
                                        {errors2.pagination && (
                                          <p>{errors2.pagination.message}</p>
                                        )}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <br />
                              </tbody>
                            </table>
                          </div>
                          <div>
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <label className={styles.labelText}>
                                      Order the list by:
                                    </label>
                                  </td>
                                  <td className={styles.contentDisplay}>
                                    <div>
                                      <select
                                        className="filters"
                                        // value={ordereddata}
                                        onChange={(e) =>
                                          setOrdereddata(e.target.value)
                                        }
                                        {...register2("orderBy")}
                                      >
                                        <option value={configData?.createdAt}>
                                          {configData?.createdAt}
                                        </option>
                                        <option value="createdAt">
                                          {"Created by Date"}
                                        </option>
                                        <option value="rating">
                                          {"Rating"}
                                        </option>
                                        <option value="updatedAt">
                                          {"ModifiedDate"}
                                        </option>
                                      </select>
                                    </div>
                                  </td>
                                </tr>
                                <br />
                                <tr>
                                  <td>
                                    <label className={styles.labelText}>
                                      Display the list by:
                                    </label>
                                  </td>
                                  <td className={styles.contentDisplay}>
                                    <div>
                                      <select
                                        className="filters"
                                        // value={filterdata}
                                        onChange={(e) =>
                                          setFilterdata(e.target.value)
                                        }
                                        {...register2("filterBy")}
                                      >
                                        <option value={configData?.filterBy}>
                                          {configData?.filterBy}
                                        </option>
                                        <option value="default">
                                          {"Default Filter"}
                                        </option>
                                        <option value="user">
                                          {"User Filter"}
                                        </option>
                                      </select>
                                    </div>
                                  </td>
                                </tr>
                                <br />

                                <tr>
                                  <td>
                                    <label className={styles.labelText}>
                                      Footer Text:
                                    </label>
                                  </td>
                                  <td className={styles.contentDisplay}>
                                    <div>
                                      <Input
                                        type="text"
                                        id="footerText"
                                        name="footerText"
                                        placeholder="Footer Text"
                                        {...register2("footerText")}
                                        defaultValue={
                                          configData?.footerText
                                            ? configData?.footerText
                                            : `${t("footerText")} ❤️ ${t(
                                                "footerText1"
                                              )} {"|"} ${t("onestText")}`
                                        }
                                      />
                                      <p style={{ color: "red" }}>
                                        {errors2.footerText && (
                                          <p>{errors2.footerText.message}</p>
                                        )}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <br />

                                <br />

                                <tr>
                                  <td>
                                    <label className={styles.labelText}>
                                      Header Color:
                                    </label>
                                  </td>
                                  <td className={styles.contentDisplay}>
                                    <div>
                                      <Input
                                        type="text"
                                        id="headerColor"
                                        name="headerColor"
                                        placeholder="Header Color"
                                        {...register2("headerColor")}
                                        defaultValue={
                                          configData?.headerColor
                                            ? configData?.headerColor
                                            : "white"
                                        }
                                      />
                                      <p style={{ color: "red" }}>
                                        {errors2.headerColor && (
                                          <p>{errors2.headerColor.message}</p>
                                        )}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <br />

                                <br />

                                <tr>
                                  <td>
                                    <label className={styles.labelText}>
                                      Header Font Size:
                                    </label>
                                  </td>
                                  <td className={styles.contentDisplay}>
                                    <div>
                                      <Input
                                        type="number"
                                        id="headerFontSize"
                                        name="headerFontSize"
                                        placeholder="Header Font Size"
                                        {...register2("headerFontSize")}
                                        defaultValue={
                                          configData?.headerFontSize
                                            ? configData?.headerFontSize
                                            : "16"
                                        }
                                      />
                                      <p style={{ color: "red" }}>
                                        {errors2.headerFontSize && (
                                          <p>
                                            {errors2.headerFontSize.message}
                                          </p>
                                        )}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <br />

                                <tr>
                                  {/* <td>
                                  <label className={styles.labelText}>
                                    Position By Line:
                                  </label>
                                </td> */}
                                  <td className={styles.contentDisplay}>
                                    <Stack direction="row">
                                      <input
                                        type="text"
                                        id="yes"
                                        name="positionByLine"
                                        // value="true"
                                        {...register2("positionByLine")}
                                        hidden
                                        defaultValue={false}
                                      />
                                      {/* <label for="yes">Yes</label> */}
                                      <br />

                                      {/* <input
                                      type="radio"
                                      id="no"
                                      name="positionByLine"
                                      value="false"
                                      {...register2("positionByLine")}
                                      hidden
                                      defaultValue={false}
                                    />
                                    <label for="no">No</label>
                                    <br /> */}
                                    </Stack>
                                  </td>
                                </tr>

                                <tr>
                                  {/* <td>
                                  <label className={styles.labelText}>
                                    Position By Logo:
                                  </label>
                                </td> */}
                                  <td className={styles.contentDisplay}>
                                    <Stack direction="row">
                                      <input
                                        type="text"
                                        id="yes"
                                        name="positionLogo"
                                        // value="true"
                                        {...register2("positionLogo")}
                                        hidden
                                        defaultValue={false}
                                      />
                                      {/* <label for="yes">Yes</label> */}
                                      <br />

                                      {/* <input
                                      type="radio"
                                      id="no"
                                      name="positionLogo"
                                      value="false"
                                      {...register2("positionLogo")}
                                      hidden
                                      defaultValue={false}
                                    />
                                    <label for="no">No</label>
                                    <br /> */}
                                    </Stack>
                                  </td>
                                </tr>

                                <tr>
                                  {/* <td>
                                  <label className={styles.labelText}>
                                    Position Site Name:
                                  </label>
                                </td> */}
                                  <td className={styles.contentDisplay}>
                                    <Stack direction="row">
                                      <input
                                        type="text"
                                        id="yes"
                                        name="positionSiteName"
                                        // value="true"
                                        {...register2("positionSiteName")}
                                        hidden
                                        defaultValue={false}
                                      />
                                      {/* <label for="yes">Yes</label> */}
                                      <br />
                                      {/* 
                                    <input
                                      type="radio"
                                      id="no"
                                      name="positionSiteName"
                                      value="false"
                                      {...register2("positionSiteName")}
                                      hidden
                                      defaultValue={false}
                                    />
                                    <label for="no">No</label> */}
                                      <br />
                                    </Stack>
                                  </td>
                                </tr>
                                <br />
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="container">
                          <div style={{ marginTop: "25px" }}>
                            <Button
                              style={{
                                background: "#0F75BC",
                                color: "white",
                              }}
                              onClick={() => {
                                reset2();
                              }}
                            >
                              Reset
                            </Button>
                          </div>
                          <div style={{ marginTop: "25px" }}>
                            <Button
                              style={{ background: "#0F75BC", color: "white" }}
                              type="submit"
                              onClick={() => {
                                handleNext();
                              }}
                            >
                              Save & Next
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box>
                    <div>
                      <label className={styles.labelText}>
                        Client Admin Logged in
                      </label>
                      <br />
                      <br />

                      <form
                        onSubmit={handleSubmit3(onSubmit3)}
                        autoComplete="off"
                      >
                        <div className={styles.tabledata}>
                          <div>
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <label className={styles.labelText}>
                                      Title:
                                    </label>
                                  </td>
                                  <td className={styles.contentDisplay}>
                                    <div>
                                      <Input
                                        type="text"
                                        id="lableTitle"
                                        name="lableTitle"
                                        placeholder="Lable Title"
                                        {...register3("lableTitle", {
                                          required: true,
                                        })}
                                        defaultValue={
                                          configData?.lableTitle
                                            ? configData?.lableTitle
                                            : "Title"
                                        }
                                      />
                                      <p style={{ color: "red" }}>
                                        {errors3.lableTitle && (
                                          <p>{errors3.lableTitle.message}</p>
                                        )}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <br />

                                <tr>
                                  <td>
                                    <label className={styles.labelText}>
                                      Author:
                                    </label>
                                  </td>
                                  <td className={styles.contentDisplay}>
                                    <div>
                                      <Input
                                        type="text"
                                        id="lableAuthor"
                                        name="lableAuthor"
                                        placeholder="Lable Author"
                                        {...register3("lableAuthor", {
                                          required: true,
                                        })}
                                        defaultValue={
                                          configData?.lableAuthor
                                            ? configData?.lableAuthor
                                            : "Author"
                                        }
                                      />
                                      <p style={{ color: "red" }}>
                                        {errors3.lableAuthor && (
                                          <p>{errors3.lableAuthor.message}</p>
                                        )}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <br />

                                <tr>
                                  <td>
                                    <label className={styles.labelText}>
                                      Description:
                                    </label>
                                  </td>
                                  <td className={styles.contentDisplay}>
                                    <div>
                                      <Input
                                        type="text"
                                        id="lableDesc"
                                        name="lableDesc"
                                        placeholder="Lable Desc"
                                        {...register3("lableDesc", {
                                          required: true,
                                        })}
                                        defaultValue={
                                          configData?.lableDesc
                                            ? configData?.lableDesc
                                            : "Description"
                                        }
                                      />
                                      <p style={{ color: "red" }}>
                                        {errors3.lableDesc && (
                                          <p>{errors3.lableDesc.message}</p>
                                        )}
                                      </p>
                                    </div>
                                  </td>
                                </tr>

                                <br />

                                {/* <tr>
                                <td>
                                  <label className={styles.labelText}>
                                    Publisher:
                                  </label>
                                </td>
                                <td className={styles.contentDisplay}>
                                  <div>
                                    <Input
                                      type="text"
                                      id="publisher"
                                      name="publisher"
                                      placeholder="Publisher"
                                      {...register3("publisher")}
                                    />
                                  </div>
                                </td>
                              </tr>
                              <br /> */}
                                <tr>
                                  <td>
                                    <label className={styles.labelText}>
                                      Rating:
                                    </label>
                                  </td>
                                  <td className={styles.contentDisplay}>
                                    <div>
                                      <Input
                                        type="text"
                                        id="lableRating"
                                        name="lableRating"
                                        placeholder="Lable Rating"
                                        {...register3("lableRating", {
                                          required: true,
                                        })}
                                        defaultValue={
                                          configData?.lableRating
                                            ? configData?.lableRating
                                            : "Rating"
                                        }
                                      />
                                      <p style={{ color: "red" }}>
                                        {errors3.lableRating && (
                                          <p>{errors3.lableRating.message}</p>
                                        )}
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <br />
                              </tbody>
                            </table>
                          </div>
                          <div>
                            <table>
                              <tbody>
                                <tr>
                                  <label className={styles.labelText}>
                                    Order of the Fields:
                                  </label>
                                  <div>
                                    {Object.keys(displayOrder).map((field) => (
                                      <div
                                        key={field}
                                        className={styles.contentDisplay}
                                      >
                                        <td>
                                          <label className={styles.labelText}>
                                            {field}:
                                          </label>
                                        </td>
                                        <td>
                                          <Input
                                            type="number"
                                            name={`displayOrder.${field}`}
                                            defaultValue={
                                              configData?.displayOrder &&
                                              configData?.displayOrder[
                                                field
                                              ] !== null
                                                ? configData?.displayOrder[
                                                    field
                                                  ]
                                                : displayOrder[field]
                                            }
                                            {...register3(
                                              `displayOrder.${field}`
                                            )}
                                          />
                                        </td>
                                      </div>
                                    ))}
                                  </div>
                                </tr>
                                <br />
                                <br />
                                <br />
                                <tr>
                                  <label className={styles.labelText}>
                                    Filter :
                                  </label>
                                  <div>
                                    {Object.keys(filters).map((field) => (
                                      <div
                                        key={field}
                                        className={styles.contentDisplay}
                                      >
                                        <td>
                                          <label className={styles.labelText}>
                                            {field}:
                                          </label>
                                        </td>
                                        <td>
                                          <Input
                                            type="text"
                                            name={`filters.${field}`}
                                            defaultValue={
                                              configData?.filters &&
                                              configData?.filters[field] !==
                                                null
                                                ? configData?.filters[field]
                                                : filters[field]
                                            }
                                            {...register3(`filters.${field}`)}
                                          />
                                        </td>
                                      </div>
                                    ))}
                                  </div>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="container">
                          <div style={{ marginTop: "25px" }}>
                            <Button
                              style={{
                                background: "#0F75BC",
                                color: "white",
                              }}
                              onClick={() => {
                                reset3();
                              }}
                            >
                              Reset
                            </Button>
                          </div>
                          <div style={{ marginTop: "25px" }}>
                            <Button
                              style={{ background: "#0F75BC", color: "white" }}
                              type="submit"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
