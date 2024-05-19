import { Box, Container, Fab, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/cards/Cards";
import { GeneralContext } from "../App";
import { TOKEN } from "../api/token";
import AddIcon from "@mui/icons-material/Add";

export default function MyCards({ card }) {
  const navigate = useNavigate();
  const { setCards, setLoader } = useContext(GeneralContext);

  const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 30,
  };

  useEffect(() => {
    setLoader(true);
    fetch(`https://api.shipap.co.il/business/cards?${TOKEN}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
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
      <Container
        sx={{
          margin: "auto",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          My Cards
        </Typography>{" "}
        <Fab
          sx={fabStyle}
          color="primary"
          aria-label="add"
          onClick={() => navigate("/business/cards")}
        >
          <AddIcon />
        </Fab>
        <Cards card={card} key={card} />
      </Container>
    </Box>
  );
}
