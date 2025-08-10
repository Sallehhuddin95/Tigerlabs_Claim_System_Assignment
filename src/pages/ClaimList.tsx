import { useEffect, useState } from "react";
import axios from "axios";
import { ClaimTable, ClaimFilter } from "../components";
import type { Claim } from "../types";

const ClaimList = () => {
  const [claims, setClaims] = useState<Claim[]>([]);

  const [tempIdSearch, setTempIdSearch] = useState<string>("");
  const [tempHolderSearch, setTempHolderSearch] = useState<string>("");
  const [tempPolicySearch, setTempPolicySearch] = useState<string>("");
  const [tempStatus, setTempStatus] = useState<string>("");

  const [idSearch, setIdSearch] = useState<string>("");
  const [holderSearch, setHolderSearch] = useState<string>("");
  const [policySearch, setPolicySearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get<Claim[]>("/api/v1/claims");
        setClaims(response.data);
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };
    fetchClaims();
  }, []);

  const filteredClaims = claims.filter((claim) => {
    const matchesId =
      !idSearch || claim.number.toLowerCase().includes(idSearch.toLowerCase());
    const matchesHolder =
      !holderSearch ||
      claim.holder.toLowerCase().includes(holderSearch.toLowerCase());
    const matchesPolicy =
      !policySearch ||
      claim.policyNumber.toLowerCase().includes(policySearch.toLowerCase());
    const matchesStatus = !statusFilter || claim.status === statusFilter;

    return matchesId && matchesHolder && matchesPolicy && matchesStatus;
  });

  const applyFilters = () => {
    setIdSearch(tempIdSearch);
    setHolderSearch(tempHolderSearch);
    setPolicySearch(tempPolicySearch);
    setStatusFilter(tempStatus);
  };

  return (
    <div>
      <h2>Claims List</h2>
      <ClaimFilter
        idSearch={tempIdSearch}
        onIdSearchChange={setTempIdSearch}
        holderSearch={tempHolderSearch}
        onHolderSearchChange={setTempHolderSearch}
        policySearch={tempPolicySearch}
        onPolicySearchChange={setTempPolicySearch}
        statusFilter={tempStatus}
        onStatusChange={setTempStatus}
        onSubmit={applyFilters}
      />
      <ClaimTable claimData={filteredClaims} />
    </div>
  );
};

export default ClaimList;
