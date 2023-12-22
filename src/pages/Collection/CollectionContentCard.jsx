import React, { useState, useEffect } from "react";
import styles from "../Card.module.css";
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ImageLoader from "../../components/Common/getImagesData";
import moment from "moment";

const CollectionProductCard = ({ product }) => {
  let collectionContent = product?.contentFlncontentRelation;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate a delay to show loading effect
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      ) : (
        <Card
          onClick={() => {
            navigate("/collectionstoryDetails", {
              state: {
                product: collectionContent,
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
            transform: "scale(1.02)",
          }}
          cursor="pointer"
        >
          <ImageLoader
            imageId={collectionContent?.image}
            alt="Image not available"
            maxW={{ base: "100%", sm: "230px" }}
            objectFit="cover"
            p="10px"
          />
          <Stack p={4} spacing={4} align="flex-start">
            <Text
              fontSize="xl"
              fontWeight="bold"
              fontFamily="YourPreferredFont, sans-serif"
              color="black.500"
            >
              {collectionContent?.title
                ? collectionContent.title
                    .toLowerCase()
                    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())
                : "Title not available"}
            </Text>
            <Stack spacing={0}>
              <Text style={{ color: "black", fontSize: "16px" }}>
                Recommended Age: {collectionContent?.minAge || "N/A"}
              </Text>
            </Stack>
            <Stack spacing={2}>
              <Text style={{ color: "black", fontSize: "16px" }}>
                Language: {collectionContent?.language}
              </Text>
            </Stack>
            <Stack spacing={2}>
              <Text style={{ color: "black", fontSize: "16px" }}>
                Type: {collectionContent?.themes || "N/A"}
              </Text>
            </Stack>
            <Stack spacing={2}>
              <Text style={{ color: "black", fontSize: "16px" }}>
                Published By: {collectionContent?.publisher || "N/A"}
              </Text>
            </Stack>
            <Text style={{ color: "black", fontSize: "16px" }}>
              Created Date:{" "}
              {moment(collectionContent?.createdAt).format("DD-MM-YYYY") ||
                "N/A"}
            </Text>
            <Stack spacing={2}>
              <Text style={{ color: "black", fontSize: "16px" }}>
                Description: {collectionContent?.description || "N/A"}
              </Text>
            </Stack>
            {/* Add other fields as needed */}
          </Stack>
        </Card>
      )}
    </div>
  );
};

export default CollectionProductCard;
