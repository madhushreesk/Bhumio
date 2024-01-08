import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Container, Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";

const steps = [
  {
    label: "Patients Details",
    description: "Enter Patient's Details here:",
    // fields: ['Patient Name (First, Last Name)', "Location", "Age", "Gender", "Phone", "Address"],
    fields: [
      "Patient ID",
      "Patient Name (First, Last Name)",
      "Location",
      "Age",
      "Gender",
      "Phone",
      "Address",
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

export default function EditPatientForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);

  const location = useLocation().state;

  React.useEffect(() => {
    const data = {
      "Patient Name (First, Last Name)": `${location?.First_Name} ${location?.Last_Name}`,
      Location: location?.Location,
      Age: location?.Age,
      Gender: location?.Gender,
      Phone: location?.Phone,
      Address: location?.Address,
      Prescription: location?.Prescription,
      Dose: location?.Dose,
      "Visit Date": location?.Visit_Date,
      "Next Visit": location?.Next_Visit,
      "Physician ID": location?.PhysicianID,
      "Physician Name (First, Last Name)": `${location?.Physician_first_name} ${location?.Physician_last_name}`,
      "Physician Number": location?.PhysicianNumber,
      Bill: location?.Bill,
      "Patient ID": location?.PatientID,
    };
    setFormData(data);
  }, [location]);

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

  // const handleReset = () => {
  //   setActiveStep(0);
  //   setFormData({});
  //   setErrors({});
  // };

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
  //   console.log(formData);
  const handleFinish = async () => {
    setOpen(true);
    setIsButtonDisabled(true);
    const fieldMapping = {
      "Patient Name (First, Last Name)": ["first_name", "last_name"],
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
        const [firstName, lastName] = formData[oldField].split(" ");
        renamedFormData[newField1] = firstName || "";
        renamedFormData[newField2] = lastName || "";
      } else {
        renamedFormData[oldField] = formData[oldField];
      }
    });

    console.log(renamedFormData);

    try {
      const response = await fetch(
        "http://localhost:4000/dashboard/editPatient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(renamedFormData),
        }
      );

      if (response.ok) {
        console.log("Patient details edited successfully!");
      } else {
        console.error("Failed to add patient details");
      }
    } catch (error) {
      console.error("Error occurred while making the API call:", error);
    }
  };

  return (
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
                          InputProps={{
                            // eslint-disable-next-line no-unneeded-ternary
                            readOnly:
                              fieldName === "Patient ID" ||
                              fieldName === "Physician ID"
                                ? true
                                : false,
                          }}
                          sx={{ mt: 2 }}
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
            <Typography>{`Want to update these details?`}</Typography>
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
                Patient Details Edited Successfully!
              </Alert>
            </Snackbar>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
