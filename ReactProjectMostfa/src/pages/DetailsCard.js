import { Box, Container, Divider, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../App";
import { Link, useLocation, useParams } from "react-router-dom";
import { TOKEN } from "../api/token";
import { AspectRatio, Card, CardOverflow, List } from "@mui/joy";
import { useSnackbar } from "../components/SnackbarCom";

export default function DetailsCard({ card }) {
  const { isDark } = useContext(GeneralContext);
  let { state } = useLocation();
  const { id } = useParams();
  const [details, setDetails] = useState(state);
  const { setLoader } = useContext(GeneralContext);
  const snackbar = useSnackbar();

  useEffect(() => {
    setLoader(true);
    fetch(`https://api.shipap.co.il/cards/${id}?${TOKEN}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      })
      .catch((error) => {
        snackbar("error", `Error fetching card details: ${error}`);
      })
      .finally(() => setLoader(false));
  }, [id]);

  return (
    <Box>
      <Container sx={{ margin: "auto", alignItems: "center", p: 5 }}>
        {details ? (
          <Card variant="outlined" size="sm">
            <CardOverflow>
              <AspectRatio
                ratio="4/3"
                variant="soft"
                sx={{
                  flexGrow: 1,
                }}
              >
                <img
                  src={details.imgUrl}
                  style={{
                    width: "100%",
                    transform: "translateZ(0)",
                    alignItems: "center",
                  }}
                  loading="lazy"
                  alt={details.imgAlt}
                />
              </AspectRatio>
            </CardOverflow>

            <Typography variant="h2" sx={{ textAlign: "center" }}>
              {details.title}
            </Typography>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              {details.subtitle}
            </Typography>
            <Divider />
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {details.description}
            </Typography>
            <Box sx={{ justifyContent: "center" }}>
              <List
                variant="outlined"
                sx={{
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  {" "}
                  {details.phone}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  {" "}
                  {details.email}
                </Typography>
                <Typography
                  variant="h6"
                  component={Link}
                  sx={{ textAlign: "center" }}
                >
                  {details.web}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  {" "}
                  {details.state} {details.country}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  {details.city}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  {details.street} {details.houseNumber}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  {details.zip}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  0{details.id}
                </Typography>
              </List>
            </Box>
          </Card>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Container>
    </Box>
  );
}
