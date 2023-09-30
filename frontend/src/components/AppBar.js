import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const links = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Currrent Proposals",
    link: "/current-proposals",
  },

  {
    title: "Past Proposals",
    link: "/past-proposals",
  },
];
export default function AppBar() {
  const [network, setNetwork] = useState("");

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    const provider = new ethers.BrowserProvider(ethereum);
    const network = await provider.getNetwork();
    setNetwork(network.chainId);
    console.log(network.chainId);

    ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an account:", account);
      } else {
        console.log("No account found");
      }
    });
  };

  const connectWalletHandler = () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        console.log("Connected", accounts[0]);
      })
      .catch((err) => console.log(err));
  };

  const connectWalletButton = () => {
    return (
      <div style={{ display: "flex" }}>
        {" "}
        <div class="child-1-cw">
          <Button onClick={connectWalletHandler}>Connect Wallet</Button>
          {window && <div style={{ color: "green" }}> Connected </div>}
          {network && (
            <div style={{ color: "green" }}> Network: Calibration </div>
          )}
        </div>
      </div>
    );
  };
  useEffect(() => {
    checkWalletIsConnected();
  }, []);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  // current-proposals
  const index = links.findIndex((obj) => obj.link === path);
  return (
    <>
      <Flex justifyContent={"space-between"} p="30px 10px">
        <Text fontSize={"6xl"} fontWeight={"600"}>
          DAO Flix
        </Text>
        <Box pr={"30px"}>{connectWalletButton()}</Box>
      </Flex>
      <Tabs
        defaultIndex={index}
        onChange={(index) => {
          navigate(links[index].link, { replace: true });
        }}
      >
        <TabList>
          {links.map((link) => {
            return <Tab key={link.link}>{link.title}</Tab>;
          })}
        </TabList>

        {/* <TabPanels>
          <TabPanel></TabPanel>
          <TabPanel>
           
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels> */}
      </Tabs>
    </>
  );
}
