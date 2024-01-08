import { Helmet } from "react-helmet-async";
import * as React from "react";
import { Container } from "@mui/material";
import Searchbar from "../layouts/dashboard/header/Searchbar";
import { useState } from "react";
import DataTable from "src/sections/DataTable/DataTable";

export default function SearchPage() {
  const [searchData, setSearchData] = useState([]);
  // console.log("parent search data", searchData);

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

        <DataTable searchData={searchData} page={"search"} />
      </Container>
    </>
  );
}
