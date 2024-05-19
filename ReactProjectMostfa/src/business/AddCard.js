import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GeneralContext } from "../App";
import EditCard from "./EditCard";
import { structureCard } from "./structureCard";
import { dark, light } from "../components/UI/features/theme";
import { TOKEN } from "../api/token";
import { useSnackbar } from "../components/SnackbarCom";

export default function AddCard() {
  const [isEdit, setIsEdit] = useState(false);
  const [editCardData, setEditCardData] = useState({});
  const { setLoader, isDark } = useContext(GeneralContext);
  const navigate = useNavigate();
  const [card, setCard] = useState({});
  const snackbar = useSnackbar();

  const handleEditClick = (cardData) => {
    setIsEdit(true);
    setEditCardData(cardData);
  };

  const handleEditSave = (editCard) => {
    setIsEdit(false);
  };

  const addCard = (ev) => {
    ev.preventDefault();
    setLoader(true);

    const elements = ev.target.elements;

    structureCard.forEach((s) => {
      card[s.name] = elements[s.name].value;
    });

    fetch(`https://api.shipap.co.il/business/cards?${TOKEN}`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(card),
    })
      .then((res) => res.json())
      .then((data) => {
        setCard(data);
        navigate("/");
        snackbar("success", "The card has been successfully added");
      })
      .catch((err) => snackbar("error", err.message));
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
            {card.id ? "Edit" : "Add"} Card
          </Typography>
          {isEdit ? (
            <EditCard
              cardData={editCardData}
              onSave={(editCard) => handleEditSave(editCard)}
            />
          ) : (
            <Box component="form" noValidate onSubmit={addCard} sx={{ mt: 3 }}>
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
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
