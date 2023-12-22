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
import moment from "moment";
import ImageLoader from "../../components/Common/getImagesData";

const CollectionCards = ({ product }) => {
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
            navigate("/collectionDetails", {
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
            transform: "scale(1.02)",
          }}
          cursor="pointer"
          boxShadow="md"
        >
          <ImageLoader
            imageId={product?.icon}
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
              {product?.title
                ? product.title
                    .toLowerCase()
                    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase())
                : "Title not available" || "N/A"}
            </Text>

            <Stack spacing={2}>
              <Text style={{ color: "black", fontSize: "16px" }}>
                Language: {product?.language || "N/A"}
              </Text>
            </Stack>
            <Stack spacing={2}>
              <Text style={{ color: "black", fontSize: "16px" }}>
                Domain: {product?.domain || "N/A"}
              </Text>
            </Stack>

            <Stack spacing={2}>
              <Text style={{ color: "black", fontSize: "16px" }}>
                Created Date:{" "}
                {moment(product?.createdAt).format("DD-MM-YYYY") || "N/A"}
              </Text>
            </Stack>
            <Stack spacing={2}>
              <Text style={{ color: "black", fontSize: "16px" }}>
                Description: {product?.description || "N/A"}
              </Text>
            </Stack>
            {/* Add other fields as needed */}
          </Stack>
        </Card>
      )}
    </div>
  );
};

export default CollectionCards;
