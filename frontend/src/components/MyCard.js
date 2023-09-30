import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function MyCard({ children, icon, title, link }) {
  return (
    <Link to={link}>
      <Box
        shadow={"md"}
        padding={"20px 50px 20px 20px"}
        borderRadius={"5px"}
        cursor={"pointer"}
        bg={"gray.700"}
      >
        {icon}
        <Text fontSize={"30px"}>{title}</Text>
      </Box>
    </Link>
  );
}

export default MyCard;
