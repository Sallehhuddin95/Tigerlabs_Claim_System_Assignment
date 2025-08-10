import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import type { Claim } from "../types";

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
  return (
    <>
      {" "}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell>Claim id</StyledTableHeaderCell>
              <StyledTableHeaderCell align="left">Status</StyledTableHeaderCell>
              <StyledTableHeaderCell align="left">
                Claim amount
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
              <StyledTableHeaderCell align="left">
                Processing fee
              </StyledTableHeaderCell>
              <StyledTableHeaderCell align="left">
                Total amount (Claim amount + Processing fee)
              </StyledTableHeaderCell>
              <StyledTableHeaderCell align="left">
                Created at
              </StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claimData.map((row: Claim) => (
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
