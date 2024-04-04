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
import axios from "axios";
import { BACKEND_BASE_URL } from "@/config";
import { enqueueSnackbar } from "notistack";
import { onKeyDown, numStyle } from "../../components/forms/StylesnS";

const ChangePass = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    oldPassword: "",
    password: "",
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

    const config = {
      url: `/api/medical/resetPassword`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${auth.user.token}`,
      },
      data: formData,
    };

    const response = await axiosApi(
      config.url,
      config.method,
      config.headers,
      config.data
    );
    if (response) {
      enqueueSnackbar("Password Updated Successfully", {
        autoHideDuration: 3000,
        variant: "success",
      });
    }
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
          <Typography variant="h4">Change Password</Typography>
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
                sx={numStyle}
              onKeyDown={(e:any)=>onKeyDown(e)}
                variant="outlined"
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
                Old Password
              </Typography>
              <Asterisk />
              <CustomTextField
                placeholder="Enter Old Password"
                value={formData.oldPassword}
                onChange={(e: any) =>
                  handleChange("oldPassword", e.target.value)
                }
                variant="outlined"
                type="password"
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
                New Password
              </Typography>
              <Asterisk />
              <CustomTextField
                value={formData.password}
                type="password"
                placeholder="New Password"
                onChange={(e: any) => handleChange("password", e.target.value)}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: "15px" }}>
            <Button
              sx={{ marginRight: "15px" }}
              type="submit"
              variant="contained"
            >
              Change Password
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ChangePass;
