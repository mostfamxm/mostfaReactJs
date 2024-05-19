import React, { useContext, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { GeneralContext } from "../App";
import Cards from "../components/cards/Cards";
import { TOKEN } from "../api/token";
import { useSnackbar } from "../components/SnackbarCom";

export default function FavCards({ card }) {
  const { setLoader, setCards } = useContext(GeneralContext);
  const snackbar = useSnackbar();

  useEffect(() => {
    setLoader(true);
    fetch(`https://api.shipap.co.il/cards/favorite?${TOKEN}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const favoriteCards = data.filter((card) => card.favorite);

        setCards(favoriteCards);
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
          Favorite Cards
        </Typography>
        <Cards card={card} />
      </Container>
    </Box>
  );
}
