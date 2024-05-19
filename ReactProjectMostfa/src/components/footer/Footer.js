import { GeneralContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { BottomNavigationAction, Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import { useContext } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import PortraitIcon from "@mui/icons-material/Portrait";

export default function Footer() {
  const { user, roleType } = useContext(GeneralContext);
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        mt: 3,
        p: 2,
        position: "flex",
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        display: "block",
      }}
      elevation={3}
    >
      <BottomNavigation showLabels sx={{}}>
        <BottomNavigationAction
          label="About"
          icon={<InfoIcon />}
          onClick={() => navigate("/about")}
        />
        {user && (
          <BottomNavigationAction
            label="Favorites"
            icon={<FavoriteIcon />}
            onClick={() => navigate("/fav-cards")}
          />
        )}

        {user && roleType && (
          <BottomNavigationAction
            label="My Cards"
            icon={<PortraitIcon />}
            onClick={() => navigate("/my-cards")}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
}
