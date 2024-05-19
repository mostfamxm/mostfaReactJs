import React, { useContext, useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Grid,
  Box,
  Typography,
  Container,
  ThemeProvider,
  Switch,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Joi, { boolean } from "joi";
import { GeneralContext } from "../App";
import { structureClient } from "./structureClient";
import { dark, light } from "../components/UI/features/theme";
import { TOKEN } from "../api/token";
import { useSnackbar } from "../components/SnackbarCom";

export default function Signup() {
  const { setUser, setLoader, isDark } = useContext(GeneralContext);
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: null,
    zip: null,
    business: false,
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .min(2)
      .max(50)
      .regex(/^[a-zA-Z0-9]{3,20}$/),
    middleName: Joi.string().max(50),
    lastName: Joi.string().required().min(2).max(50),
    phone: Joi.number().required(),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    password: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9].*[0-9].*[0-9].*[0-9])(?=.*[!@#$%^&*-_*]).{8,30}$/
      )
      .required()
      .messages({
        "string.pattern.base": "Password must meet the specified criteria",
        "any.required": "Password is required",
      }),
    imgUrl: Joi.string().max(100),
    imgAlt: Joi.string().max(20),
    state: Joi.string().max(20),
    country: Joi.string().min(3).max(20).required(),
    city: Joi.string().min(3).max(20).required(),
    street: Joi.string().min(3).max(20).required(),
    houseNumber: Joi.number().min(3).max(20).required(),
    zip: Joi.number(),
    business: Joi.boolean(),
  });

  structureClient.forEach((field) => {
    schema[field.name] = field.required
      ? Joi.string().required()
      : Joi.string().allow("");
  });

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    const obj = { ...formData, [name]: value };
    setFormData(obj);
    console.log(obj);

    const validate = schema.validate(obj, { abortEarly: false });
    const tempErrors = { ...errors };
    delete tempErrors[name];

    if (validate.error) {
      const item = validate.error.details.find((e) => e.context.key === name);

      if (item) {
        tempErrors[name] = item.message;
      }
    }
    console.log(validate.error);
    setIsFormValid(!validate.error);
    setErrors(tempErrors);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    /* const data = new FormData(ev.currentTarget); */
    setLoader(true);

    fetch(
      `https://api.shipap.co.il/clients/signup?token=0de20742-47dc-11ee-8ead-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      }
    )
      .then(async (res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then((data) => {
        setUser(data);
        navigate("/login");
        snackbar(
          "success",
          `${data.firstName} ${data.lastName} registered successfully`
        );
      })
      .catch((err) => {
        snackbar("error", err.message);
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              {structureClient.map((field) => (
                <Grid key={field.name} item xs={12} sm={field.block ? 12 : 6}>
                  {field.type === "boolean" ? (
                    <FormControlLabel
                      control={
                        <Switch
                          color="primary"
                          name={field.name}
                          onChange={handleChange}
                          value={formData[field.name] || false}
                        />
                      }
                      label={field.label}
                      labelPlacement="start"
                    />
                  ) : (
                    <TextField
                      key={field.name}
                      error={Boolean(errors[field.name])}
                      helperText={errors[field.name]}
                      margin="normal"
                      required={field.required}
                      fullWidth
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      autoComplete={field.name}
                      onChange={handleChange}
                      value={formData[field.name] || ""}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isFormValid}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login">Already have an account? Log-In</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
