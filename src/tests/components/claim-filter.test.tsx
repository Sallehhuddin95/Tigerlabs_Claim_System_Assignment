import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { ClaimFilter } from "../../components";
import { describe, it, expect, beforeEach } from "vitest";

describe("ClaimFilter", () => {
  const mockOnIdSearchChange = vi.fn();
  const mockOnHolderSearchChange = vi.fn();
  const mockOnPolicySearchChange = vi.fn();
  const mockOnStatusChange = vi.fn();
  const mockOnSubmit = vi.fn();

  const renderFilter = () =>
    render(
      <ClaimFilter
        idSearch=""
        onIdSearchChange={mockOnIdSearchChange}
        holderSearch=""
        onHolderSearchChange={mockOnHolderSearchChange}
        policySearch=""
        onPolicySearchChange={mockOnPolicySearchChange}
        statusFilter=""
        onStatusChange={mockOnStatusChange}
        onSubmit={mockOnSubmit}
      />
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls the correct change handlers when inputs are updated", () => {
    renderFilter();

    fireEvent.change(screen.getByLabelText(/ID/i), {
      target: { value: "123" },
    });
    expect(mockOnIdSearchChange).toHaveBeenCalledWith("123");

    fireEvent.change(screen.getByLabelText(/Holder Name/i), {
      target: { value: "John" },
    });
    expect(mockOnHolderSearchChange).toHaveBeenCalledWith("John");

    fireEvent.change(screen.getByLabelText(/Policy Number/i), {
      target: { value: "POL-456" },
    });
    expect(mockOnPolicySearchChange).toHaveBeenCalledWith("POL-456");
    fireEvent.mouseDown(screen.getByLabelText(/Status/i));
    fireEvent.click(screen.getByText(/Approved/i));
    expect(mockOnStatusChange).toHaveBeenCalledWith("Approved");
  });

  it("calls onSubmit when Search button is clicked", () => {
    renderFilter();

    fireEvent.click(screen.getByRole("button", { name: /Search/i }));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("resets all filters when Reset button is clicked", () => {
    renderFilter();

    fireEvent.click(screen.getByRole("button", { name: /Reset/i }));
    expect(mockOnIdSearchChange).toHaveBeenCalledWith("");
    expect(mockOnHolderSearchChange).toHaveBeenCalledWith("");
    expect(mockOnPolicySearchChange).toHaveBeenCalledWith("");
    expect(mockOnStatusChange).toHaveBeenCalledWith("");
  });
});
