import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useNavigation,
} from "react-router-dom";
// Supports weights 200-900
import "@fontsource-variable/nunito";
import AllDeals from "./page/AllDeals";
import {
  Box,
  ChakraProvider,
  DarkMode,
  Divider,
  extendTheme,
  Text,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PendingProposals from "./page/PendingMovies";
import PastProposals from "./page/PastProposals";
import CreateProposal from "./page/CreateProposal";
import NewMovieProposal from "./page/NewMovieProposal";
import StorageDealProposal from "./page/StorageDealProposal";
import Customer from "./page/Customer";
import LandingPage from "./page/customer/LandingPage";
import ProposalId from "./page/CurrentProposals/id";
import MovieId from "./page/Movies/MovieId";
import PendingMovies from "./page/PendingMovies";
// import Custoe
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/all-deals",
    element: <AllDeals />,
  },
  {
    path: "/current-proposals",
    element: <PendingMovies />,
  },
  {
    path: "/current-proposals/:id",
    element: <ProposalId />,
  },
  {
    path: "/past-proposals",
    element: <PastProposals />,
  },
  {
    path: "/new-movie-proposal",
    element: <NewMovieProposal />,
  },
  {
    path: "/all-movies",
    element: <PendingMovies />,
  },
  {
    path: "/all-movies/:id",
    element: <ProposalId />,
  },
  {
    path: "/watch",
    element: <Customer />,
    children: [{ path: "/watch/movie", element: <LandingPage /> }],
  },
]);

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({
  ...config,
  fonts: {
    heading: `'Nunito Variable', sans-serif`,
    body: `'Nunito Variable', sans-serif`,
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
