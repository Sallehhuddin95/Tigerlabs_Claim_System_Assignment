import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as reactRouter from "react-router";
import WelcomeModal from "../../components/WelcomeModal";

vi.mock("react-router", () => ({
  useLocation: vi.fn(() => ({ search: "" })),
}));

describe("WelcomeModal", () => {
  const useLocationMock = reactRouter.useLocation as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    useLocationMock.mockReset();

    useLocationMock.mockReturnValue({ search: "" });
  });

  it("does not show modal if admin query param is missing", () => {
    render(<WelcomeModal />);
    expect(screen.queryByText("Welcome Admin")).toBeNull();
  });

  it("shows modal if admin=true query param exists", () => {
    useLocationMock.mockReturnValue({ search: "?admin=true" });
    render(<WelcomeModal />);
    expect(screen.getByText("Welcome Admin")).toBeDefined();
  });

  it("closes modal when Close button clicked", () => {
    useLocationMock.mockReturnValue({ search: "?admin=true" });
    render(<WelcomeModal />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(dialog).not.toBeVisible();
  });
});
