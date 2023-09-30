import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  governorContractAddress,
  movieDaoAddress,
  pb,
  tokenAddress,
} from "../helpers";
import governorContractABI from "../contractABIs/governorABI.json";
import governanceTokenABI from "../contractABIs/governanceTokenABI.json";
export function useGetProposalsDetails(id) {
  const [proposal, setProposal] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(id);
  useEffect(() => {
    setLoading(true);
    try {
      pb.collection("proposals")
        .getOne(id)
        .then((data) => {
          console.log(data);
          setProposal(data);
        });
    } catch (e) {
      console.log("Error fetching proposals", e);
    }
  }, []);

  return { loading, proposal };
}
export function useGetProposals() {
  const [errored, setErroed] = useState(false);
  const [value, setValue] = useState("");
  async function getProposals() {
    try {
      const { ethereum } = window;
      // console.log(ethereum);
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const governor = new ethers.Contract(
          governorContractAddress,
          governorContractABI,
          provider
        );
        const result = await governor.getNumberOfProposals();
        setValue(result.toString());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);

      return;
    }
  }
  return { errored, getProposals, value };
  // getProposals()
}
export function useGetTokenBalance() {
  const [balance, setBalance] = useState("");
  async function getBalance() {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();

        let address = await signer.getAddress();
        const governanceToken = new ethers.Contract(
          tokenAddress,
          governanceTokenABI,
          signer
        );
        const result = await governanceToken.balanceOf(address);
        setBalance(result.toString());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);

      return;
    }
  }
  return { getBalance, balance };
}
export function UseGetProposalState(proposalId) {
  const [proposalState, setProposalState] = useState("");
  async function getPPState() {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const governor = new ethers.Contract(
          governorContractAddress,
          governorContractABI,
          signer
        );
        const result = await governor.state(proposalId);
        console.log(result);
        setProposalState(result);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);

      return;
    }
  }
  return { getPPState, proposalState };
}

export function useProposals() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      setLoading(true);
      pb.collection("proposals")
        .getList(1, 50, {
          filter: 'status = "proposed"',
          sort: "-created",
        })
        .then((data) => {
          console.log(data.items);
          setProposals(data.items);
          setLoading(false);
        });
    } catch (e) {
      console.log("Error fetching proposals", e);
    }
  }, []);

  return { loading, proposals };
}
export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      setLoading(true);
      pb.collection("movies")
        .getList(1, 50)

        .then((data) => {
          console.log(data.items);
          setMovies(data.items);
          setLoading(false);
        });
    } catch (e) {
      console.log("Error fetching proposals", e);
    }
  }, []);

  return { loading, movies };
}
