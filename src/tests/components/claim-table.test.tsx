import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ClaimTable } from "../../components";
import type { Claim } from "../../types";

const fakeClaims: Claim[] = [
  {
    id: 1,
    number: "CLAIM001",
    status: "Submitted",
    amount: "100.00",
    holder: "Alice",
    policyNumber: "POL123",
    insuredItem: "Car",
    description: "Car accident",
    incidentDate: "2023-06-01",
    processingFee: "5.00",
    createdAt: "2023-06-02T12:00:00Z",
  },
  {
    id: 2,
    number: "CLAIM002",
    status: "Approved",
    amount: "200.00",
    holder: "Bob",
    policyNumber: "POL456",
    insuredItem: "Bike",
    description: "Bike accident",
    incidentDate: "2023-07-10",
    processingFee: "10.00",
    createdAt: "2023-07-11T10:00:00Z",
  },
];

describe("ClaimTable", () => {
  it("renders rows for each claim", () => {
    render(<ClaimTable claimData={fakeClaims} />);

    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(fakeClaims.length + 1);

    expect(screen.getByText("CLAIM001")).toBeInTheDocument();
    expect(screen.getByText("CLAIM002")).toBeInTheDocument();
  });

  //   it("sorts by Claim amount ascending and descending on header click", () => {
  //     render(<ClaimTable claimData={fakeClaims} />);
  //     const claimAmountHeader = screen.getAllByText(/Claim amount/i)[0];

  //     let cells = screen
  //       .getAllByRole("row")
  //       .slice(1)
  //       .map((row) => {
  //         return within(row).getByText(/\d+\.\d{2}/).textContent;
  //       });
  //     expect(cells).toEqual(["200.00", "100.00"]);

  //     fireEvent.click(claimAmountHeader);

  //     cells = screen
  //       .getAllByRole("row")
  //       .slice(1)
  //       .map((row) => within(row).getByText(/\d+\.\d{2}/).textContent);
  //     expect(cells).toEqual(["100.00", "200.00"]);

  //     fireEvent.click(claimAmountHeader);

  //     cells = screen
  //       .getAllByRole("row")
  //       .slice(1)
  //       .map((row) => within(row).getByText(/\d+\.\d{2}/).textContent);
  //     expect(cells).toEqual(["200.00", "100.00"]);
  //   });

  //   it("sorts by Processing fee ascending and descending on header click", () => {
  //     render(<ClaimTable claimData={fakeClaims} />);
  //     const processingFeeHeader = screen.getAllByText(/Processing fee/i)[0];

  //     fireEvent.click(processingFeeHeader);

  //     let fees = screen
  //       .getAllByRole("row")
  //       .slice(1)
  //       .map((row) => within(row).getByText(/\d+\.\d{2}/).textContent);

  //     expect(fees).toEqual(["5.00", "10.00"]);

  //     fireEvent.click(processingFeeHeader);

  //     fees = screen
  //       .getAllByRole("row")
  //       .slice(1)
  //       .map((row) => within(row).getByText(/\d+\.\d{2}/).textContent);
  //     expect(fees).toEqual(["10.00", "5.00"]);
  //   });

  //   it("sorts by Total amount ascending and descending on header click", () => {
  //     render(<ClaimTable claimData={fakeClaims} />);
  //     const totalAmountHeader = screen.getByText(/Total amount/i);

  //     fireEvent.click(totalAmountHeader);

  //     const totals = screen
  //       .getAllByRole("row")
  //       .slice(1)
  //       .map((row) => within(row).getByText(/\d+\.\d{2}/).textContent);

  //     expect(totals).toEqual(["105.00", "210.00"]);

  // fireEvent.click(totalAmountHeader);

  // totals = screen
  //   .getAllByRole("row")
  //   .slice(1)
  //   .map((row) => within(row).getByText(/\d+\.\d{2}/).textContent);
  // expect(totals).toEqual(["210.00", "105.00"]);
  //   });

  //   it("sorts by Created at ascending and descending on header click", () => {
  //     render(<ClaimTable claimData={fakeClaims} />);
  //     const createdAtHeader = screen.getByText(/Created at/i);

  //     fireEvent.click(createdAtHeader);

  //     let createdDates = screen
  //       .getAllByRole("row")
  //       .slice(1)
  //       .map(
  //         (row) =>
  //           within(row).getByText(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/)
  //             .textContent
  //       );

  //     expect(createdDates).toEqual([
  //       "2023-06-02T12:00:00Z",
  //       "2023-07-11T10:00:00Z",
  //     ]);

  //     fireEvent.click(createdAtHeader);

  //     createdDates = screen
  //       .getAllByRole("row")
  //       .slice(1)
  //       .map(
  //         (row) =>
  //           within(row).getByText(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/)
  //             .textContent
  //       );

  //     expect(createdDates).toEqual([
  //       "2023-06-02T12:00:00Z",
  //     ]);
  //   });
});
