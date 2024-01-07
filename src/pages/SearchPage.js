import { Helmet } from "react-helmet-async";
import * as React from "react";
import { Stack, Container, Typography } from "@mui/material";
import Searchbar from "../layouts/dashboard/header/Searchbar";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { useState } from "react";
import DataTable from "src/sections/DataTable/DataTable";

// components
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function SearchPage() {
  const [searchData, setSearchData] = useState([]);
  console.log("parent search data", searchData.row);

  const updateSearchData = (data) => {
    setSearchData(data);
  };

  return (
    <>
      <Helmet>
        <title> Search Patients | Bhumio </title>
      </Helmet>

      <Container>
        <Searchbar updateSearchData={updateSearchData} />

        <DataTable searchData={searchData.row} />
      </Container>
    </>
  );
}
