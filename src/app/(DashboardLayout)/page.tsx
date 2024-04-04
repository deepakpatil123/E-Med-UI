"use client";
import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import AdminLogin from "./components/Login/AdminLogin/AdminLogin";
import EmpLogin from "./components/Login/EmpLogin/EmpLogin";
import Image from "next/image";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Dashboard = () => {
  const auth: any = useAuth();
  const router: any = useRouter();

  const [Emp, setEmp] = React.useState(false);
  const [Admin, setAdmin] = React.useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) router.push("/");
  }, [auth, router]);

  const handleEmpLogin = () => {
    setEmp(true);
    setAdmin(false);
  };

  const handleAdminLogin = () => {
    setEmp(false);
    setAdmin(true);
  };

  const handleClickBack = () => {
    setAdmin(false);
    setEmp(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          width: "auto",
          height: "100vh",
          backgroundImage: `url(/Banner.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {!Emp && !Admin && (
          <Box
            sx={{
              background: "#000000b3",
              width: "auto",
              height: "100vh",
              borderRadius: "0",
              color: "#ffffff",
              padding: "40px",
              zIndex: "777",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image src="/GovLogo__2_.png" width={50} height={70} alt={""} />
            </Box>

            <Box
              sx={{
                // flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    mt: 2,
                    color: "#fff900",
                    lineHeight: "30px",
                  }}
                >
                  UNION PUBLIC SERVICE COMMISSION
                </Typography>
              </Box>
              <Typography
                sx={{
                  letterSpacing: "0em",
                  textAlign: "center",
                  lineHeight: "30px",

                  justifyContent: "center",
                }}
              >
                (E-Medical Login)
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
                mt={10}
              >
                <Button
                  sx={{
                    width: "200px",
                  }}
                  variant="contained"
                  onClick={handleEmpLogin}
                >
                  <PermIdentityIcon />

                  <Typography>Employee Login</Typography>
                </Button>
                <Button variant="contained" onClick={handleAdminLogin}>
                  <AdminPanelSettingsIcon />
                  <Typography>Admin Login</Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {Emp && <EmpLogin back={handleClickBack} />}

        {Admin && <AdminLogin back={handleClickBack} />}
      </Box>
    </>
  );
};

export default Dashboard;
