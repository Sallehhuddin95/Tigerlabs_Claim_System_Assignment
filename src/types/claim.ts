export type ClaimStatus =
  | "Submitted"
  | "Approved"
  | "Processed"
  | "Completed"
  | "Rejected";

export type Order = "asc" | "desc";

export interface Claim {
  id: number;
  number: string;
  status: ClaimStatus;
  amount: string;
  holder: string;
  policyNumber: string;
  insuredItem: string;
  description: string;
  incidentDate: string;
  processingFee: string;
  createdAt: string;
}

export interface PolicyLookupResponse {
  holder: string;
  id: number;
  status: string;
  number: string;
  finalAmount: string;
}
