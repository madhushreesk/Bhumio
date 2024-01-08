/* eslint-disable camelcase */
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import * as React from "react";

// @mui
import { Stack, Container, Typography } from "@mui/material";
import Searchbar from "src/layouts/dashboard/header/Searchbar";

import DataTable from "../sections/DataTable/DataTable";

export default function EditPage() {
  // const [open, setOpen] = useState(null);
  const [patientData, setPatientData] = React.useState([]);
  const updateSearchData = (data) => {
    setSearchData(data);
  };
  const [searchData, setSearchData] = useState([]);
  console.log("parent search data", searchData);

  const getApiData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/dashboard/getAllDetails",
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

        <DataTable searchData={patientData} page={"edit"} />
      </Container>
    </>
  );
}
