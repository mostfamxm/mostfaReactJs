import "./App.css";
import { createContext, useEffect, useState } from "react";
import Navbar from "./components/header/Navbar";
import Router from "./Router";
import Loader from "./components/Loader";
import Footer from "./components/footer/Footer";
import { RoleType } from "./users/roletype";
import SnackbarCom from "./components/SnackbarCom";

export const GeneralContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [roleType, setRoleType] = useState(RoleType.none);
  const [snackbarText, setSnackbarText] = useState("");
  const [cards, setCards] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const snackbar = (text) => {
    setSnackbarText(text);
    setTimeout(() => setSnackbarText(""), 3 * 1000);
  };

  useEffect(() => {
    fetch(`https://api.shipap.co.il/clients/login`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then((data) => {
        setUser(data);
        setRoleType(RoleType.user);
        snackbar(`${data.firstName} logged!`);

        if (data.business) {
          setRoleType(RoleType.bussiness);
        } else if (data.admin) {
          setRoleType(RoleType.admin);
        }
      })
      .catch((err) => {
        setRoleType(RoleType.none);
        snackbar(err.message);
      })
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    console.log("RoleType", RoleType.bussiness);
  }, [roleType]);

  return (
    <GeneralContext.Provider
      value={{
        user,
        setUser,
        setLoader,
        roleType,
        setRoleType,
        cards,
        setCards,
        setIsDark,
        isDark,
        searchWord,
        setSearchWord,
      }}
    >
      <SnackbarCom>
        <Navbar />

        <Router />
        {loader && <Loader />}
        <Footer />
      </SnackbarCom>
    </GeneralContext.Provider>
  );
}

export default App;
