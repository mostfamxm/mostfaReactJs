import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GeneralContext } from "../App";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import { structureClient } from "./structureClient";
import { dark, light } from "../components/UI/features/theme";
import { TOKEN } from "../api/token";
import { useSnackbar } from "../components/SnackbarCom";

export default function Account() {
  const navigate = useNavigate();
  const { user, setUser, setLoader, isDark } = useContext(GeneralContext);
  const snackbar = useSnackbar();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const obj = {};
    const elements = ev.target.elements;

    structureClient
      .filter((s) => !s.initialOnly)
      .forEach((s) => {
        if (s.type === "boolean") {
          obj[s.name] = elements[s.name].checked;
        } else {
          obj[s.name] = elements[s.name].value;
        }
      });

    setLoader(true);

    try {
      const response = await fetch(
        `https://api.shipap.co.il/clients/update?${TOKEN}`,
        {
          credentials: "include",
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(obj),
        }
      );

      if (response.ok) {
        snackbar("success", "your profile edit succesfully");
      } else {
        snackbar("error", "Update failed");
        console.error("Update failed. Status:", response.status);
        const isJsonResponse = response.headers
          .get("content-type")
          ?.includes("application/json");

        if (isJsonResponse) {
          const errorData = await response.json();
          console.error("Error Data:", errorData);
        } else {
          console.error("Non-JSON response:", await response.text());
        }
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <ThemeProvider theme={isDark ? dark : light}>
      {user ? (
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
              Update Account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                {structureClient
                  .filter((s) => !s.initialOnly)
                  .map((s) => (
                    <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                      {s.type === "boolean" ? (
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              name={s.name}
                              checked={user[s.name]}
                              onChange={(ev) =>
                                setUser({
                                  ...user,
                                  [s.name]: ev.target.checked,
                                })
                              }
                            />
                          }
                          label={s.label}
                          labelPlacement="start"
                        />
                      ) : (
                        <TextField
                          margin="normal"
                          required={s.required}
                          fullWidth
                          id={s.name}
                          label={s.label}
                          name={s.name}
                          type={s.type}
                          autoComplete={s.name}
                          value={user[s.name]}
                          onChange={(ev) =>
                            setUser({ ...user, [s.name]: ev.target.value })
                          }
                        />
                      )}
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
          </Box>
        </Container>
      ) : (
        ""
      )}
    </ThemeProvider>
  );
}
