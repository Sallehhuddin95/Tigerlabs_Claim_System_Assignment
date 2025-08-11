import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ClaimTable } from "../../components";
import type { Claim } from "../../types";

const mockData: Claim[] = [
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
    render(<ClaimTable claimData={mockData} />);

    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(mockData.length + 1);

    expect(screen.getByText("CLAIM001")).toBeInTheDocument();
    expect(screen.getByText("CLAIM002")).toBeInTheDocument();
  });
});
