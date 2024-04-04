import React from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  Bold,
  DetailBox,
  InsideDiv,
  Light,
  MainBox,
  RightBox,
} from "./DetailClaimTableStyle";
import FileMovement from "../FileMovement/FileMovement";

const DetailClaimTable = (props: any) => {
  const { onClose, claimData } = props;
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
        <Typography variant="h4">Claim Details</Typography>
      </Box>
      <MainBox>
        <RightBox>
          <InsideDiv>
            <DetailBox>
              <Bold>Name :</Bold>
              <Light>{claimData.name}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Designation :</Bold>
              <Light>{claimData.designation}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>CGHS NO :</Bold>
              <Light>{claimData.cghs_card_no}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Family Member Name :</Bold>
              <Light>{claimData.family_member_name}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>Relation :</Bold>
              <Light>{claimData.relation}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Current Status :</Bold>
              <Light>{claimData.currentStatus}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>Basic Pay :</Bold>
              <Light>{claimData.employee.basic_pay}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Created On:</Bold>
              <Light>{claimData.createdAt.slice(0, 10)}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>Claim Amount :</Bold>
              <Light>{claimData.claim_amount}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Hospital:</Bold>
              <Light>{claimData.hospital}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>Treatment :</Bold>
              <Light>{claimData.treatment}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Section:</Bold>
              <Light>{claimData.section}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>From :</Bold>
              <Light>{claimData.date_from}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>To:</Bold>
              <Light>{claimData.date_to}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>Emergency :</Bold>
              <Light>{claimData.emergency}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Updated At:</Bold>
              <Light>{claimData.updatedAt.slice(0, 10)}</Light>
            </DetailBox>
          </InsideDiv>
        </RightBox>
      </MainBox>
      <Box px={40} pb={2}  width={"100%"}>
      {claimData.movement.length>1 && <FileMovement product={claimData}/>}
      </Box>
    </>
  );
};

export default DetailClaimTable;
