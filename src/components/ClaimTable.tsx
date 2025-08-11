import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

import type { Claim, Order } from "../types";

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

interface ClaimTableProps {
  claimData: Claim[];
}

const ClaimTable = ({ claimData }: ClaimTableProps) => {
  const [sortBy, setSortBy] = useState<keyof Claim | "totalAmount">(
    "createdAt"
  );
  const [order, setOrder] = useState<Order>("asc");

  const handleSort = (property: keyof Claim | "totalAmount") => {
    const isAsc = sortBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setSortBy(property);
  };

  const propertyValue = (
    obj: Claim,
    key: keyof Claim | "totalAmount"
  ): number | string => {
    if (key === "totalAmount") {
      return parseFloat(obj.amount) + parseFloat(obj.processingFee);
    }
    if (key === "amount" || key === "processingFee") {
      return parseFloat(obj[key]);
    }
    if (key === "createdAt") {
      return new Date(obj.createdAt).getTime();
    }
    return obj[key];
  };

  const sortedData = [...claimData].sort((a, b) => {
    const valA = propertyValue(a, sortBy);
    const valB = propertyValue(b, sortBy);

    if (typeof valA === "number" && typeof valB === "number") {
      return order === "asc" ? valA - valB : valB - valA;
    }
    if (typeof valA === "string" && typeof valB === "string") {
      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
    return 0;
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          data-testid="claim-table"
        >
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell>Claim id</StyledTableHeaderCell>
              <StyledTableHeaderCell align="left">Status</StyledTableHeaderCell>

              <StyledTableHeaderCell
                sortDirection={sortBy === "amount" ? order : false}
              >
                <TableSortLabel
                  active={sortBy === "amount"}
                  direction={sortBy === "amount" ? order : "asc"}
                  onClick={() => handleSort("amount")}
                >
                  Claim amount
                </TableSortLabel>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell align="left">
                Holder name
              </StyledTableHeaderCell>
              <StyledTableHeaderCell align="left">
                Policy number
              </StyledTableHeaderCell>
              <StyledTableHeaderCell align="left">
                Insured item
              </StyledTableHeaderCell>
              <StyledTableHeaderCell align="left">
                Description
              </StyledTableHeaderCell>
              <StyledTableHeaderCell align="left">
                Incident date
              </StyledTableHeaderCell>

              <StyledTableHeaderCell
                sortDirection={sortBy === "processingFee" ? order : false}
              >
                <TableSortLabel
                  active={sortBy === "processingFee"}
                  direction={sortBy === "processingFee" ? order : "asc"}
                  onClick={() => handleSort("processingFee")}
                >
                  Processing fee
                </TableSortLabel>
              </StyledTableHeaderCell>

              <StyledTableHeaderCell
                sortDirection={sortBy === "totalAmount" ? order : false}
              >
                <TableSortLabel
                  active={sortBy === "totalAmount"}
                  direction={sortBy === "totalAmount" ? order : "asc"}
                  onClick={() => handleSort("totalAmount")}
                >
                  Total amount (Claim amount + Processing fee)
                </TableSortLabel>
              </StyledTableHeaderCell>
              <StyledTableHeaderCell
                sortDirection={sortBy === "createdAt" ? order : false}
              >
                <TableSortLabel
                  active={sortBy === "createdAt"}
                  direction={sortBy === "createdAt" ? order : "asc"}
                  onClick={() => handleSort("createdAt")}
                >
                  Created at
                </TableSortLabel>
              </StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row: Claim) => (
              <TableRow
                key={row?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.number}
                </TableCell>
                <TableCell align="left">{row?.status}</TableCell>
                <TableCell align="left">{row?.amount}</TableCell>
                <TableCell align="left">{row?.holder}</TableCell>
                <TableCell align="left">{row?.policyNumber}</TableCell>
                <TableCell component="th" scope="row">
                  {row?.insuredItem}
                </TableCell>
                <TableCell align="left">{row?.description}</TableCell>
                <TableCell align="left">{row?.incidentDate}</TableCell>
                <TableCell align="left">{row?.processingFee}</TableCell>
                <TableCell align="left">
                  {(
                    parseFloat(row?.amount || "0") +
                    parseFloat(row?.processingFee || "0")
                  ).toFixed(2)}
                </TableCell>
                <TableCell align="left">{row?.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ClaimTable;
