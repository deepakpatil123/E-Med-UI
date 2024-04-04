"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import { Asterisk } from "../../components/forms/StylesnS";
import axiosApi from "@/utils/axiosApi";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import { enqueueSnackbar } from "notistack";
import { onKeyDown, numStyle } from "@/utils/Styles/StylesnS";

const RegisterNewEmp = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    name: "",
    gender: "",
    phone_num: "",
    email_id: "",
  });

  const auth: any = useAuth();

  const handleChange = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const config = {
        url: "/api/medical/registerEmployee",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth.user.token}`,
        },
        data: {
          ...formData,
        },
      };
      let response = await axiosApi(
        config.url,
        config.method,
        config.headers,
        config.data
      );

      if (response) {
        // alert("Employee registered succesfully");
        enqueueSnackbar("Employee registered succesfully", {
          autoHideDuration: 3000,
          variant: "success",
        });
        setFormData({
          user_name: "",
          name: "",
          gender: "",
          phone_num: "",
          email_id: "",
        });
      }
    } catch (error) {
      console.error(error, "Error! While creating employee");
    }
  };

  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          flexGrow: 1,
          p: 4,
          borderRadius: "5px",
        }}
        m={6}
      >
        <Box mb={3}>
          <Typography variant="h4">Register new employee</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="name"
                mb="5px"
              >
                User Name
              </Typography>
              <Asterisk />
              <CustomTextField
                placeholder="User Name (6 Digit Id)"
                value={formData.user_name}
                onChange={(e: any) => handleChange("user_name", e.target.value)}
                variant="outlined"
                type="number"
                sx={numStyle}
                onKeyDown={(e: any) => onKeyDown(e)}
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
                Employee Name
              </Typography>
              <Asterisk />
              <CustomTextField
                placeholder="Enter Name"
                value={formData.name}
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
                Gender
              </Typography>
              <Asterisk />
              <Select
                value={formData.gender}
                onChange={(e: any) => handleChange("gender", e.target.value)}
                size="small"
                fullWidth
              >
                <MenuItem disabled value="Select">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="Male">
                  <em>Male</em>
                </MenuItem>
                <MenuItem value="Female">
                  <em>Female</em>
                </MenuItem>
              </Select>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="name"
                mb="5px"
              >
                Contact
              </Typography>
              <Asterisk />
              <CustomTextField
                placeholder="Contact Number"
                value={formData.phone_num}
                onChange={(e: any) => handleChange("phone_num", e.target.value)}
                variant="outlined"
                type="number"
                sx={numStyle}
                onKeyDown={(e: any) => onKeyDown(e)}
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
                placeholder="Enter Email Id"
                value={formData.email_id}
                // onChange={(e: any) => handleChange("email_id", e.target.value)}
                onChange={(e: any) => {
                  const email = e.target.value;
                  handleChange("email_id", e.target.value);
                }}
                variant="outlined"
                type="email"
                fullWidth
                error={
                  !validateEmail(formData.email_id) && formData.email_id !== ""
                }
                helperText={
                  !validateEmail(formData.email_id) && formData.email_id !== ""
                    ? "Invalid email format"
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: "15px" }}>
            <Button
              sx={{ marginRight: "15px" }}
              type="submit"
              variant="contained"
              disabled={
                !formData.user_name ||
                !formData.name ||
                !formData.gender ||
                !formData.phone_num ||
                !formData.email_id ||
                !validateEmail(formData.email_id)
              }
            >
              Submit
            </Button>
            <Button
              onClick={() =>
                setFormData({
                  user_name: "",
                  name: "",
                  gender: "",
                  phone_num: "",
                  email_id: "",
                })
              }
              variant="outlined"
            >
              Clear
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default RegisterNewEmp;
