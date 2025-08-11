import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from "@mui/material";

interface ClaimFilterProps {
  statusFilter: string;
  onStatusChange: (value: string) => void;
  idSearch: string;
  onIdSearchChange: (value: string) => void;
  holderSearch: string;
  onHolderSearchChange: (value: string) => void;
  policySearch: string;
  onPolicySearchChange: (value: string) => void;
  onSubmit: () => void;
}

const statusOptions = [
  { label: "All", value: "" },
  { label: "Submitted", value: "Submitted" },
  { label: "Approved", value: "Approved" },
  { label: "Processed", value: "Processed" },
  { label: "Completed", value: "Completed" },
  { label: "Rejected", value: "Rejected" },
];

const ClaimFilter: React.FC<ClaimFilterProps> = ({
  idSearch,
  onIdSearchChange,
  holderSearch,
  onHolderSearchChange,
  policySearch,
  onPolicySearchChange,
  statusFilter,
  onStatusChange,
  onSubmit,
}) => {
  return (
    <Box display="flex" gap={2} mb={3} flexWrap="wrap" alignItems="center">
      <TextField
        label="ID"
        variant="outlined"
        size="small"
        value={idSearch}
        onChange={(e) => onIdSearchChange(e.target.value)}
        sx={{ minWidth: 200 }}
      />
      <TextField
        label="Holder Name"
        variant="outlined"
        size="small"
        value={holderSearch}
        onChange={(e) => onHolderSearchChange(e.target.value)}
        sx={{ minWidth: 200 }}
      />
      <TextField
        label="Policy Number"
        variant="outlined"
        size="small"
        value={policySearch}
        onChange={(e) => onPolicySearchChange(e.target.value)}
        sx={{ minWidth: 200 }}
      />

      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status-select"
          label="Status"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={onSubmit} sx={{ height: 40 }}>
        Search
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          onIdSearchChange("");
          onHolderSearchChange("");
          onPolicySearchChange("");
          onStatusChange("");
        }}
        sx={{ height: 40 }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default ClaimFilter;
