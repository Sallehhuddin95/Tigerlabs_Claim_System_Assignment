import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

vi.mock("../pages", () => ({
  ClaimList: () => <div>Mock ClaimList Page</div>,
  CreateClaim: () => <div>Mock CreateClaim Page</div>,
}));

function setInitialRoute(path: string | URL | null | undefined) {
  window.history.pushState({}, "Test page", path);
}

describe("App routing with react-router", () => {
  it("renders main heading", () => {
    setInitialRoute("/");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Claim System"
    );
  });

  it("renders ClaimList on root path", () => {
    setInitialRoute("/");
    render(<App />);
    expect(screen.getByText("Mock ClaimList Page")).toBeDefined();
  });

  it("renders CreateClaim on /create-claim path", () => {
    setInitialRoute("/create-claim");
    render(<App />);
    expect(screen.getByText("Mock CreateClaim Page")).toBeDefined();
  });
});
