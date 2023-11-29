import React, { useState } from "react";
import Cookies from "js-cookie";
import supabase from "@/config/supabaseClient";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Input,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const subgradeOptions = [
  "MX 13 equiv",
  "MX 12 equiv",
  "MX 11 equiv",
  "MX 10 equiv",
  "MX 9 equiv",
  "MX 8 equiv",
];

const SalaryForm = () => {
  // State for form data and other UI elements
  const [formData, setFormData] = useState([
    {
      subgrade: "",
      monthlySalary: "",
      annualFixedBonus: "",
      annualVarBonus: "",
      agency: "",
    },
  ]);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isSubmittedDialogOpen, setSubmittedDialogOpen] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.length < 6) {
      setFormError("Please fill in at least 6 rows with all fields correctly");
      return;
    }

    setConfirmationOpen(true);
  };

  // Function to handle form submission confirmation
  const handleConfirmationClose = (confirmed: any) => {
    setConfirmationOpen(false);

    if (confirmed) {
      // Perform form submission logic
      performFormSubmission();
      setSubmittedDialogOpen(true); // Open the submitted dialog
    }
  };

  // Function to handle form submission
  const performFormSubmission = async () => {
    // Validate if all fields are filled for each row
    const isInvalid = formData.some(
      (data) =>
        !data.subgrade ||
        !data.monthlySalary ||
        !data.annualFixedBonus ||
        !data.annualVarBonus ||
        !data.agency
    );

    if (isInvalid) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    // Map form data for insertion
    const dataToInsert = formData.map((data) => ({
      subgrade: data.subgrade,
      monthlySalary: parseInt(data.monthlySalary),
      annualFixedBonus: parseInt(data.annualFixedBonus),
      annualVarBonus: parseInt(data.annualVarBonus),
      agency: data.agency,
    }));

    // Perform the insertion into the database
    const { data, error } = await supabase
      .from("paychecked")
      .insert(dataToInsert);

    if (error) {
      console.error("Error inserting data:", error);
      setFormError("Please fill in all the fields correctly");
    } else {
      // Set a cookie indicating that the form has been submitted
      Cookies.set("hasSubmittedForm", "true");
      setSuccessMessage("Form submitted successfully");
    }
  };

  // Function to handle form field changes
  const handleChange = (field: any, value: any, rowIndex: any) => {
    setFormData((prevData) =>
      prevData.map((data, index) =>
        index === rowIndex ? { ...data, [field]: value } : data
      )
    );
  };

  // Function to add a new row to the form
  const handleAddRow = () => {
    setFormData((prevData) => [
      ...prevData,
      {
        subgrade: "",
        monthlySalary: "",
        annualFixedBonus: "",
        annualVarBonus: "",
        agency: "",
      },
    ]);
  };

  // Function to remove a row from the form
  const handleRemoveRow = (index: any) => {
    setFormData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Tooltip title="MX-equivalent" arrow>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      Subgrade
                      <InfoIcon style={{ marginLeft: 4 }} fontSize="small" />
                    </div>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="Theoretical Median" arrow>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      Monthly Base Salary
                      <InfoIcon style={{ marginLeft: 4 }} fontSize="small" />
                    </div>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="Theoretical Median" arrow>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      Annual Fixed Bonus
                      <InfoIcon style={{ marginLeft: 4 }} fontSize="small" />
                    </div>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="Theoretical Median for C Performance" arrow>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      Annual Variable Bonus
                      <InfoIcon style={{ marginLeft: 4 }} fontSize="small" />
                    </div>
                  </Tooltip>
                </TableCell>
                <TableCell>Name of Agency </TableCell>
                <TableCell>Add/Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel id={`subgrade-label-${index}`}>
                        Subgrade:
                      </InputLabel>
                      <Select
                        labelId={`subgrade-label-${index}`}
                        id={`subgrade-${index}`}
                        value={data.subgrade}
                        onChange={(e) =>
                          handleChange("subgrade", e.target.value, index)
                        }
                      >
                        {subgradeOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    {/* Add an Input element for Monthly Base Salary */}
                    <Input
                      type="number"
                      placeholder="Monthly Base Salary"
                      value={data.monthlySalary}
                      onChange={(e) =>
                        handleChange("monthlySalary", e.target.value, index)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {/* Add an Input element for Annual Fixed Bonus */}
                    <Input
                      type="number"
                      placeholder="Annual Fixed Bonus"
                      value={data.annualFixedBonus}
                      onChange={(e) =>
                        handleChange("annualFixedBonus", e.target.value, index)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {/* Add an Input element for Annual Variable Bonus */}
                    <Input
                      type="number"
                      placeholder="Annual Variable Bonus"
                      value={data.annualVarBonus}
                      onChange={(e) =>
                        handleChange("annualVarBonus", e.target.value, index)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {/* Add an Input element for Name of Agency */}
                    <Input
                      type="text"
                      placeholder="Name of Agency"
                      value={data.agency}
                      onChange={(e) =>
                        handleChange("agency", e.target.value, index)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemoveRow(index)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Form action buttons */}
        <div style={{ marginTop: "20px" }}>
          <Button variant="contained" color="primary" onClick={handleAddRow}>
            Add Row
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginLeft: "10px" }}
          >
            Submit
          </Button>
        </div>
      </form>
      {/* Success message and error display */}
      <>
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage("")}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setSuccessMessage("")}
            severity="success"
          >
            {successMessage}
          </MuiAlert>
        </Snackbar>
        {formError && <p className="error">{formError}</p>}
      </>

      {/* Confirmation dialog */}
      <Dialog
        open={isConfirmationOpen}
        onClose={() => handleConfirmationClose(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to submit the form?</DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleConfirmationClose(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={() => handleConfirmationClose(true)} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Submitted dialog */}
      {isSubmittedDialogOpen && (
        <Dialog
          open={isSubmittedDialogOpen}
          onClose={() => setSubmittedDialogOpen(false)}
        >
          <DialogTitle>Submitted!</DialogTitle>
          <DialogContent>
            Your form has been submitted successfully. Please refresh page.
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setSubmittedDialogOpen(false)}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default SalaryForm;


