import React, { useEffect } from "react";
import "./App.css";
import AppBar from "./components/AppBar";
import { Box, Card, Text } from "@chakra-ui/react";
import MyCard from "./components/MyCard";
import { FcCameraAddon, FcAddImage, FcFilmReel } from "react-icons/fc";
// import { AppBar } from "./index";
function App() {
  return (
    <>
      <AppBar />
      <Box gap={"35px"} display={"flex"} padding={"20px"}>
        <MyCard
          link={"/new-movie-proposal"}
          icon={<FcCameraAddon size={"35px"} />}
          title="New Movie"
        />
        <MyCard
          link={"/all-movies"}
          icon={<FcFilmReel size={"35px"} />}
          title="All Movies"
        />
      </Box>
    </>
  );
}

export default App;
