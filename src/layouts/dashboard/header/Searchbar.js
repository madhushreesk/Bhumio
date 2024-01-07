import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
import {
  Input,
  Slide,
  Button,
  IconButton,
  InputAdornment,
  ClickAwayListener,
} from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// component
import Iconify from "../../../components/iconify";
import DataTable from "src/sections/DataTable/DataTable";
import SearchPage from "src/pages/SearchPage";

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled("div")(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: 0,
  left: ["0%", "0%", "19%"],
  zIndex: 9119,
  width: ["100%", "100%", "80%"],
  display: "flex",
  position: "absolute",
  alignItems: "center",
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up("md")]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar({ updateSearchData }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/dashboard/search?search=${searchQuery}`,
        {
          method: "GET",
          headers: {},
        }
      );

      if (response.ok) {
        const res = await response.json();
        setSearchData(res);
        console.log("Child Search result", res);
        updateSearchData(res);
      } else {
        console.error("Failed to Search");
      }
    } catch (error) {
      console.error("Error occurred while making the API call:", error);
    }
  };

  return (
    <ClickAwayListener onClickAway={() => handleClose(false)}>
      <div>
        {!open && (
          <Button variant="outlined" onClick={() => setOpen(!open)}>
            Search
            <IconButton>
              <Iconify icon="eva:search-fill" />
            </IconButton>
          </Button>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: "fontWeightBold" }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => handleSearch()}
              // onClick={handleClose}
            >
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
