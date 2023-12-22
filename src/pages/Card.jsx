import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import { MdArrowForward, MdLocationPin } from "react-icons/md";
import { FaRupeeSign, FaBriefcase } from 'react-icons/fa';

import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Button,
  Text,
  Image,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Grid,
  GridItem,
  SimpleGrid,
  HStack,
  Icon
} from "@chakra-ui/react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ImageLoader from "../components/Common/getImagesData";
import { useTranslation } from "react-i18next";
import { FaBookmark } from "react-icons/fa";
import swal from "sweetalert";

const ProductCard = ({ product }) => {
  const [imageurl, setimageurl] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const parts = product?.icon?.split("/");
  if (parts) {
    const filename = parts[parts.length - 1];
  }
  const [isBookmarked, setIsBookmarked] = useState(false);


  useEffect(() => {
    // Simulate a delay to show loading effect
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(delay);
  }, []);

  const StoreBookMarkstoLocalStorage = () => {
    let existingBookmarks =
      JSON.parse(localStorage.getItem("myBookMarks")) || [];
    if (Array.isArray(product?.descriptor)) {
      existingBookmarks.push(...product?.descriptor);
    } else {
      existingBookmarks.push(product?.descriptor);
    }
    localStorage.setItem("myBookMarks", JSON.stringify(existingBookmarks));

    swal("Success", "Well done, Added to MyBookMarks", "success");
  };

  const handleButtonClick = (e) => {
    StoreBookMarkstoLocalStorage();
  };
  return (
    <div >
      <>
        <Card
          onClick={() => {
            navigate("/jobDetails", {
              state: {
                product: product,
              },
            });
          }}
          display="flex"
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          borderWidth="1px"
          borderRadius="lg"
          borderColor="gray.200"
          _hover={{
            borderColor: "blue.400",
          }}
          cursor="pointer"
          boxShadow="7px 12px 0px rgba(0, 0, 0, 0.1)"
          style={{
            height: "300px",
            /* padding: 0px; */
            overflow: "hidden"
          }}
        >
          {/* <ImageLoader imageId={filename} alt="Image not available" p="10px" /> */}

          <Box p={4} spacing={4} align="flex-start" style={{
            padding: "3px 16px !important"
          }}>
            {/* <Text
              fontSize="16px"
              fontWeight="700"
              fontFamily="YourPreferredFont, sans-serif"
              color="black.500"
            >
             
              {product?.title
                ? product?.title
                  .toLowerCase()
                  .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())
                : "Title not available"}
            </Text>
            <Stack spacing={2}>
              <Text style={{ color: "black", fontSize: "14px" }}>
                <b fontWeight="700"> {t("Crop")}</b> {product?.crop}
              </Text>
            </Stack>
            <Stack spacing={2}>
              <Text style={{ color: "black", fontSize: "14px", paddingTop: "6px" }}>
                <b fontWeight="700" >{t("Publisher")} </b>
                {product?.publisher}
              </Text>
            </Stack>
            <Stack spacing={2}>
              <Text
                style={{
                  color: "black",
                  fontSize: "14px",
                  overflow: "hidden",
                  overflowY: "auto",
                  maxHeight: "80px",
                  scrollbarColor: "red",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  width: "100px"
                }}
              >
                <b>{t("Description")} </b>
                {product?.description}
              </Text>
            </Stack> */}
            {/* Add other fields as needed */}

            {/* "Thank you for asking! The UI is coming along well. We've made significant progress, and I'm excited about how it's shaping up. If you have any specific feedback or suggestions, feel free to share!" */}

            <Text marginTop={'2'} fontSize={18}>{product?.title} </Text>

            {product?.company ? (
              <Text marginTop={'2'} fontSize={14} fontWeight={700}>{product?.company}</Text>
            ) : (
              <Text marginTop={'2'} fontSize={14} fontWeight={700}>Company name not available</Text>
            )}

            {(product?.city || product?.state) ? (
              <HStack marginTop={'2'}>
                <Icon as={MdLocationPin} boxSize={4} marginBottom={1} /> <Text fontSize="14px"> {product?.city}</Text>
                {(product?.city && product?.state) ? (<Text fontSize="14px"> , {product?.state}</Text>) : (<Text fontSize="14px"> {product?.state}</Text>)}
              </HStack>
            ) : ('')}


            <HStack marginTop={'2'}>
              <Icon as={FaBriefcase} boxSize={4} marginBottom={1} />
              {(product?.work_mode) ? (<Text fontSize="14px">{product?.work_mode} </Text>)
                : (<Text fontSize="14px">Full Time</Text>)}
              <Text fontSize="14px"> | Immediate Joiner</Text>
            </HStack>

            <HStack marginTop={'2'}>
              <Icon as={FaRupeeSign} boxSize={4} marginBottom={1} />
              {product?.salary ? (
                <Text fontSize="14px">{product?.salary}</Text>
              ) : (
                <Text fontSize="14px">As per Industry Standard</Text>
              )}
            </HStack>

            <Button marginTop={'2'} rightIcon={<MdArrowForward />} colorScheme='blue' variant='outline'>
              {t("view_deatils")}
            </Button>
          </Box>
        </Card>
      </>
    </div>
  );
};

export default ProductCard;
