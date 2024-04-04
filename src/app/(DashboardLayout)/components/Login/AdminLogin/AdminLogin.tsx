"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import RefreshIcon from "@mui/icons-material/Refresh";

import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Select,
  MenuItem,
  Typography,
  styled,
  TextField,
  Tooltip,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import axiosApi from "@/utils/axiosApi";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";

const emailValidationRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const mobileValidationRegex =
  /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/;

function AdminLogin({ back }: any) {
  const auth:any = useAuth();
  const router = useRouter();
  const [branch, setBranch] = useState<any>("all");
  const [userName, setUserName] = useState<any>("");
  const [inputCaptcha, setInputCaptcha] = useState<any>("");
  const [captchaCode, SetCaptchaCode] = useState<any>("");
  const [allUser, setAllUser] = useState<any>([]);
  const [tryagain, setTryagain] = useState<any>(false);
  const [password, setPassword]: any = useState(null);
  const [toast, setToast] = useState<any>({
    open: false,
    severity: "",
    message: "",
  });
  // const [alert, setAlert]:any = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const refreshCapcha = () => {
    SetCaptchaCode(Math.random().toString(36).substr(2, 6));
  };
  useEffect(() => {
    SetCaptchaCode(Math.random().toString(36).substr(2, 6));
  }, []);

  const loginUser = async () => {
    if (password == "" || inputCaptcha == "") {
      SetCaptchaCode(Math.random().toString(36).substr(2, 6));

      enqueueSnackbar("Please fill all fields", {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    } else if (captchaCode !== inputCaptcha) {
      // setLoading(true);

      SetCaptchaCode(Math.random().toString(36).substr(2, 6));

      enqueueSnackbar("Please Enter Correct Captcha", {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    }

    const res: any = await auth.signInAdmin(userName, password, "admin");

    if (res.success) {
      enqueueSnackbar(res.message, {
        autoHideDuration: 3000,
        variant: "success",
      });
    } else {
      enqueueSnackbar(res?.error, {
        autoHideDuration: 3000,
        variant: "error",
      });
    }
  };

  async function getData() {
    try {
      const url = "/api/medical/getAllRole";
      const method = "GET";
      const headers = {
        "Content-Type": "application/json",
      };
      const posts = await axiosApi(url, method, headers);

      setAllUser([...posts.data]);
      if (posts.success != true || !posts) {
        console.log("Bad Request");
      } else {
        console.log("200");
      }
    } catch (error) {
      console.error("Error fetching ", error);
    }
  }

  const Heading1 = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(1),
    color: "black",
    fontFamily: "Nunito, sans-serif",
    lineHeight: "41.72px",
    fontWeight: 700,
  }));

  const LoginButton = styled(Button)`
    width: auto;
    height: auto;

    background: #e15a11;
    font-weight: 600;
    font-family: "Nunito", sans-serif;
    font-size: 20px;
    box-shadow: 0px 0px 19px -10px rgba(215, 215, 215, 0.25);
    color: white;
    &:hover {
      background-color: #e15a11;
    }
  `;

  const ResendOTP = styled(Typography)`
    width: 150px;
    height: 22px;
    font-family: "Nunito", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 22px;
    text-decoration-line: underline;
    color: #1e88e5;
    cursor: pointer;
    margin: auto;
    text-align: center;
    justify-content: center;
  `;

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const userNameOptions = allUser || ["select Branch !!!"];
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          background: "#000000b3",
          width: "100%",
          height: "100vh",

          borderRadius: "0",
          color: "#ffffff",
          padding: "40px",
          zIndex: "777",
        }}
      >
        <Button onClick={back}>Back</Button>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src="/GovLogo__2_.png" width={50} height={70} alt={""} />
        </Box>

        <Box
          sx={{
            // flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Heading1
            sx={{
              color: "#fff900",
              lineHeight: "28px",
              fontSize: {
                xs: "11.26",
                sm: "11.26",
                md: "15.26px",
                lg: "17.26px",
                xl: "17.26px",
              },
            }}
          >
            UNION PUBLIC SERVICE COMMISSION
          </Heading1>
        </Box>
        <Typography
          sx={{
            letterSpacing: "0em",
            textAlign: "center",
            lineHeight: "30px",

            justifyContent: "center",
          }}
        >
          (ONLINE MEDICAL BILL PORTAL)
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Nunito",
              fontSize: "20px",
              fontWeight: "600",
              lineHeight: "19px",
              letterSpacing: "0em",
              textAlign: "center",
              justifyContent: "center",
              marginTop: "7px",
              mb: 1,
              color: "#fff900",
            }}
          >
            Admin Login
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ lineHeight: "9px" }}>
            Branch
          </Typography>

          <Select
            sx={{
              width: "100%",
              background: "white",
              color: "black",
              marginBottom: "8px",
              mt: 1,
            }}
            size="small"
            value={branch}
            // name='branch'
            inputProps={{ "aria-label": "Without label" }}
            onChange={(e: any) => {
              setBranch(e.target.value);
              setUserName("");
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Administration">Administration</MenuItem>
            <MenuItem value="Super Access">Super Access</MenuItem>
          </Select>

          <Typography variant="body1" sx={{ lineHeight: "9px", mt: 1 }}>
            User Name
          </Typography>
          <Select
            sx={{
              width: "100%",
              background: "white",
              color: "black",
              marginBottom: "8px",
              mt: 1,
            }}
            size="small"
            value={userName}
            inputProps={{ "aria-label": "Without label" }}
            onChange={(e: any) => {
              setUserName(e.target.value);
            }}
          >
            {branch == "Administration"
              ? userNameOptions
                  ?.slice(0, 17)
                  .map((option: any, index: number) => (
                    <MenuItem key={index} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))
              : branch == "Super Access"
              ? userNameOptions?.slice(17).map((option: any, index: number) => (
                  <MenuItem key={index} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))
              : userNameOptions?.map((option: any, index: number) => (
                  <MenuItem key={index} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
          </Select>

          <Typography variant="body1" sx={{ lineHeight: "9px", mt: 1 }}>
            Password
          </Typography>

          <OutlinedInput
            // id="outlined-adornment-weight"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            size="small"
            value={password}
            sx={{
              width: "100%",
              background: "white",
              marginBottom: "8px",
              mt: 2,
            }}
            onChange={(e: any) => setPassword(e.target.value)}
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
          <Box
            sx={{
              width: "500px",
              display: "flex",
              justifyContent: "space-between",
              mt: "10px",
            }}
          >
            <OutlinedInput
              id="outlined-basic"
              placeholder="Enter Captcha"
              autoComplete="off"
              // variant="outlined"
              type="text"
              size="small"
              onPaste={(event: any) => {
                event.preventDefault();
                return false;
              }}
              onDrop={(event: any) => {
                event.preventDefault();
                return false;
              }}
              onKeyDown={(event: any) => {
                if (event.key == "Enter") {
                  // handleLogin()
                }
              }}
              value={inputCaptcha}
              sx={{ width: "50%", backgroundColor: "white" }}
              onChange={(event: any) => {
                setInputCaptcha(event.target.value);
              }}
              inputProps={{
                style: {
                  height: "45px",
                  padding: "0 14px",
                },
              }}
            ></OutlinedInput>

            <Box
              sx={{
                width: "45%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  fontWeight: 600,
                  height: "100%",
                  width: "80%",
                  backgroundColor: "grey",
                  color: "white",
                  borderRadius: "4px",
                  cursor: "not-allowed",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    p: 1.2,
                    fontSize: "20px",
                    width: "fit-content",
                    margin: "auto",
                    height: "45px",
                    color: "white",
                    borderRadius: "4px",
                    cursor: "not-allowed",
                  }}
                  fontFamily="Nunito"
                >
                  {captchaCode}
                </Typography>
              </Box>
              <Tooltip title="Refresh Captcha">
                <RefreshIcon
                  onClick={refreshCapcha}
                  sx={{
                    fontSize: "33px",
                    color: "#E15A11",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
          <LoginButton
            onClick={loginUser}
            size="small"
            sx={{ fontSize: "15px", py: 1, width: "100%", mt: 2 }}
          >
            Login
          </LoginButton>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "auto",
              color: "#ffffff",
            }}
          >
            <ResendOTP
              sx={{
                color: "#ffffff",
                fontSize: "12px",
                textDecoration: "none",
                mt: 1,
              }}
              variant="body1"
              onClick={() => {
                router.push("/AdminLogin/Forgot");
              }}
            >
              Forgot Password ?
            </ResendOTP>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLogin;
