import { Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import React, { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../App";
import { TOKEN } from "../../api/token";
import { useSnackbar } from "../SnackbarCom";

export default function AddFavoriteCard({ card }) {
  const [isLike, setIsLike] = useState(false);

  const { setLoader } = useContext(GeneralContext);
  const snackbar = useSnackbar();

  useEffect(() => {
    if (!card) return;
    setIsLike(card.favorite);
  }, [card]);

  const like = (ev) => {
    ev.preventDefault();
    setLoader(true);
    setIsLike((like) => !like);

    const url = isLike ? "unfavorite" : "favorite";

    fetch(`https://api.shipap.co.il/cards/${card.id}/${url}?${TOKEN}`, {
      credentials: "include",
      method: "PUT",
    })
      .then((res) => {
        if (isLike) {
          snackbar("warning", "The card has been removed from favorites");
        } else {
          snackbar(
            "success",
            "The card has been successfully added to favorites"
          );
        }

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        snackbar("error", error.message);
        console.error("API Error:", error);
      })
      .finally(() => setLoader(false));
  };

  return (
    <IconButton
      className="icon"
      aria-label="Like minimal photography"
      size="sm"
      variant="solid"
      color={isLike ? "danger" : "neutral"}
      sx={{
        position: "absolute",
        zIndex: 2,
        borderRadius: "50%",
        right: "1rem",
        scale: 1.5,
      }}
      onClick={like}
    >
      <Favorite className="like" />
    </IconButton>
  );
}
