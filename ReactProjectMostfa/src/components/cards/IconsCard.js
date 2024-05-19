import { CardActions, IconButton } from "@mui/joy";
import React, { useContext } from "react";
import RemoveCard from "../../business/RemoveCard";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { GeneralContext } from "../../App";
import AddFavoriteCard from "./AddFavoriteCard";
import { RoleType } from "../../users/roletype";
import { checkAllPermissions } from "../../users/permissions";

export default function IconsCard({ card }) {
  const { roleType } = useContext(GeneralContext);
  const navigate = useNavigate();

  const checkRoleType = checkAllPermissions(
    [RoleType.bussiness, RoleType.admin],
    [roleType]
  );
  const checkRoleTypeLike = checkAllPermissions(
    [RoleType.bussiness, RoleType.admin, RoleType.user],
    [roleType]
  );

  return (
    <CardActions sx={{ pt: 0, justifyContent: "space-between" }}>
      {checkRoleTypeLike && <AddFavoriteCard card={card} />}
      {checkRoleType && (
        <IconButton
          className="icon"
          aria-label="Edit card"
          size="sm"
          variant="solid"
          color="primary"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: "3.2rem",
          }}
          onClick={() =>
            navigate(`/business/cards/${card.id}`, { state: card })
          }
        >
          <EditIcon />
        </IconButton>
      )}
      {checkRoleType && (
        <IconButton
          className="icon"
          aria-label="Delete"
          size="sm"
          variant="solid"
          sx={{
            color: "#FBFCFE",
            backgroundColor: "#0B0D0E",
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: "5.4rem",
          }}
        >
          <RemoveCard card={card} />
        </IconButton>
      )}
    </CardActions>
  );
}
