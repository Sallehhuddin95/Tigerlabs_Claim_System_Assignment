import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

const ClaimForm = () => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [insuredItem, setInsuredItem] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [description, setDescription] = useState("");
  const [incidentDate, setIncidentDate] = useState<Dayjs | null>(dayjs());
  const [processingFee, setProcessingFee] = useState("");

  const [errors, setErrors] = useState({
    policyNumber: "",
    holderName: "",
    insuredItem: "",
    claimAmount: "",
    description: "",
    incidentDate: "",
    processingFee: "",
  });

  const today = dayjs();
  const minDate = dayjs().subtract(60, "days");

  const validate = () => {
    const newErrors = {
      policyNumber: policyNumber.trim() ? "" : "Policy number is required",
      holderName: holderName.trim() ? "" : "Holder name is required",
      insuredItem: insuredItem.trim() ? "" : "Insured item is required",
      claimAmount:
        claimAmount.trim() && !isNaN(Number(claimAmount))
          ? ""
          : "Valid claim amount is required",
      description: description.trim() ? "" : "Description is required",
      incidentDate:
        incidentDate &&
        incidentDate.isAfter(minDate) &&
        incidentDate.isBefore(today.add(1, "day"))
          ? ""
          : "Incident date must be within last 6 months and not in the future",
      processingFee:
        processingFee.trim() && !isNaN(Number(processingFee))
          ? ""
          : "Valid processing fee is required",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((err) => err === "");
  };

  const handleCurrencyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: (value: string) => void
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setter(value);
    }
  };

  const onSubmit = () => {
    if (!validate()) {
      return;
    }

    const claimData = {
      policyNumber,
      holderName,
      insuredItem,
      claimAmount,
      description,
      incidentDate,
      processingFee,
    };
    console.log("Submitting claim:", claimData);

    resetForm();
  };

  const resetForm = () => {
    setPolicyNumber("");
    setHolderName("");
    setInsuredItem("");
    setClaimAmount("");
    setDescription("");
    setIncidentDate(dayjs());
    setProcessingFee("");
    setErrors({
      policyNumber: "",
      holderName: "",
      insuredItem: "",
      claimAmount: "",
      description: "",
      incidentDate: "",
      processingFee: "",
    });
  };

  return (
    <Box display="flex" gap={2} mb={3} flexWrap="wrap">
      <TextField
        label="Policy Number"
        variant="outlined"
        size="small"
        value={policyNumber}
        onChange={(e) => setPolicyNumber(e.target.value)}
        error={Boolean(errors.policyNumber)}
        helperText={errors.policyNumber}
        fullWidth
        required
      />
      <TextField
        label="Holder Name"
        variant="outlined"
        size="small"
        value={holderName}
        onChange={(e) => setHolderName(e.target.value)}
        error={Boolean(errors.holderName)}
        helperText={errors.holderName}
        fullWidth
        required
      />
      <TextField
        label="Insured Item"
        variant="outlined"
        size="small"
        value={insuredItem}
        onChange={(e) => setInsuredItem(e.target.value)}
        error={Boolean(errors.insuredItem)}
        helperText={errors.insuredItem}
        fullWidth
        required
      />
      <TextField
        label="Claim Amount"
        variant="outlined"
        size="small"
        value={claimAmount}
        onChange={(e) =>
          handleCurrencyChange(
            e as React.ChangeEvent<HTMLInputElement>,
            setClaimAmount
          )
        }
        error={Boolean(errors.claimAmount)}
        helperText={errors.claimAmount}
        fullWidth
        type="number"
        required
      />
      <TextField
        label="Description"
        variant="outlined"
        size="small"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={Boolean(errors.description)}
        helperText={errors.description}
        fullWidth
        multiline
        rows={3}
        required
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Incident Date"
          value={incidentDate}
          onChange={(newValue) => setIncidentDate(newValue)}
          maxDate={today}
          minDate={minDate}
          slotProps={{
            textField: {
              error: Boolean(errors.incidentDate),
              helperText: errors.incidentDate,
              size: "small",
              fullWidth: true,
              required: true,
            },
          }}
        />
      </LocalizationProvider>
      <TextField
        label="Processing Fee"
        variant="outlined"
        size="small"
        value={processingFee}
        onChange={(e) =>
          handleCurrencyChange(
            e as React.ChangeEvent<HTMLInputElement>,
            setProcessingFee
          )
        }
        error={Boolean(errors.processingFee)}
        helperText={errors.processingFee}
        fullWidth
        type="number"
        required
      />
      <Box display="flex" gap={2} mt={2}>
        <Button variant="contained" onClick={onSubmit}>
          Add Claim
        </Button>
        <Button variant="outlined" onClick={resetForm}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default ClaimForm;
