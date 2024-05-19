import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { GeneralContext } from "../../App";

export const search = (searchWord, ...values) => {
  const str = values.join("").toLowerCase();
  const word = searchWord.toLowerCase();

  return str.includes(word);
};

export default function SearchBar() {
  const { searchWord, setSearchWord } = useContext(GeneralContext);

  return (
    <Box x={{ display: { xs: "inline-flex", md: "none" } }}>
      <FormControl variant="standard">
        <OutlinedInput
          value={searchWord}
          onChange={(ev) => setSearchWord(ev.target.value)}
          id="search"
          sx={{ backgroundColor: "#e3f2fd" }}
          placeholder="Search"
          size="small"
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}
