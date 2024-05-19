import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { GeneralContext } from "../../App";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Button } from "@mui/joy";
import SearchBar from "./SearchBar";
import { pages, settings } from "../../pages/pagesRoutes";
import { checkPermissions } from "../../users/permissions";
import AdbIcon from "@mui/icons-material/Adb";
import Logout from "../../users/Logout";

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, roleType, isDark, setIsDark } = useContext(GeneralContext);
  const navigate = useNavigate();
  const path = useResolvedPath().pathname;

  const handledark = () => {
    setIsDark((prevIsDark) => !prevIsDark);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  console.log(roleType);
  return (
    <AppBar
      position="static"
      sx={{
        flexGrow: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <AdbIcon
          sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          onClick={() => navigate("/")}
        />
        <Typography
          variant="h4"
          component="a"
          onClick={() => {
            navigate("/");
          }}
          sx={{
            display: { xs: "none", md: "inline-flex" },
            marginRight: 2,
            fontFamily: "fantasy",
          }}
        >
          Bcard
        </Typography>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            onClick={handleOpenNavMenu}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {/* תפריט המבורגר */}
            {pages
              ?.filter(
                (p) =>
                  !p.permissions || checkPermissions(p.permissions, roleType)
              )
              ?.map((page) => (
                <Link
                  to={page.route}
                  key={page.route}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem key={page.route} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
          </Menu>
        </Box>
        {/* תפריט עליון */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages
            .filter(
              (p) => !p.permissions || checkPermissions(p.permissions, roleType)
            )
            .map((page) => (
              <Link
                to={page.route}
                key={page.route}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    backgroundColor:
                      page.route === path ? "cornflowerblue" : "#1976D2",
                  }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
        </Box>
        <Box x={{ display: { xs: "inline-flex", md: "none" } }}>
          <SearchBar />
        </Box>
        <IconButton onClick={handledark} sx={{ p: 1, paddingLeft: 2 }}>
          {isDark ? <LightMode /> : <DarkMode />}
        </IconButton>
        {user && (
          <Box sx={{ flexGrow: 0, p: 1 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.fullName} src={user.imgUrl} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link
                  to={setting.route}
                  key={setting.route}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{user.fullName}</Typography>
                  </MenuItem>
                </Link>
              ))}
              <Logout />
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
