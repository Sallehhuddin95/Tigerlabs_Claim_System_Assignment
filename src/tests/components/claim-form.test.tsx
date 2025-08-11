import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ClaimForm from "../../components/ClaimForm";
import dayjs from "dayjs";

vi.spyOn(console, "log").mockImplementation(() => {});

describe("ClaimForm", () => {
  it("shows validation errors when submitting empty form", () => {
    render(<ClaimForm />);

    fireEvent.click(screen.getByRole("button", { name: /add claim/i }));

    expect(screen.getByText(/Policy number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Holder name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Insured item is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Valid claim amount is required/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Valid processing fee is required/i)
    ).toBeInTheDocument();
  });

  it("submits successfully when all fields are filled with valid data", () => {
    render(<ClaimForm />);

    fireEvent.change(screen.getByLabelText(/Policy Number/i), {
      target: { value: "PN123" },
    });
    fireEvent.change(screen.getByLabelText(/Holder Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Insured Item/i), {
      target: { value: "Car" },
    });
    fireEvent.change(screen.getByLabelText(/Claim Amount/i), {
      target: { value: "123.45" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Accident claim" },
    });

    fireEvent.click(screen.getByRole("button", { name: /choose date/i }));
    fireEvent.click(screen.getByRole("gridcell", { name: "10" }));
    fireEvent.change(screen.getByLabelText(/Processing Fee/i), {
      target: { value: "50.00" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add claim/i }));

    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();

    expect(screen.getByLabelText(/Policy Number/i)).toHaveValue("");
    expect(screen.getByLabelText(/Holder Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Insured Item/i)).toHaveValue("");
    expect(screen.getByLabelText(/Claim Amount/i)).toHaveValue(null);
    expect(screen.getByLabelText(/Description/i)).toHaveValue("");
    expect(screen.getAllByLabelText(/Incident Date/i)[1]).toHaveValue(
      dayjs().format("MM/DD/YYYY")
    );
    expect(screen.getByLabelText(/Processing Fee/i)).toHaveValue(null);
  });

  it("accepts valid claim amount and processing fee up to 2 decimal places", () => {
    render(<ClaimForm />);

    const claimAmountInput = screen.getByLabelText(/Claim Amount/i);
    const processingFeeInput = screen.getByLabelText(/Processing Fee/i);

    fireEvent.change(claimAmountInput, { target: { value: "123.45" } });
    expect(claimAmountInput).toHaveValue(123.45);

    fireEvent.change(processingFeeInput, { target: { value: "99.99" } });
    expect(processingFeeInput).toHaveValue(99.99);
  });

  it("limits claim amount and processing fee to 2 decimal places", () => {
    render(<ClaimForm />);

    const claimAmountInput = screen.getByLabelText(/Claim Amount/i);
    const processingFeeInput = screen.getByLabelText(/Processing Fee/i);

    fireEvent.change(claimAmountInput, { target: { value: "123.458" } });
    expect(claimAmountInput).toHaveValue(null);

    fireEvent.change(processingFeeInput, { target: { value: "99.998" } });
    expect(processingFeeInput).toHaveValue(null);
  });

  it("resets form fields when Reset is clicked", () => {
    render(<ClaimForm />);

    fireEvent.change(screen.getByLabelText(/Policy Number/i), {
      target: { value: "PN123" },
    });
    fireEvent.change(screen.getByLabelText(/Holder Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Insured Item/i), {
      target: { value: "Car" },
    });

    fireEvent.click(screen.getByRole("button", { name: /reset/i }));

    expect(screen.getByLabelText(/Policy Number/i)).toHaveValue("");
    expect(screen.getByLabelText(/Holder Name/i)).toHaveValue("");
    expect(screen.getByLabelText(/Insured Item/i)).toHaveValue("");
  });
});
