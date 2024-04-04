"use client";
import { toast } from "react-toastify";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  styled,
  Typography,
  Button,
  Dialog,
  Grid,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import EmployeeDetailForm from "../../components/forms/EmployeeDetailForm/EmployeeDetailForm";
import {
  Light,
  Bold,
  InsideDiv,
  DetailBox,
  RightBox,
  LeftBox,
  MainBox,
} from "./style";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import axiosApi from "@/utils/axiosApi";

import EditIcon from "@mui/icons-material/Edit";
import { BACKEND_BASE_URL } from "@/config";

const EmployeeDetails = (props: any) => {
  const auth: any = useAuth();
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [EmpData, setEmpData] = useState<any>([]);
  const [filename, setFileName] = useState("");

  const EmpId = auth?.user?.data?.emp?._id;

  const handlePrintDialogOpen = () => {
    setPrintDialogOpen(true);
  };
  const handlePrintDialogClose = () => {
    setPrintDialogOpen(false);
  };

  const {
    name,
    gender,
    email_id,
    phone_num,
    relation,
    user_name,
    CGHS_card_number,
    IFSC_code,
    address,
    bank_account_number,
    bank_name,
    basic_pay,
    beneficiary_type,
    blood_group,
    date_of_birth,
    designation,
    dispensary_to_which_attached_ama,
    entitlement,
    grade_pay,
    pan,
    pay_level,
    rax,
    section_branch_posted_at,
    service_type,
    upload_CGHS,
    validity_date,
  } = EmpData || {};

  const handleUpdate = (updatedData: any) => {
    setEmpData(updatedData);
    if (EmpData?.upload_CGHS !== updatedData?.upload_CGHS) {
      const file = updatedData?.upload_CGHS?.split("\\");
      setFileName(file[file.length - 1]);
    }
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
      let response = await axiosApi(config.url, config.method, config.headers);

      if (response) {
        setEmpData(response.data);
        const file = response?.data?.upload_CGHS?.split("\\");
        setFileName(file[file.length - 1]);
      }
    } catch (error: any) {
      console.error(error, "Error! While updating employee");
    }
  };

  useEffect(() => {
    getUpdatedEmp();
  }, [EmpId]);

  return (
    <>
      <Box mb={2}>
        <Typography variant="h4">Employee details</Typography>
      </Box>
      <MainBox>
        <LeftBox sx={{ position: "relative", boxShadow:"0 10px 10px 20px rgb(176 184 214 / 9%),2px -4px 10px -5px #b0b8d6" }}>
          <Box sx={{ position: "absolute", top: 5, right: "10px" }}>
            <IconButton
              sx={{
                backgroundColor: "#5D87FF",
                color: "white",
                "&:hover": { color: "grey" },
              }}
              onClick={handlePrintDialogOpen}
              disabled={EmpData.is_freez}
            >
              <EditIcon />
            </IconButton>
          </Box>
          <Box>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height={110}
              width={310}
              src={`${BACKEND_BASE_URL}/uploads/${filename}`}
              alt=""
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <DetailBox>
              <Bold>Login ID :</Bold>
              <Light>{user_name}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Employee Name: </Bold>
              <Light>{name}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Service Type :</Bold>
              <Light>{service_type}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Gender :</Bold>
              <Light>{gender}</Light>
            </DetailBox>
          </Box>
        </LeftBox>

        <RightBox sx={{boxShadow:"0 10px 10px 20px rgb(176 184 214 / 9%),2px -4px 10px -5px #b0b8d6"}}>
          <InsideDiv></InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>Designation :</Bold>
              <Light>{designation}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Section :</Bold>
              <Light>{section_branch_posted_at}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>Email :</Bold>
              <Light>{email_id}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Contact :</Bold>
              <Light>{phone_num}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>Date Of Birth :</Bold>
              <Light>{date_of_birth}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Entitlement :</Bold>
              <Light>{entitlement}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>Pan No :</Bold>
              <Light>{pan}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Basic Pay :</Bold>
              <Light>{basic_pay}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>Pay Level :</Bold>
              <Light>{pay_level}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Grade Pay :</Bold>
              <Light>{grade_pay}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>Blood Group :</Bold>
              <Light>{blood_group}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Validity :</Bold>
              <Light>{validity_date}</Light>
            </DetailBox>
          </InsideDiv>
          <InsideDiv>
            <DetailBox>
              <Bold>CGHS No :</Bold>
              <Light>{CGHS_card_number}</Light>
            </DetailBox>
            <DetailBox>
              <Bold>Dispansary to which Attached :</Bold>
              <Light>{dispensary_to_which_attached_ama}</Light>
            </DetailBox>
          </InsideDiv>
        </RightBox>

        {printDialogOpen && (
          <Dialog
            open={printDialogOpen}
            onClose={handlePrintDialogClose}
            maxWidth="lg"
            fullWidth
          >
            <Box height={"100vh"}>
              <EmployeeDetailForm
                EmpData={EmpData}
                close={handlePrintDialogClose}
                onUpdate={handleUpdate}
              />
            </Box>
          </Dialog>
        )}
      </MainBox>
    </>
  );
};

export default EmployeeDetails;
