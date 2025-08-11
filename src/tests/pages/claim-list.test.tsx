import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import axios from "axios";
import ClaimList from "../../pages/ClaimList";
import type { Claim } from "../../types";

vi.mock("axios");
vi.mock("../../components", () => ({
  ClaimTable: ({ claimData }: { claimData: Claim[] }) => (
    <div data-testid="claim-table">{JSON.stringify(claimData)}</div>
  ),
  ClaimFilter: () => <div data-testid="claim-filter">Filter</div>,
}));

describe("ClaimList", () => {
  const mockClaims = [
    {
      policyNumber: "PN123",
      holder: "John Doe",
      insuredName: "Car",
      amount: 100,
      description: "Accident",
      incidentDate: "2025-02-19T16:00:00.000Z",
      processingFee: 50,
      number: "CL-0001",
      createdAt: "2025-08-12",
      status: "Submitted",
      id: 1,
    },
    {
      policyNumber: "PN999",
      holder: "Jane Smith",
      insuredName: "House",
      amount: 200,
      description: "Fire damage",
      incidentDate: "2025-02-19T16:00:00.000Z",
      processingFee: 60,
      number: "CL-0002",
      createdAt: "2025-08-12",
      status: "Pending",
      id: 2,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and displays claims", async () => {
    const mockedAxiosGet = axios.get as unknown as ReturnType<typeof vi.fn>;

    mockedAxiosGet.mockResolvedValueOnce({
      data: mockClaims,
    });

    render(
      <MemoryRouter>
        <ClaimList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/api/v1/claims");
      expect(screen.getByTestId("claim-table")).toHaveTextContent("CL-0001");
    });
  });

  it("handles API error gracefully", async () => {
    const mockedAxiosGet = axios.get as unknown as ReturnType<typeof vi.fn>;
    mockedAxiosGet.mockRejectedValueOnce(new Error("API Error"));

    render(
      <MemoryRouter>
        <ClaimList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/api/v1/claims");
      expect(screen.getByTestId("claim-table")).toHaveTextContent("[]");
    });
  });
});
