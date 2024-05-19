import { useContext } from "react";
import { RoleType } from "./roletype";
import { GeneralContext } from "../App";
import { useNavigate } from "react-router-dom";
import { MenuItem, Typography } from "@mui/material";
import { useSnackbar } from "../components/SnackbarCom";

export default function Logout() {
  const { setLoader, setUser, setRoleType } = useContext(GeneralContext);
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const logout = () => {
    setLoader(true);

    fetch(`https://api.shipap.co.il/clients/logout`, {
      credentials: "include",
    })
      .then(() => {
        setUser();
        setRoleType(RoleType.none);
        navigate("/");
        setLoader(false);
        snackbar("warning", "The user has successfully logged out");
      })
      .finally(() => setLoader(false));
  };

  return (
    <MenuItem onClick={logout}>
      <Typography textAlign="center">Loguot</Typography>
    </MenuItem>
  );
}
