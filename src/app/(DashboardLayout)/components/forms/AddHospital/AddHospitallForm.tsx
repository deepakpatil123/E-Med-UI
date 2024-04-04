"use client";
import React, { useEffect, useState } from "react";
import {
  styled,
  Box,
  Paper,
  Grid,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import CustomTextField from "../theme-elements/CustomTextField";
import { Asterisk } from "../StylesnS";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import axiosApi from "@/utils/axiosApi";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { onKeyDown, numStyle } from "../StylesnS";

const ButtonDiv = styled(Button)({
  cursor: "pointer",
  textAlign: "center",
  border: "1px solid transparent",
  padding: "0.56rem, 1.375rem",
  // backgroundColor: "#08D419",
  // color: "white",
  marginBottom: "1rem",
  alignSelf: "start",
  // marginLeft: "8px",
  marginTop: "10px",
});

const AddHospitalForm = ({ onClose }: any) => {
  const auth: any = useAuth();

  const [formData, setFormData] = useState<any>({
    code: "",
    name: "",
    address: "",
    contact_person: "",
    contact_no: "",
    email: "",
    s_email: "",
    empanelled_for: "",
    nabh: "",
    is_active: "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const config = {
        url: `/api/medical/create_hospital`,
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.user.token}`,
        },
        data: formData,
      };

      let response = await axiosApi(
        config.url,
        config.method,
        config.headers,
        config.data
      );

      if (response) {
        // alert("Hospital Added Succesfully");
        enqueueSnackbar("Hospital Added Succesfully", {
          autoHideDuration: 3000,
          variant: "success",
        });
        setFormData(response.data);
      }
      onClose();
    } catch (error) {
      console.error(error);
      onClose();
    }
  };

  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <Box sx={{ flexGrow: 1, margin: "8px 20px" }}>
      <Box mb={2}>
        <Typography variant="h4">Add Hospital</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} columns={12}>
          <Grid item lg={6} xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Hospital Code
            </Typography>
            <Asterisk />
            <CustomTextField
              value={formData.code}
              required
              onChange={(e: any) => handleChange("code", e.target.value)}
              variant="outlined"
              type="text"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Name of Hospital
            </Typography>
            <Asterisk />
            <CustomTextField
              value={formData.name}
              required
              onChange={(e: any) => handleChange("name", e.target.value)}
              variant="outlined"
              type="text"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Hospital Address
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("address", e.target.value)}
              value={formData.address}
              variant="outlined"
              type="name"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Contact Person
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) =>
                handleChange("contact_person", e.target.value)
              }
              variant="outlined"
              value={formData.contact_person}
              type="text"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Contact Number
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("contact_no", e.target.value)}
              sx={numStyle}
              onKeyDown={(e: any) => onKeyDown(e)}
              variant="outlined"
              value={formData.contact_no}
              type="number"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Email ID
            </Typography>
            <Asterisk />
            <CustomTextField
              type="email"
              onChange={(e: any) => {
                const email = e.target.value;
                handleChange("email", email);
                if (!validateEmail(email)) {
                  // Do something when email is invalid
                }
              }}
              variant="outlined"
              value={formData.email}
              fullWidth
              error={!validateEmail(formData.email) && formData.email !== ""}
              helperText={
                !validateEmail(formData.email) && formData.email !== ""
                  ? "Invalid email format"
                  : ""
              }
            />
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Secondary Email
            </Typography>
            <Asterisk />
            <TextField
              size="small"
              onChange={(e) => {
                const s_email = e.target.value;
                handleChange("s_email", s_email);
                if (!validateEmail(s_email)) {
                  // Do something when email is invalid
                }
              }}
              variant="outlined"
              value={formData.s_email}
              type="email"
              fullWidth
              error={
                !validateEmail(formData.s_email) && formData.s_email !== ""
              }
              helperText={
                !validateEmail(formData.s_email) && formData.s_email !== ""
                  ? "Invalid email format"
                  : ""
              }
            />
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Empanelled for
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) =>
                handleChange("empanelled_for", e.target.value)
              }
              value={formData.empanelled_for}
              variant="outlined"
              type="text"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              NAHB
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("nabh", e.target.value)}
              value={formData.nabh}
              variant="outlined"
              type="text"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Status <Asterisk />
              </FormLabel>
              <RadioGroup
                row
                sx={{ display: "flex", alignItems: "center" }}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={formData.is_active}
                onChange={(e: any) => handleChange("is_active", e.target.value)}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Active"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Inactive"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          disabled={
            !formData.code ||
            !formData.name ||
            !formData.address ||
            !formData.contact_person ||
            !formData.contact_no ||
            !formData.email ||
            !formData.s_email ||
            !formData.empanelled_for ||
            !formData.nabh ||
            !formData.is_active ||
            !validateEmail(formData.s_email) ||
            !validateEmail(formData.email)
          }
          sx={{ mr: 1 }}
          type="submit"
          variant="contained"
        >
          Add
        </Button>
        <Button
          onClick={onClose}
          sx={{ mr: 2 }}
          variant="outlined"
          color="primary"
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default AddHospitalForm;
