import React, { useContext } from "react";
import ComponentCard from "./ComponentCard";
import { Container, Grid } from "@mui/material";
import { GeneralContext } from "../../App";
import { search } from "../header/SearchBar";

export default function Cards() {
  const { cards, userPermissions, searchWord } = useContext(GeneralContext);

  return (
    <Container sx={{ margin: "auto", alignItems: "center" }}>
      <Grid sx={{ flexGrow: 1, paddingTop: 3 }} container spacing={2} pb={2}>
        {cards
          .filter((card) =>
            search(searchWord, card.title, card.description, card.subTitle)
          )
          .map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
              <ComponentCard
                key={card.id}
                card={card}
                userPermissions={userPermissions}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
