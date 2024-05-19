import React, { useContext, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { GeneralContext } from "../../App";
import Cards from "./Cards";
import { useSnackbar } from "../SnackbarCom";
import { TOKEN } from "../../api/token";

export default function PageCards({ card }) {
  const { setLoader, setCards } = useContext(GeneralContext);
  const snackbar = useSnackbar();

  useEffect(() => {
    setLoader(true);
    fetch(`https://api.shipap.co.il/cards?${TOKEN}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        snackbar("error", "There are no favorite cards");
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: 750,
      }}
    >
      <Container sx={{ margin: "auto", alignItems: "center" }}>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          All Cards
        </Typography>
        <Cards card={card} />
      </Container>
    </Box>
  );
}
