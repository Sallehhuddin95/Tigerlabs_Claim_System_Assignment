import React, { useEffect } from "react";
import axios from "axios";
import ClaimTable from "../components/ClaimTable";

import type { Claim } from "../types";

const ClaimList = () => {
  const [rows, setRows] = React.useState<Claim[]>([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get<Claim[]>("/api/v1/claims");
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };

    fetchClaims();
  }, []);

  return (
    <div>
      <h2>Claims List</h2>
      <ClaimTable claimData={rows} />
    </div>
  );
};

export default ClaimList;
