import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GeneralContext } from "../App";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { structureCard } from "./structureCard";
import { dark, light } from "../components/UI/features/theme";
import { TOKEN } from "../api/token";
import { useSnackbar } from "../components/SnackbarCom";

export default function EditCard() {
  const { id } = useParams();
  let { state } = useLocation();
  const [editCard, setEditCard] = useState(state || getDefaultCardState());
  const navigate = useNavigate();
  const { setLoader, isDark } = useContext(GeneralContext);
  const snackbar = useSnackbar();

  const handelInput = (event) => {
    const { name, value } = event.target;
    setEditCard({
      ...editCard,
      [name]: value,
    });
  };

  const updateCard = (ev) => {
    ev.preventDefault();

    setLoader(true);

    fetch(`https://api.shipap.co.il/business/cards/${id}?${TOKEN}`, {
      credentials: "include",
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(editCard),
    })
      .then((data) => {
        snackbar("success", "The card was successfully issued");
        setEditCard(editCard);
        navigate("/");
      })
      .finally(() => setLoader(false));
  };

  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit Card
          </Typography>
          <Box component="form" noValidate onSubmit={updateCard} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {structureCard.map((s) => (
                <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                  <TextField
                    name={s.name}
                    required={s.required}
                    fullWidth
                    id={s.name}
                    label={s.label}
                    type={s.type}
                    onChange={handelInput}
                    value={editCard[s.name] || ""}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

// Helper function to get default card state with empty values
function getDefaultCardState() {
  return {
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  };
}
