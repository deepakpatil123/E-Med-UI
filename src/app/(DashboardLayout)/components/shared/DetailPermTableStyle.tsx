import { Box, styled, Typography, Button, Dialog } from "@mui/material";

const MainBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  // margin: "10px",
  justifyContent: "space-around",
  gap: "10px",
});

const LeftBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "space-around",
  flex: "0.5",
  backgroundColor: "white",
  borderRadius: "10px",
  padding: "20px",
});

const RightBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  flex: 1,
  backgroundColor: "white",
  borderRadius: "10px",
  flexDirection: "column", // Change flexDirection to column
  gap: "10px", // Add gap property for spacing between pairs
  padding: "20px",
  width: "100%",
});

const DetailBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  backgroundColor: "#F6F7FE",
  borderRadius: "5px",
  padding: "5px",
  flexDirection: "column",
});

const InsideDiv = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "start",
  flex: "1",
  width: "100%",
  gap: "10px",

  // border: "1px solid gray",
});

const Bold = styled(Typography)({
  fontSize: "14px",
  color: "#212529",
  fontWeight: 800,
  marginTop: "10px",
  marginLeft: "8px",
});

const ExtraBold = styled(Typography)({
  fontSize: "15px",
  color: "#212529",
  fontWeight: 800,
  marginTop: "10px",
  marginLeft: "8px",
});

const Light = styled(Typography)({
  fontSize: "14px",
  margin: "10px",
  display: "flex",
  flexWrap: "wrap",
});

export {
  Light,
  Bold,
  ExtraBold,
  InsideDiv,
  DetailBox,
  RightBox,
  LeftBox,
  MainBox,
};
