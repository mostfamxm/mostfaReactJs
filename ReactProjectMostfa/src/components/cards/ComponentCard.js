import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import { useNavigate } from "react-router-dom";
import { CardHeader } from "@mui/material";
import { Box, Card } from "@mui/joy";
import IconsCard from "./IconsCard";

export default function ComponentCard({ card }) {
  const navigate = useNavigate();

  /*  const cardImage =
    card.imgUrl.length > 8
      ? card.ImgUrl
      : "https://i.ibb.co/Hn3fFRD/no-image-icon-23494.png"; */

  return (
    <Card
      variant="outlined"
      size="md"
      sx={(theme) => ({
        boxShadow: "md",
        "--joy-shadowChannel": theme.vars.palette.danger.darkChannel,

        gap: "clamp(0px, (100% - 360px + 32px) * 999, 16px)",
        "&:hover": {
          borderColor: theme.vars.palette.primary.outlinedHoverBorder,
          transform: "translateY(-2px)",
          color: "#0B6BCB",
          scale: 1.1,
        },
      })}
    >
      <CardOverflow>
        <AspectRatio
          variant="soft"
          sx={{
            flexGrow: 1,
          }}
          onClick={() => navigate(`/cards/${card.id}`, { state: card })}
        >
          <img
            src={card.imgUrl}
            style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
            loading="lazy"
            alt={card.imgAlt}
          />
        </AspectRatio>
        <IconsCard card={card} />
      </CardOverflow>
      <CardContent
        sx={{ pb: 1 }}
        onClick={() => navigate(`/cards/${card.id}`, { state: card })}
      >
        <CardHeader
          title={card.title}
          subheader={card.subtitle}
          sx={{ p: 0, mb: 1 }}
        />
        <Divider />
        <Box mt={1}>
          <Typography variant="body2" noWrap>
            <b>phone: </b>
            {card.phone}
            <br />
            <b>email: </b>
            {card.email}
            <br />
            <b>address: </b> {card.state} {card.country} {card.city}{" "}
            {card.street}
            <br />
            <b>card number: </b>0{card.id}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
