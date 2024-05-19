import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { GeneralContext } from "../App";
import { useContext, useState } from "react";
import Joi from "joi";
import { dark, light } from "../components/UI/features/theme";
import { TOKEN } from "../api/token";
import { RoleType } from "./roletype";
import { useSnackbar } from "../components/SnackbarCom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const { setUser, setLoader, setRoleType, isDark } =
    useContext(GeneralContext);
  const snackbar = useSnackbar();

  const schema = Joi.object({
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[1-9]).{5,}$/)
      .required()
      .messages({
        "string.pattern.base": "Password must meet the specified criteria",
        "any.required": "Password is required",
      }),
  });

  const handelChange = (ev) => {
    const { name, value } = ev.target;
    const obj = { ...formData, [name]: value };
    setFormData(obj);

    const validate = schema.validate(obj, { abortEarly: false });
    const tempErrors = { ...errors };
    delete tempErrors[name];

    if (validate.error) {
      const item = validate.error.details.find((e) => e.context.key == name);

      if (item) {
        tempErrors[name] = item.message;
      }
    }

    setIsFormValid(!validate.error);
    setErrors(tempErrors);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    setLoader(true);

    fetch(`https://api.shipap.co.il/clients/login?${TOKEN}`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then((data) => {
        setUser(data);
        setRoleType(RoleType.user);

        if (data.business) {
          setRoleType(RoleType.bussiness);
        } else if (data.admin) {
          setRoleType(RoleType.admin);
        }
        snackbar(
          "success",
          `${data.firstName} ${data.lastName} login successfully`
        );
        navigate("/");
      })
      .catch((err) => {
        snackbar("error", err.message);
      })
      .finally(() => setLoader(false));
  };

  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <Box
        sx={{
          position: "relative",
          minHeight: 750,
        }}
      >
        <Container component="main" maxWidth="xs">
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
              Log-In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                error={Boolean(errors.email)}
                helperText={errors.email}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handelChange}
                value={formData.email}
              />
              <TextField
                error={Boolean(errors.password)}
                helperText={errors.password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handelChange}
                value={formData.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isFormValid}
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/signup">Don't have an account? Sign-Up</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
