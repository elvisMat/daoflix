import React from "react";
import AppBar from "../components/AppBar";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { useProposals } from "../hooks/custom";
import { displayFirstLast, truncateString } from "../helpers";
import { Link } from "react-router-dom";

function PendingMovies() {
  const { loading, proposals } = useProposals();
  return (
    <div>
      <AppBar />
      <Box padding={"30px"}>
        <Text fontSize={"2xl"}>New movie proposals: {proposals.length}</Text>
        <Box h="20px" />
        <TableContainer>
          <Table variant="simple">
            <TableCaption>List of pending proposals</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Proposer Addr</Th>
                <Th>Title</Th>
              </Tr>
            </Thead>
            <Tbody>
              {proposals.map((proposal) => {
                return (
                  <Tr key={proposal.id}>
                    <Td>
                      <Link to={`${proposal.id}`}>
                        {truncateString(proposal.proposalId, 15)}
                      </Link>
                    </Td>
                    <Td>{displayFirstLast(proposal.proposerAddress, 10)}</Td>
                    <Td>{proposal.title}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default PendingMovies;
