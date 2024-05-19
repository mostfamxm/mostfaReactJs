import React, { createContext, useCallback, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const SnackbarContext = createContext(null);

export default function SnackbarCom({ children }) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("success");
  const [variant, setVariant] = useState("filled");
  const [message, setMessage] = useState("in snackbar!");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const setSnack = useCallback(
    (color, message, variant = "filled") => {
      setOpen(true);
      setColor(color);
      setMessage(message);
      setVariant(variant);
    },
    [setOpen, setColor, setMessage, setVariant]
  );

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={color} variant={variant}>
          {message}
        </Alert>
      </Snackbar>
      <SnackbarContext.Provider value={setSnack}>
        {children}
      </SnackbarContext.Provider>
    </>
  );
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error("useSnackbar must be used within a SnackbarCom");
  return context;
};
