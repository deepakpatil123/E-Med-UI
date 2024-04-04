"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  styled,
  Typography,
  Button,
  Container,
  Dialog,
  IconButton,
} from "@mui/material";
import {
  Light,
  Bold,
  InsideDiv,
  DetailBox,
  RightBox,
  LeftBox,
  MainBox,
} from "./style";
import axiosApi from "@/utils/axiosApi";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import FamilyMemberForm from "../../components/forms/FamilyMemberForm/FamilyMemberForm";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { BACKEND_BASE_URL } from "@/config";

const FamilyDetails = () => {
  const auth: any = useAuth();
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [EmpData, setEmpData] = useState<any>([]);
  const [cards, setcards] = useState([]);

  const EmpId: any = auth?.user?.data?.emp?._id;
  const abortControllerRef = useRef(new AbortController());

  // console.log(auth, "AUTH");

  const handlePrintDialogOpen = () => {
    setPrintDialogOpen(true);
  };
  const handlePrintDialogClose = () => {
    setPrintDialogOpen(false);
    getUpdatedEmp();
  };

  const getUpdatedEmp = async () => {
    try {
      const config = {
        url: `/api/medical/getEmployee/${EmpId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth.user.token}`,
        },
      };
      const response = await axiosApi(
        config.url,
        config.method,
        config.headers
      );

      // console.log(response, "RESPONSE");

      if (response) {
        if (JSON.stringify(response.data) !== JSON.stringify(EmpData)) {
          setEmpData(response.data);
          const cardsData = response?.data?.family?.map((i: any) => {
            const arr = i.upload_CGHS.split("\\");
            return arr[arr.length - 1];
          });
          setcards(cardsData);
        } else {
          console.log("Data is not updated");
        }
      }
    } catch (error: any) {
      console.error(error, "Error! While updating employee");
    }
  };

  useEffect(() => {
    getUpdatedEmp();
  }, [EmpId]);

  const familyDataArr: any = EmpData?.family || [];

  // console.log(familyDataArr);

  return (
    <Box>
      {familyDataArr.length !== 0
        ? familyDataArr.map((member: any, index: any) => (
            <MainBox key={index}>
              <LeftBox>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BACKEND_BASE_URL}/uploads/${cards[index]}`}
                  width={320}
                  height={150}
                  alt={"no image found"}
                  color="white"
                />
              </LeftBox>
              <RightBox>
                <InsideDiv>
                  <DetailBox>
                    <Bold>Relation :</Bold>
                    <Light>{member.relation}</Light>
                  </DetailBox>
                  <DetailBox>
                    <Bold>Name :</Bold>
                    <Light>{member.name}</Light>
                  </DetailBox>
                </InsideDiv>
                <InsideDiv>
                  <DetailBox>
                    <Bold>CGHS No :</Bold>
                    <Light>{member.CGHS_card_number1}</Light>
                  </DetailBox>
                  <DetailBox>
                    <Bold>Blood Group :</Bold>
                    <Light>{member.blood_group}</Light>
                  </DetailBox>
                </InsideDiv>
                <InsideDiv>
                  <DetailBox>
                    <Bold>Validity :</Bold>
                    <Light>{member.validity_date}</Light>
                  </DetailBox>
                  <DetailBox>
                    <Bold>Date Of Birth :</Bold>
                    <Light>{member.date_of_birth}</Light>
                  </DetailBox>
                </InsideDiv>
              </RightBox>
            </MainBox>
          ))
        : "Family Member not added"}

      {printDialogOpen && (
        <Dialog
          open={printDialogOpen}
          onClose={handlePrintDialogClose}
          maxWidth="lg"
          fullWidth
        >
          <Box height={"100vh"}>
            <FamilyMemberForm
              close={handlePrintDialogClose}
              familyDataArr={familyDataArr}
            />
          </Box>
        </Dialog>
      )}
      <Button
        sx={{ my: 2 }}
        variant="contained"
        onClick={handlePrintDialogOpen}
      >
        <AddCircleOutlineOutlinedIcon />
        <Typography ml={1} variant="body2">
          Add Member
        </Typography>
      </Button>
    </Box>
  );
};

export default FamilyDetails;
