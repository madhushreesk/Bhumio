/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Container, Grid, TextField } from "@mui/material";
import { useState } from "react";
import IDGenerater from "../../utils/IdGenerater";
import { useEffect } from "react";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";

const steps = [
  {
    label: "Patients Details",
    description: "Enter Patient's Details here:",
    fields: [
      "Patient Name (First, Last Name)",
      "Location",
      "Age",
      "Gender",
      "Phone",
      "Address",
      "Patient ID",
    ],
  },
  {
    label: "Prescription Related Details",
    description: "Enter Patient's Prescription Details here:",
    fields: ["Prescription", "Dose", "Visit Date", "Next Visit"],
  },
  {
    label: "Physician Details",
    description: "Enter Physician Details here:",
    fields: [
      "Physician ID",
      "Physician Name (First, Last Name)",
      "Physician Number",
      "Bill",
    ],
  },
];

export default function PatientForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({});

  const getAutoDetails = async () => {
    const max = 500;
    const DrId = await IDGenerater(Math.floor(Math.random() * max), "dr");
    const PatientID = await IDGenerater(
      Math.floor(Math.random() * max),
      "a12kj"
    );
    formData["Physician ID"] = DrId || "";
    formData["Patient ID"] = PatientID || "";
  };

  useEffect(() => {
    getAutoDetails();
  }, []);

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (validateFields()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setIsButtonDisabled(true);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (event, fieldName) => {
    const { value } = event.target;

    if (
      fieldName === "Age" ||
      fieldName === "Phone" ||
      fieldName === "Physician Number"
    ) {
      if (fieldName === "Age" && Number.isNaN(Number(value))) {
        setErrors({
          ...errors,
          [fieldName]: `${fieldName} should contain only numbers.`,
        });
        return;
      }
      if (
        (fieldName === "Phone" || fieldName === "Physician Number") &&
        Number.isNaN(Number(value))
      ) {
        setErrors({
          ...errors,
          [fieldName]: `${fieldName} should contain only numbers.`,
        });

        return;
      }
    }
    // Handle invalid input for 'field1' (e.g., show an error message)
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const validateFields = () => {
    const newErrors = {};
    let isValid = true;

    steps[activeStep].fields.forEach((fieldName) => {
      if (!formData[fieldName]) {
        newErrors[fieldName] = "This field is required.";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };
  // console.log(formData);

  const handleFinish = async () => {
    setOpen(true);
    setIsButtonDisabled(true);
    const fieldMapping = {
      "Patient Name (First, Last Name)": ["First_Name", "Last_Name"],
      "Physician Name (First, Last Name)": [
        "Physician_first_name",
        "Physician_last_name",
      ],
      "Patient ID": ["PatientID"],
      "Physician ID": ["PhysicianID"],
      "Next Visit": ["Next_Visit"],
      "Physician Number": ["PhysicianNumber"],
      "Visit Date": ["Visit_Date"],
    };

    const renamedFormData = {};

    Object.keys(formData).forEach((oldField) => {
      if (fieldMapping[oldField]) {
        const [newField1, newField2] = fieldMapping[oldField];
        const [First_Name, Last_Name] = formData[oldField].split(" ");
        renamedFormData[newField1] = First_Name || "";
        renamedFormData[newField2] = Last_Name || "";
      } else {
        renamedFormData[oldField] = formData[oldField];
      }
    });

    console.log("Renamed data", renamedFormData);

    // Now, make the API call
    try {
      console.log("try 1");
      const response = await fetch(
        "https://teal-fuzzy-mackerel.cyclic.app/dashboard/addPatients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(renamedFormData),
        }
      );
      console.log("try 2");
      if (response.ok) {
        console.log("Patient details added successfully!");
      } else {
        console.error("Failed to add patient details");
      }
    } catch (error) {
      console.error("Error occurred while making the API call:", error);
    }
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical" sx={{ ml: 5 }}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <form>
                {/* <Container sx={{ display: "flex", flexDirection: ["column", "column", 'row'], justifyContent: "center", alignItems: "center" }}> */}

                <Grid container spacing={2}>
                  {" "}
                  {/* Use Grid container */}
                  {step.fields.map((fieldName) => (
                    <Grid item xs={4} key={fieldName}>
                      {" "}
                      {/* Define the number of items in one line */}
                      <TextField
                        id={fieldName}
                        label={fieldName}
                        variant="outlined"
                        value={formData[fieldName] || ""}
                        onChange={(event) =>
                          handleInputChange(event, fieldName)
                        }
                        sx={{ mt: 2 }}
                        InputProps={{
                          readOnly:
                            fieldName === "Patient ID" ||
                            fieldName === "Physician ID"
                              ? true
                              : false,
                        }}
                      />
                      <Typography style={{ color: "red" }}>
                        {errors[fieldName]}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>

                {/* </Container> */}
              </form>
              <Box sx={{ mb: 2 }}>
                <Container>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </Container>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>{`Want to save these details?`}</Typography>
          <Button
            onClick={handleBack}
            disabled={isButtonDisabled}
            sx={{ mt: 1, mr: 1 }}
          >
            Back
          </Button>
          <Button
            onClick={handleFinish}
            sx={{ mt: 1, mr: 1 }}
            variant="contained"
            disabled={isButtonDisabled}
          >
            Save
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
          >
            <Alert
              onClose={() => setOpen(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Patient data added successfully!
            </Alert>
          </Snackbar>
        </Paper>
      )}
    </Box>
  );
}
