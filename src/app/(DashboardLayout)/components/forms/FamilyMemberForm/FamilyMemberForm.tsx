"use client";
import React, { useEffect, useState } from "react";

type Props = {
  close: any;
  familyDataArr: any;
};

import {
  styled,
  Box,
  Paper,
  Grid,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import CustomTextField from "../theme-elements/CustomTextField";
import { Asterisk } from "../StylesnS";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import axiosApi from "@/utils/axiosApi";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { onKeyDown, numStyle } from "../StylesnS";

const FamilyMemberForm = (props: Props) => {
  const auth: any = useAuth();
  const [file, setFile] = useState<any>();
  const [EmpData, setEmpData] = useState<any>(null);

  const empID: any = auth?.user?.data?.emp?.user_name;

  const EmpId: any = auth?.user?.data?.emp?._id;

  const [formData, setFormData] = useState<any>({
    name: "",
    gender: "",
    date_of_birth: "",
    relation: "",
    blood_group: "",
    CGHS_card_number1: "",
    validity_date: "",
    upload_CGHS: "",
  });

  const empData = auth?.user?.data?.emp;
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
        if (JSON.stringify(response.data) !== JSON.stringify(EmpData)) {
          setEmpData(response.data);
        } else {
          console.log("Data is not updated");
        }
      }
    } catch (error) {
      console.error(error, "Error! While updating employee");
    }
  };

  useEffect(() => {
    getUpdatedEmp();
  }, [EmpId]);

  // console.log(EmpData, "EMP DATa");

  const handleChange = (field: string, value: any) => {
    if (field === "upload_CGHS") {
      const file = value;
      if (file) {
        setFormData((prevData: any) => ({
          ...prevData,
          [field]: value,
        }));
      }
    } else {
      // Check if the field is the one where only alphabetic characters are allowed
      if (field === "name" || field === "relation") {
        // Validate if the input contains only alphabetic characters
        if (/^[A-Za-z\s]+$/.test(value) || value === "") {
          setFormData((prevData: any) => ({
            ...prevData,
            [field]: value,
          }));
        }
      } else {
        setFormData((prevData: any) => ({
          ...prevData,
          [field]: value,
        }));
      }
    }
  };

  const ButtonDiv = styled(Button)({
    cursor: "pointer",
    textAlign: "center",
    border: "1px solid transparent",
    padding: "0.56rem, 1.375rem",
    // backgroundColor: "#08D419",
    // color: "white",
    marginBottom: "1rem",
    alignSelf: "start",
    // marginLeft: "8px",
    marginTop: "10px",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      formData.name == "" ||
      formData.gender === "" ||
      formData.date_of_birth == "" ||
      formData.relation === "" ||
      formData.upload_CGHS === ""
    ) {
      enqueueSnackbar("fill all fields", {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    }
    const fd = new FormData();

    fd.append("family_name", formData.name);
    fd.append("family_gender", formData.gender);
    fd.append("family_date_of_birth", formData.date_of_birth);
    fd.append("family_relation", formData.relation);
    fd.append("family_blood_group", formData.blood_group);
    fd.append("family_CGHS_card_number1", formData.CGHS_card_number1);
    fd.append("family_validity_date", formData.validity_date);
    fd.append("upload_CGHS", formData.upload_CGHS);

    try {
      const config = {
        url: `/api/medical/updateEmployee/${empID}`,
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.user.token}`,
        },
        data: fd,
      };
      let response = await axiosApi(
        config.url,
        config.method,
        config.headers,
        config.data
      );

      if (response) {
        // alert("Family Member added Succesfully");
        enqueueSnackbar("Family Member added Succesfully", {
          autoHideDuration: 3000,
          variant: "success",
        });
        setFormData(response.data);
        props.close();
      }
    } catch (error) {
      console.error(error, "Error! While updating employee");
    }

    setFormData({
      name: "",
      gender: "",
      date_of_birth: "",
      relation: "",
      blood_group: "",
      CGHS_card_number1: "",
      validity_date: "",
      upload_CGHS: "",
    });
  };

  // console.log(formData, "FORMDATA");
  return (
    <Box m={6} sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} columns={12}>
          <Grid item lg={6} xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Name
            </Typography>
            <Asterisk />
            <CustomTextField
              value={formData.name}
              onChange={(e: any) => handleChange("name", e.target.value)}
              variant="outlined"
              type="text"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Gender
            </Typography>
            <Asterisk />
            <Select
              onChange={(e: any) => handleChange("gender", e.target.value)}
              value={formData.gender}
              size="small"
              fullWidth
            >
              <MenuItem disabled value="Select">
                <em>Select</em>
              </MenuItem>
              <MenuItem value="Male">
                <em>Male</em>
              </MenuItem>
              <MenuItem value="Female">
                <em>Female</em>
              </MenuItem>
            </Select>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Date Of Birth
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) =>
                handleChange("date_of_birth", e.target.value)
              }
              value={formData.date_of_birth}
              variant="outlined"
              type="date"
              fullWidth
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
              Relation
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("relation", e.target.value)}
              variant="outlined"
              value={formData.relation}
              type="text"
              fullWidth
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
              Blood Group
            </Typography>
            <Asterisk />
            <Select
              onChange={(e: any) => handleChange("blood_group", e.target.value)}
              size="small"
              value={formData.blood_group}
              fullWidth
            >
              <MenuItem disabled value="Select">
                <em>Select Blood group</em>
              </MenuItem>
              <MenuItem value="A+">
                <em>A+</em>
              </MenuItem>
              <MenuItem value="B+">
                <em>B+</em>
              </MenuItem>
              <MenuItem value="O+">
                <em>O+</em>
              </MenuItem>
              <MenuItem value="AB+">
                <em>AB+</em>
              </MenuItem>
              <MenuItem value="A-">
                <em>A-</em>
              </MenuItem>
              <MenuItem value="B-">
                <em>B-</em>
              </MenuItem>
              <MenuItem value="O-">
                <em>O-</em>
              </MenuItem>
              <MenuItem value="AB-">
                <em>AB-</em>
              </MenuItem>
            </Select>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              CGHS Card Number
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) =>
                handleChange("CGHS_card_number1", e.target.value)
              }
              value={formData.CGHS_card_number1}
              sx={numStyle}
              onKeyDown={(e: any) => onKeyDown(e)}
              variant="outlined"
              type="number"
              fullWidth
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
              Validity Date
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) =>
                handleChange("validity_date", e.target.value)
              }
              variant="outlined"
              value={formData.validity_date}
              type="date"
              fullWidth
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
              Upload CGHS Scanned Img: (ONLY JPEG/JPG File)
            </Typography>
            <Asterisk />

            <CustomTextField
              id="file-upload"
              type="file"
              hidden
              accept=".png,.jpeg,"
              // onChange={(e: any) => setFile(e.target.files[0])}
              onChange={(e: any) =>
                handleChange("upload_CGHS", e.target.files[0])
              }
            />

            {/* {file ? file.name : "No file chosen"} */}
          </Grid>
        </Grid>
        <ButtonDiv type="submit" variant="contained">
          Submit
        </ButtonDiv>
        <ButtonDiv onClick={props.close} variant="outlined">
          Cancel
        </ButtonDiv>
      </form>
    </Box>
  );
};

export default FamilyMemberForm;
