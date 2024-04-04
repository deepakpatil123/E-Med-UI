"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import { Asterisk } from "../../components/forms/StylesnS";
import axiosApi from "@/utils/axiosApi";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import { enqueueSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePass = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
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

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const config = {
      url: `/api/medical/changePassword`,
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
      router.push("/dashboard");
      setFormData({
        user_name: "",
        oldPassword: "",
        password: "",
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
          boxShadow:"0 10px 10px 20px rgb(176 184 214 / 9%),2px -4px 10px -5px #b0b8d6"
        }}
        m={6}
      >
        <Box mb={3}>
          <Typography variant="h5">Change Password</Typography>
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
              {/* <CustomTextField
                placeholder="User Name (6 Digit Id)"
                value={formData.user_name}
                onChange={(e: any) => handleChange("user_name", e.target.value)}
                variant="outlined"
                type="number"
                fullWidth
              /> */}
              <OutlinedInput
                // id="outlined-adornment-weight"
                type="number"
                placeholder="User Name (6 Digit Id)"
                size="small"
                value={formData.user_name}
                sx={{
                  width: "100%",
                  background: "white",
                  marginBottom: "8px",
                  mt: 2,
                }}
                onChange={(e: any) => handleChange("user_name", e.target.value)}
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
              {/* <CustomTextField
                value={formData.oldPassword}
                type="password"
                placeholder=" Enter Old Password"
                onChange={(e: any) =>
                  handleChange("oldPassword", e.target.value)
                }
                size="small"
                fullWidth
              /> */}
              <OutlinedInput
                // id="outlined-adornment-weight"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Old Password"
                size="small"
                value={formData.oldPassword}
                sx={{
                  width: "100%",
                  background: "white",
                  marginBottom: "8px",
                  mt: 2,
                }}
                onChange={(e: any) =>
                  handleChange("oldPassword", e.target.value)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
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
                New Password
              </Typography>
              <Asterisk />
              {/* <CustomTextField
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e: any) => handleChange("password", e.target.value)}
                variant="outlined"
                type="password"
                fullWidth
              /> */}
              <OutlinedInput
                // id="outlined-adornment-weight"
                type={showPassword2 ? "text" : "password"}
                placeholder="Enter New Password"
                size="small"
                value={formData.password}
                sx={{
                  width: "100%",
                  background: "white",
                  marginBottom: "8px",
                  mt: 2,
                }}
                onChange={(e: any) => handleChange("password", e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {!showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
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
