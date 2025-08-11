import React, { useState, useCallback } from "react";
import {
  TextField,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Alert,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import type { PolicyLookupResponse } from "../types";
import axios from "axios";

const ClaimForm = () => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [insuredItem, setInsuredItem] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [description, setDescription] = useState("");
  const [incidentDate, setIncidentDate] = useState<Dayjs | null>(dayjs());
  const [processingFee, setProcessingFee] = useState("");

  const [isLoadingPolicy, setIsLoadingPolicy] = useState(false);
  const [policyLookupError, setPolicyLookupError] = useState("");
  const [isHolderNamePrefilled, setIsHolderNamePrefilled] = useState(false);

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
  const minDate = dayjs().subtract(6, "months");

  const lookupPolicyNumber = useCallback(async (policyNum: string) => {
    if (!policyNum.trim()) return;

    setIsLoadingPolicy(true);
    setPolicyLookupError("");

    try {
      const response = await axios.get<PolicyLookupResponse[]>(
        "/api/v1/policies",
        {
          params: { q: policyNum.trim() },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      const foundPolicy = data.find((policy) => policy.number === policyNum);

      if (foundPolicy && foundPolicy.holder) {
        setHolderName(foundPolicy.holder);
        setIsHolderNamePrefilled(true);
        setPolicyLookupError("");

        setErrors((prev) => ({ ...prev, policyNumber: "" }));
      } else {
        setPolicyLookupError("Policy not found or invalid");
        setHolderName("");
        setIsHolderNamePrefilled(false);
      }
    } catch (error) {
      console.error("Policy lookup error:", error);
      setPolicyLookupError("Failed to lookup policy. Please try again.");
      setHolderName("");
      setIsHolderNamePrefilled(false);
    } finally {
      setIsLoadingPolicy(false);
    }
  }, []);

  const handlePolicyNumberBlur = () => {
    if (policyNumber.trim()) {
      lookupPolicyNumber(policyNumber.trim());
    }
  };

  const handlePolicyNumberKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (policyNumber.trim()) {
        lookupPolicyNumber(policyNumber.trim());
      }
    }
  };

  const handlePolicyNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPolicyNumber(value);

    if (isHolderNamePrefilled) {
      setHolderName("");
      setIsHolderNamePrefilled(false);
    }
    setPolicyLookupError("");
  };

  const handleHolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHolderName(e.target.value);

    if (isHolderNamePrefilled) {
      setIsHolderNamePrefilled(false);
    }
  };

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
      holder: holderName,
      insuredName: insuredItem,
      amount: parseFloat(claimAmount),
      description,
      incidentDate: incidentDate?.startOf("day").toISOString(),
      processingFee: parseFloat(processingFee),
    };
    console.log("Submitting claim:", claimData);

    axios
      .post("/api/v1/claims", claimData)
      .then((response) => {
        console.log("Claim submitted successfully:", response.data);
        resetForm();
      })
      .catch((error) => {
        console.error("Error submitting claim:", error);
        setPolicyLookupError("Failed to submit claim. Please try again.");
      });

    // resetForm();
  };

  const resetForm = () => {
    setPolicyNumber("");
    setHolderName("");
    setInsuredItem("");
    setClaimAmount("");
    setDescription("");
    setIncidentDate(dayjs());
    setProcessingFee("");
    setIsHolderNamePrefilled(false);
    setPolicyLookupError("");
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
    <Box display="flex" flexDirection="column" gap={2} mb={3}>
      {policyLookupError && (
        <Alert severity="warning" onClose={() => setPolicyLookupError("")}>
          {policyLookupError}
        </Alert>
      )}

      <Box display="flex" gap={2} flexWrap="wrap">
        <TextField
          label="Policy Number"
          variant="outlined"
          size="small"
          value={policyNumber}
          onChange={handlePolicyNumberChange}
          onBlur={handlePolicyNumberBlur}
          onKeyDown={handlePolicyNumberKeyPress}
          error={Boolean(errors.policyNumber)}
          helperText={
            errors.policyNumber || "Press Enter or click away to lookup policy"
          }
          fullWidth
          required
          InputProps={{
            endAdornment: isLoadingPolicy && (
              <InputAdornment position="end">
                <CircularProgress size={20} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Holder Name"
          variant="outlined"
          size="small"
          value={holderName}
          onChange={handleHolderNameChange}
          error={Boolean(errors.holderName)}
          helperText={
            errors.holderName ||
            (isHolderNamePrefilled ? "Auto-filled from policy lookup" : "")
          }
          fullWidth
          required
          InputProps={{
            style: {
              backgroundColor: isHolderNamePrefilled ? "#f0f8f0" : "inherit",
            },
          }}
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
      </Box>

      <Box display="flex" gap={2} mt={2}>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={isLoadingPolicy}
        >
          Add Claim
        </Button>
        <Button
          variant="outlined"
          onClick={resetForm}
          disabled={isLoadingPolicy}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default ClaimForm;
