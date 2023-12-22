import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ImageLoader from "../../../components/Common/getImagesData";
import { useTranslation } from "react-i18next";

const BookMarksCards = ({ product }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const parts = product?.images[0].url.split("/");
  const filename = parts[parts.length - 1];
  useEffect(() => {
    // Simulate a delay to show loading effect
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div style={{ width: "85vw" }}>
      {isLoading ? (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      ) : (
        <Card
          onClick={() => {
            navigate("/bookMarksDetails", {
              state: {
                product: product,
              },
            });
          }}
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
          <Grid templateColumns="1fr 1fr" gap={4}>
            <Box>
              <ImageLoader
                imageId={filename}
                alt="Image not available"
                maxW={{ base: "100%", sm: "230px" }}
                objectFit="cover"
                p="10px"
              />
            </Box>
            <Box>
              <Stack p={4} spacing={4} align="flex-start">
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  fontFamily="YourPreferredFont, sans-serif"
                  color="black.500"
                >
                  {t("Title")}:
                  {product?.title
                    ? product.title
                        .toLowerCase()
                        .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) =>
                          c.toUpperCase()
                        )
                    : "Title not available" || "N/A"}
                </Text>

                <Stack spacing={2}>
                  <Text style={{ color: "black", fontSize: "16px" }}>
                    <b>{t("Language")}: </b> {product?.language || "N/A"}
                  </Text>
                </Stack>
                <Stack spacing={2}>
                  <Text style={{ color: "black", fontSize: "16px" }}>
                    <b>{t("Domain")}: </b>
                    {product?.domain || "N/A"}
                  </Text>
                </Stack>

                <Stack spacing={2}>
                  <Text style={{ color: "black", fontSize: "16px" }}>
                    <b>{t("Created_date")}: </b>
                    {moment(product?.createdAt).format("DD-MM-YYYY") || "N/A"}
                  </Text>
                </Stack>
                <Stack spacing={2}>
                  <Text style={{ color: "black", fontSize: "16px" }}>
                    <b>{t("Description")}:</b> {product?.long_desc || "N/A"}
                  </Text>
                </Stack>
                {/* Add other fields as needed */}
              </Stack>
            </Box>
          </Grid>
        </Card>
      )}
    </div>
  );
};

export default BookMarksCards;
