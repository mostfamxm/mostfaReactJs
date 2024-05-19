import { RoleType } from "../users/roletype";

export const pages = [
  {
    route: "/about",
    title: "About",
    permissions: [
      RoleType.none,
      RoleType.user,
      RoleType.bussiness,
      RoleType.admin,
    ],
  },
  { route: "/signup", title: "Sign-Up", permissions: [RoleType.none] },
  { route: "/login", title: "Log-In", permissions: [RoleType.none] },
  {
    route: "/fav-cards",
    title: "Fav Cards",
    permissions: [RoleType.user, RoleType.bussiness, RoleType.admin],
  },
  {
    route: "/my-cards",
    title: "My Cards",
    permissions: [RoleType.bussiness, RoleType.admin],
  },
  { route: "/sandbox", title: "Sandbox", permissions: [RoleType.admin] },
];

export const settings = [
  {
    route: "/account",
    title: "profile",
    permissions: [RoleType.user, RoleType.bussiness, RoleType.admin],
  },
];
