import { Box, Button, Typography } from "@mui/material";
import FileMovement from "../FileMovement/FileMovement";
import React from "react";
import {
  Bold,
  DetailBox,
  InsideDiv,
  Light,
  MainBox,
  RightBox,
  ExtraBold,
} from "./DetailPermTableStyle";

const DetailPermTable = (props: any) => {
  const { onClose, permissionData } = props;
  return (
    <>
      <Button
        variant="contained"
        color="error"
        style={{
          position: "absolute",
          top: "0",
          right: "0",
        }}
        onClick={onClose}
      >
        X
      </Button>
      <Box
        mb={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Typography variant="h4">Permission Details</Typography>
      </Box>
      <MainBox>
        <RightBox>
          <InsideDiv></InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>Name :</Bold>
              <Light>{permissionData.employee.name}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Designation :</Bold>
              <Light>{permissionData.employee.designation}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>CGHS NO :</Bold>
              <Light>{permissionData.employee.CGHS_card_number}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Family Member Name :</Bold>
              <Light>{permissionData.family_member_name}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>Relation :</Bold>
              <Light>{permissionData.relation}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Current Status :</Bold>
              <Light>{permissionData.currentStatus}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>Basic Pay :</Bold>
              <Light>{permissionData.employee.basic_pay}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Created On:</Bold>
              <Light>{permissionData.createdAt.slice(0, 10)}</Light>
            </DetailBox>
          </InsideDiv>

          <InsideDiv>
            {permissionData.pathiological_test.map((test: any,index:any) => (
              <DetailBox
              key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ExtraBold>Pathiological Tests:</ExtraBold>
                <DetailBox sx={{ padding: 0, marginTop: 1 }}>
                  <Bold>Name of Pathiological Test:</Bold>
                  <Light>{test.name_of_pathological_test}</Light>
                </DetailBox>
                <DetailBox sx={{ padding: 0, marginTop: 1 }}>
                  <Bold>Name of Hospital:</Bold>
                  <Light>{test.name_of_phospital}</Light>
                </DetailBox>
                <DetailBox sx={{ padding: 0, marginTop: 1 }}>
                  <Bold>Prescribed By:</Bold>
                  <Light>{test.prescribed_pby}</Light>
                </DetailBox>
              </DetailBox>
            ))}

            {permissionData.radiological_test[0].name_of_radiological_test &&
              permissionData.radiological_test.map((test: any,i:any) => (
                <DetailBox
                key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ExtraBold>Radiological Tests:</ExtraBold>
                  <DetailBox sx={{ padding: 0, marginTop: 1 }}>
                    <Bold>Name of Radiological Test:</Bold>
                    <Light>{test.name_of_radiological_test}</Light>
                  </DetailBox>
                  <DetailBox sx={{ padding: 0, marginTop: 1 }}>
                    <Bold>Name of Hospital:</Bold>
                    <Light>{test.name_of_rhospital}</Light>
                  </DetailBox>
                  <DetailBox sx={{ padding: 0, marginTop: 1 }}>
                    <Bold>Prescribed By:</Bold>
                    <Light>{test.prescribed_rby}</Light>
                  </DetailBox>
                </DetailBox>
              ))}
          </InsideDiv>

          <InsideDiv>
            {permissionData.treatment_undertaken[0].name_of_procedure &&
              permissionData.treatment_undertaken.map((test: any,i:any) => (
                <DetailBox
                key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ExtraBold>Treatment Undertaken:</ExtraBold>
                  <DetailBox sx={{ padding: 0, marginTop: 1 }}>
                    <Bold>Name Of Procedure :</Bold>
                    <Light>{test.name_of_procedure}</Light>
                  </DetailBox>
                  <DetailBox sx={{ padding: 0, marginTop: 1 }}>
                    <Bold>Name of Hospital:</Bold>
                    <Light>{test.name_of_thospital}</Light>
                  </DetailBox>
                  <DetailBox sx={{ padding: 0, marginTop: 1 }}>
                    <Bold>Prescribed By:</Bold>
                    <Light>{test.prescribed_tby}</Light>
                  </DetailBox>
                </DetailBox>
              ))}

            <DetailBox
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                maxHeight: "200px", // Adjust this height based on your requirements
                overflowY: "auto", // Add scroll bar if the content exceeds maxHeight
              }}
            >
              <Bold>Extra Information</Bold>
              <Light
                sx={{
                  overflowWrap: "break-word", // Or use 'word-wrap' if you need older browser support
                  wordWrap: "break-word", // Fallback for older browsers
                }}
              >
                {permissionData.extra_information}
              </Light>
            </DetailBox>
          </InsideDiv>
        </RightBox>
      </MainBox>
      <Box px={40} pb={2}  width={"100%"}>
      {permissionData.movement.length>1 && <FileMovement product={permissionData}/>}
      </Box>
    </>
  );
};

export default DetailPermTable;
