/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";

import { Link } from "react-router-dom";

function createData(
  First_Name,
  Last_Name,
  Location,
  Age,
  Phone,
  Gender,
  Address,
  Prescription,
  Dose,
  Physician_first_name,
  Physician_last_name,
  PhysicianNumber,
  Bill,
  Next_Visit,
  PhysicianID,
  PatientID,
  Visit_Date
) {
  return {
    First_Name,
    Last_Name,
    Location,
    Age,
    Phone,
    Gender,
    Address,
    Prescription,
    Dose,
    Physician_first_name,
    Physician_last_name,
    PhysicianNumber,
    Bill,
    Next_Visit,
    PhysicianID,
    PatientID,
    Visit_Date,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <Link to="/dashboard/editPatient_form" state={row}>
            <IconButton aria-label="expand row" size="small" title="Edit">
              <EditIcon fontSize="small" />
            </IconButton>
          </Link>
        </TableCell>
        <TableCell>{row.PatientID}</TableCell>
        <TableCell component="th" scope="row">
          {`${row.First_Name} ${row.Last_Name}`}
        </TableCell>
        <TableCell>{row.Location}</TableCell>
        <TableCell>{row.Age}</TableCell>
        <TableCell>{row.Phone}</TableCell>
        <TableCell>{row.Gender}</TableCell>
        <TableCell>{row.Address}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, m: 5 }}>
              <Typography variant="h6" gutterBottom component="div">
                Prescription and Physician Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Prescription</TableCell>
                    <TableCell>Dose</TableCell>
                    <TableCell>Physician name</TableCell>
                    <TableCell>Physician number</TableCell>
                    <TableCell>Bill</TableCell>
                    <TableCell>Physician Id</TableCell>
                    <TableCell>Visit date</TableCell>
                    <TableCell>Next visit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>{row.Prescription}</TableCell>
                  <TableCell>{row.Dose}</TableCell>
                  <TableCell>{`${row.Physician_first_name} ${row.Physician_last_name}`}</TableCell>
                  <TableCell>{row.PhysicianNumber}</TableCell>
                  <TableCell>{row.Bill}</TableCell>
                  <TableCell>{row.PhysicianID}</TableCell>
                  <TableCell>{row.Visit_Date}</TableCell>
                  <TableCell>{row.Next_Visit}</TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData(
    "first_name",
    "last_name",
    "Location",
    "Age",
    "Phone",
    "Gender",
    "Address",
    "Prescription",
    "Dose",
    "Physician_first_name",
    "Physician_last_name",
    "Physician Number",
    "Bill",
    "Next Visit",
    "Physician -ID",
    "Patient- ID",
    "Visit Date"
  ),
  createData(
    "first_name",
    "last_name",
    "Location",
    "Age",
    "Phone",
    "Gender",
    "Address",
    "Prescription",
    "Dose",
    "Physician_first_name",
    "Physician_last_name",
    "7894561230",
    "Bill",
    "Next Visit",
    "Physician -ID",
    "Patient- ID",
    "Visit Date"
  ),
];

export default function DataTable({ searchQuery }) {
  const filteredPatients = rows.filter((patient) => {
    const {
      First_Name,
      Last_Name,
      Location,
      Age,
      Phone,
      Gender,
      Address,
      Prescription,
      Dose,
      Physician_first_name,
      Physician_last_name,
      PhysicianNumber,
      Bill,
      Next_Visit,
      PhysicianID,
      PatientID,
      Visit_Date,
    } = patient;
    const lowerCaseQuery = String(searchQuery).toLowerCase();

    return (
      String(First_Name).toLowerCase().includes(lowerCaseQuery) ||
      String(Last_Name).toLowerCase().includes(lowerCaseQuery) ||
      String(Location).toLowerCase().includes(lowerCaseQuery) ||
      String(Age).toLowerCase().includes(lowerCaseQuery) ||
      String(Phone).toLowerCase().includes(lowerCaseQuery) ||
      String(Gender).toLowerCase().includes(lowerCaseQuery) ||
      String(Address).toLowerCase().includes(lowerCaseQuery) ||
      String(Prescription).toLowerCase().includes(lowerCaseQuery) ||
      String(Dose).toLowerCase().includes(lowerCaseQuery) ||
      String(Physician_first_name).toLowerCase().includes(lowerCaseQuery) ||
      String(Physician_last_name).toLowerCase().includes(lowerCaseQuery) ||
      String(PhysicianNumber).toLowerCase().includes(lowerCaseQuery) ||
      String(Bill).toLowerCase().includes(lowerCaseQuery) ||
      String(Next_Visit).toLowerCase().includes(lowerCaseQuery) ||
      String(PhysicianID).toLowerCase().includes(lowerCaseQuery) ||
      String(PatientID).toLowerCase().includes(lowerCaseQuery) ||
      String(Visit_Date).toLowerCase().includes(lowerCaseQuery)
    );
  });

  const [patientData, setPatientData] = React.useState([]);

  const getApiData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/dashboard/getAllDetails",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPatientData(data);
      } else {
        console.error("Failed to retrieve patient details");
      }
    } catch (error) {
      console.error("Error occurred while making the API call:", error);
    }
  };

  React.useEffect(() => {
    getApiData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell>Patient Id</TableCell>
            <TableCell>Patient name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientData?.data?.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
