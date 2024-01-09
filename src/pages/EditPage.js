/* eslint-disable camelcase */
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import * as React from "react";

// @mui
import { Stack, Container, Typography } from "@mui/material";
import Searchbar from "src/layouts/dashboard/header/Searchbar";

import DataTable from "../sections/DataTable/DataTable";

export default function EditPage() {
  const [patientData, setPatientData] = React.useState([]);
  const updateSearchData = (data) => {
    setSearchData(data);
  };
  const [searchData, setSearchData] = useState([]);
  console.log("parent search data", searchData);
  console.log("search data. length", searchData?.data?.length);

  const getApiData = async () => {
    try {
      const response = await fetch(
        "https://teal-fuzzy-mackerel.cyclic.app/dashboard/getAllDetails",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPatientData(data);
      }
    } catch (error) {
      console.error("Error occurred while making the API call:", error);
    }
  };

  React.useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      <Helmet>
        <title> Edit Patients | Bhumio </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Edit Patients
          </Typography>
        </Stack>

        <Searchbar updateSearchData={updateSearchData} />
        {searchData?.data?.length > 0 ? (
          <DataTable searchData={searchData} page={"edit"} />
        ) : (
          <DataTable searchData={patientData} page={"edit"} />
        )}
      </Container>
    </>
  );
}
