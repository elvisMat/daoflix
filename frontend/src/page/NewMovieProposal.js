import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { Box, Button, Divider, Input, Spinner, Text } from "@chakra-ui/react";
// import { ethers } from "ethers";
import {
  daoDealClientAddress,
  detectLinks,
  governorContractAddress,
  movieDaoAddress,
  pb,
} from "../helpers";
import governorContractABI from "../contractABIs/governorABI.json";
import movieDaoABI from "../contractABIs/movieDaoABI.json";
import daoDealClientABI from "../contractABIs/movieDaoABI.json";
import { ethers, BaseWallet } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import axios from "axios";
import { useGetProposals, useGetTokenBalance } from "../hooks/custom";
let governor;
let movieDao;
let client;
function NewMovieProposal() {
  const [txSubmitted, setTxSubmitted] = useState("");
  const [errorMessageSubmit, setErrorMessageSubmit] = useState("");

  const [proposingDeal, setProposingDeal] = useState(false);
  const [input, setInput] = useState({
    name: "",
    file: "",
  });

  const handleInput = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files;

    // console.log(selectedFile);
    if (selectedFile[0]) {
      console.log("Selected file name:", selectedFile[0].name);
      setInput((prev) => {
        return { ...input, file: selectedFile };
      });
      // You can access other properties of the file as needed
    }
  };
  //prepare api key request from lighthouse
  const signAuthMessage = async (signer, messageRequested) => {
    const signedMessage = await signer.signMessage(messageRequested);
    return signedMessage;
  };
  //get api key from lighthouse
  const getApiKey = async () => {
    try {
      const { ethereum } = window;
      // console.log(ethereum);
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);

        const signer = await provider.getSigner();

        let address = await signer.getAddress();
        const verificationMessage = (
          await axios.get(
            `https://api.lighthouse.storage/api/auth/get_message?publicKey=${address}`
          )
        ).data;
        const signedMessage = await signAuthMessage(
          signer,
          verificationMessage
        );
        // let publicKey = ethers.utils.computePublicKey(address);
        const response = await lighthouse.getApiKey(address, signedMessage);
        console.log(response.data.apiKey);
        return response.data.apiKey;
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      setErrorMessageSubmit(
        "Something went wrong. " + error.name + " " + error.message
      );
      return;
    }
  };
  // useEffect(() => {
  //   getApiKey();
  // }, []);
  const onPropose = async (e) => {
    e.preventDefault();
    setProposingDeal(true);
    let key = await getApiKey();
    let url = await uploadFile(input.file, key);

    try {
      const { ethereum } = window;
      // console.log(ethereum);
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);

        const signer = await provider.getSigner();
        governor = new ethers.Contract(
          governorContractAddress,
          governorContractABI,
          signer
        );

        movieDao = new ethers.Contract(movieDaoAddress, movieDaoABI, signer);

        const encodedFunctionCall = movieDao.interface.encodeFunctionData(
          "NewMovie",
          [input.name]
        );

        let description = `New movie proposal. Its called: "${input.name}"`;
        const transaction = await governor.propose(
          [movieDaoAddress],
          [0],
          [encodedFunctionCall],
          description
        );
        // console.log;

        console.log("Proposing deal to DAO...");
        const receipt = await transaction.wait();
        // console.log(movieDao.interface.parseLog(receipt.logs));

        setProposingDeal(false);
        setTxSubmitted("Transaction submitted! " + receipt.hash);
        // ProposalCreated
        console.log(governor);
        console.log(receipt.logs[0].args.calldata);
        let proposalId = receipt.logs[0].args.proposalId;

        const data = {
          proposerAddress: receipt.from.toString(),
          proposalId: proposalId.toString(),
          status: "proposed",
          description: description,
          title: input.name,
          url: detectLinks(url)[0],
        };
        const record = await pb.collection("proposals").create(data);
        console.log(record);
        console.log(receipt.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      setErrorMessageSubmit(
        "Something went wrong. " + error.name + " " + error.message
      );
      return;
    }
  };
  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };
  const uploadFile = async (file, api_key) => {
    const output = await lighthouse.upload(
      file,
      api_key,
      false,
      null,
      progressCallback
    );
    let url =
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash;
    console.log(url);
    return url;
  };
  const { errored, getProposals, value } = useGetProposals();
  const { getBalance, balance } = useGetTokenBalance();
  useEffect(() => {
    getProposals();
    getBalance();
  }, []);
  return (
    <>
      <AppBar />
      <Box padding={"30px"}>
        <Text fontSize={"2xl"}>
          Propose a new movie {value}, {balance}
        </Text>
        <Divider mb={"50px"} />
        {JSON.stringify(input)}
        <form>
          <label htmlFor="name">Name of movie</label>
          <Input name="name" id="name" onChange={handleInput}></Input>
          <Box h="30px" />

          <label htmlFor="file">Text file of synapse</label>
          <Input
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
          ></Input>
          <Box h="30px" />

          <Button onClick={onPropose} mt={"30px"}>
            {proposingDeal ? <Spinner /> : "Save"}
          </Button>
        </form>
      </Box>
    </>
  );
}

export default NewMovieProposal;
