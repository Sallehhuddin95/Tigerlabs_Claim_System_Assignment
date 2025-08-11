import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const WelcomeModal = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("admin") === "true") {
      setOpen(true);
    }
  }, [location.search]);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Welcome Admin</DialogTitle>
      <DialogContent>Welcome to the admin dashboard!</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WelcomeModal;
