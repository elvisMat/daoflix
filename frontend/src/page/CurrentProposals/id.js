import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppBar from "../../components/AppBar";
import {
  Box,
  Button,
  ButtonGroup,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import {
  detectLinks,
  governorContractAddress,
  removeLinks,
} from "../../helpers";
import governorContractABI from "../../contractABIs/governorABI.json";
import {
  UseGetProposalState,
  useGetProposalsDetails,
} from "../../hooks/custom";

let governor;
function ProposalId() {
  const { id } = useParams();
  const { loading, proposal } = useGetProposalsDetails(id);
  const [input, setInput] = useState({
    reason: "",
  });

  const handleInput = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const { getPPState, proposalState } = UseGetProposalState();
  useEffect(() => {
    if (proposal.proposalId) {
      getPPState(parseInt(proposal.proposalId));
    }
  }, []);

  async function vote(down = false) {}
  async function voteUp(e) {
    e.preventDefault();

    const voteWay = 1;
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
        console.log(governor);
        const transaction = await governor.castVoteWithReason(
          proposal.proposalId,
          parseInt(voteWay),
          input.reason
        );
        console.log(transaction);
        // const receipt = await transaction.wait();
        // console.log(receipt);
        // let proposalId = receipt.logs[0].args;
        // console.log(receipt.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <div>
      <AppBar />
      {JSON.stringify(input)}
      {proposal.id && (
        <Box padding={"30px"}>
          {proposalState}
          <Text fontSize={"2xl"}>Proposal # {id}</Text>
          <Box h="30px" />

          <Text as="u" fontSize={"xl"}>
            Propossed by
          </Text>
          <Text> {proposal.proposerAddress}</Text>
          <Box h="10px" />
          <Text as="u" fontSize={"xl"}>
            Description{" "}
          </Text>
          <Text>
            {proposal.description}. Find the plot{" "}
            <Link
              style={{ textDecoration: "underline" }}
              target="_blank"
              to={proposal.url}
            >
              here
            </Link>
          </Text>
          <Box h="10px" />

          <form>
            <label htmlFor="reason">Reason for your voting</label>
            <Textarea name="reason" id="reason" onChange={handleInput} />
          </form>
          <Box h="30px" />
          <ButtonGroup>
            <Button onClick={voteUp} size={"lg"}>
              Vote Up
            </Button>
            <Button size={"lg"}>Vote down</Button>
          </ButtonGroup>
        </Box>
      )}
    </div>
  );
}

export default ProposalId;
