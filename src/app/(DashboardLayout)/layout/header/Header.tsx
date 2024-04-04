"use client";
import React, { useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import Link from "next/link";
import Profile from "./Profile";
import Image from "next/image";
import { IconBellRinging, IconMenu } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const auth: any = useAuth();
  const router = useRouter();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
      boxShadow:"0 10px 10px 20px rgb(176 184 214 / 9%), 10px 10px 15px -5px #b0b8d6",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  // useEffect(() => {
  //   if (!auth.isAuthenticated) router.push("/");
  // }, [auth, router]);

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",              
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
          {/* <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge> */}
        </IconButton>
        <Box flexGrow={1}>{/* <h1>E-medical</h1> */}</Box>

        <Stack spacing={1} direction="row" alignItems="end">
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
