import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import MessageIcon from "@mui/icons-material/Message";
import SubtitlesOffIcon from "@mui/icons-material/SubtitlesOff";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
// import DashboardNew from "./components/shared/DashboardNew"
import { useEffect } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { BoxProps } from "@mui/material/Box";

type Props = {
  filecount?: number;
  filetype?: string | any;
  subtitle?: string;
  title?: "string" | any;
  titlecolor?: "string" | any;
  iconcolor?: string | any;
  backgroundcolor?: string | any;
  Icon: React.ComponentType;
};
function DashBoardBox2({
  filecount,
  filetype,
  backgroundcolor,
  iconcolor,
  titlecolor,
  Icon,
  subtitle,
}: Props) {
  function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          p: 1,
          // m: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "grey.100",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          ...sx,
        }}
        {...other}
      />
    );
  }
  return (
    <>
      <Item
        sx={{
          // display: "flex",
          py: 3,

          // width: "208px",
          backgroundColor: backgroundcolor,
        }}
      >
        <Box
          sx={{
            width: "100%",

            // border: "1px solid black",
          }}
        >
          {" "}
          <Box
            sx={{
              width: "fit-content",

              p: 1,

              display: "flex",
              justifyContent: "center",
              m: "auto",
              alignItems: "center",
              // border: "1px solid black",
              borderRadius: "50% ",
              backgroundColor: iconcolor,
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
              color: "white",
            }}
          >
            <Icon />
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            textAlign: "center",

            mt: 1.5,
            // border:"1px solid black"
          }}
        >
          <Typography
            sx={{
              fontSize: "32px",
              p: 2,
              pb: 1.5,
              fontWeight: "800",
            }}
          >
            {filecount}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              pl: 1,
              textAlign: "center",
            }}
          >
            {" "}
            {filetype}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              pl: 1,
              textAlign: "center",
              color: titlecolor,
            }}
          >
            {" "}
            ( {subtitle})
          </Typography>
        </Box>
      </Item>
    </>
  );
}

export default DashBoardBox2;
