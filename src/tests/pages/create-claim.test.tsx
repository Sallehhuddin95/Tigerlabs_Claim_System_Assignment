import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CreateClaim } from "../../pages";

vi.mock("../../components/ClaimForm", () => ({
  default: () => <div data-testid="claim-form" />,
}));

describe("CreateClaim Page", () => {
  it("renders the page heading", () => {
    render(<CreateClaim />);
    expect(
      screen.getByRole("heading", { name: /Create New Claim/i })
    ).toBeInTheDocument();
  });

  it("renders the ClaimForm component", () => {
    render(<CreateClaim />);
    expect(screen.getByTestId("claim-form")).toBeInTheDocument();
  });
});
