"use client";
import React, { useState } from "react";

import {
  styled,
  Box,
  Grid,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CustomTextField from "../theme-elements/CustomTextField";
import { Asterisk } from "../StylesnS";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import axiosApi from "@/utils/axiosApi";
import { onKeyDown,numStyle } from "@/utils/Styles/StylesnS";
import { enqueueSnackbar } from "notistack";

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

const ClaimForm = ({ onClose, empData, family }: any) => {
  const auth: any = useAuth();
  const EmpId = auth?.user?.data?.emp?._id;

  const employeeId = auth.user.data.emp._id;
  const [formData, setFormData] = useState<any>({
    name: empData[0].name ? empData[0].name : "",
    designation: empData[0].designation ? empData[0].designation : "",
    section: empData[0].section_branch_posted_at
      ? empData[0].section_branch_posted_at
      : "",
    cghs_card_no: empData[0].CGHS_card_number
      ? empData[0].CGHS_card_number
      : "",
    family_member_name: family?.name ? family?.name : "",
    relation: family.relation ? family.relation : "",
    upload_test_report: [],
    upload_medical_bill: [],
    claim_amount: "",
    treatment: "",
    hospital: "",
    date_from: "",
    date_to: "",
    emergency: "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFileChange = (field: string, files: any) => {
    if (!files) return;

    if (field === "upload_test_report" || field === "upload_medical_bill") {
      const fileList: any = Array.from(files);
      // console.log(files, "FILE LIST");
      setFormData((prevData: any) => ({
        ...prevData,
        [field]: [...prevData[field], ...fileList],
      }));
    } else {
      setFormData((prevData: any) => ({
        ...prevData,
        [field]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const fd: any = new FormData();
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((ele: any) => {
            fd.append(key, ele);
          });
        } else {
          fd.append(key, formData[key]);
        }
      }

      const config = {
        url: `/api/medical/create_claim/${EmpId}`,
        method: "POST",
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
        enqueueSnackbar("Claim Applied Succesfully", {
          autoHideDuration: 3000,
          variant: "success",
        });
        setFormData(response.data);
      }
      onClose();
    } catch (error) {
      console.error(error);
      onClose();
    }
  };

  // console.log(formData, "FORMDATA");

  const dummyData = [
    {
      name: "Name and Designation of Employee",
      value: `${empData[0].name} (${empData[0].designation})`,
    },
    {
      name: "Section/Branch/Posted At",
      value: empData[0].section_branch_posted_at,
    },
    { name: "Basic Pay", value: empData[0].basic_pay },
    {
      name: "CGHS Card No./AMA",
      value: empData[0].CGHS_card_number,
    },
    {
      name: "Name of Family Member for whom Permission is Required",
      value: family.name,
    },
    {
      name: "Relationship with the Govt. Servant",
      value: family.relation,
    },
    {
      name: "Name of the CGHS Disp. to which attached/AMA",
      value: empData[0].dispensary_to_which_attached_ama,
    },
    {
      name: "Name of the procedure pathological/radiological test for which permission is required and name of the hospital/diagonstic centre where it is to be undertaken",
    },
  ];

  return (
    <Box m={6} sx={{ flexGrow: 1 }}>
      <Typography my={1} variant="h4">
        Claim Form
      </Typography>
      <Grid
        sx={{
          borderRadius: "10px",
          padding: "5px",
          width: "80%",
          mb: 3,
        }}
        container
      >
        {dummyData.map((item, index) => (
          <Grid
            sx={{
              border: "1px solid grey",
            }}
            item
            xs={12}
            key={index}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "5px 10px",
              }}
            >
              <Typography ml={"10px"} variant="body1">
                {item.name}:
              </Typography>
              <Typography variant="body2" mr={"50px"}>
                {item.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
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
              required
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
              Designation
            </Typography>
            <Asterisk />
            <CustomTextField
              value={formData.designation}
              required
              onChange={(e: any) => handleChange("designation", e.target.value)}
              variant="outlined"
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
              Section/Branch/Postde At
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("section", e.target.value)}
              value={formData.section}
              variant="outlined"
              type="name"
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
              CGHS Card No
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) =>
                handleChange("cghs_card_no", e.target.value)
              }
              variant="outlined"
              value={formData.cghs_card_no}
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
              Name Of Family Member for whom Claim is Process
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) =>
                handleChange("family_member_name", e.target.value)
              }
              variant="outlined"
              value={formData.family_member_name}
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
              Test Reports
            </Typography>
            <Asterisk />

            <CustomTextField
              size="small"
              onChange={(e: any) => {
                const file = e.target.files[0];
                const allowedTypes = ["application/pdf"];

                if (!allowedTypes.includes(file.type)) {
                  alert("Please upload a PDF file.");

                  e.target.value = null;
                  return;
                }

                if (file.size > 5 * 1000 * 1024) {
                  alert("Upload file below 5 mb");

                  e.target.value = null;
                } else {
                  handleFileChange("upload_test_report", e.target.files);
                }
              }}
              variant="outlined"
              type="file"
              fullWidth
              multiple
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
              Medical Bills
            </Typography>
            <Asterisk />
            <CustomTextField
              size="small"
              onChange={(e: any) => {
                const file = e.target.files[0];
                const allowedTypes = ["application/pdf"];

                if (!allowedTypes.includes(file.type)) {
                  alert("Please upload a PDF file.");

                  e.target.value = null;
                  return;
                }

                if (file.size > 5 * 1000 * 1024) {
                  alert("Upload file below 5 mb");

                  e.target.value = null;
                } else {
                  handleFileChange("upload_medical_bill", e.target.files);
                }
              }}
              variant="outlined"
              type="file"
              fullWidth
              multiple
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
              Claim Amount
            </Typography>
            <Asterisk />
            <CustomTextField
            onKeyDown={onkeydown}
            sx={numStyle}
              onChange={(e: any) =>
                handleChange("claim_amount", e.target.value)
              }
              value={formData.claim_amount}
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
              Treatment
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("treatment", e.target.value)}
              value={formData.treatment}
              variant="outlined"
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
              Hospital
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("hospital", e.target.value)}
              value={formData.hospital}
              variant="outlined"
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
              Date of Admit
            </Typography>
            <Asterisk />
            <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "200px",
                }}
              >
                <Typography>From: </Typography>

                <CustomTextField
                  onChange={(e: any) =>
                    handleChange("date_from", e.target.value)
                  }
                  placeholder="From"
                  value={formData.date_from}
                  variant="outlined"
                  type="date"
                  fullWidth
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "200px",
                }}
              >
                <Typography>To: </Typography>
                <CustomTextField
                  onChange={(e: any) => handleChange("date_to", e.target.value)}
                  placeholder="To"
                  value={formData.date_to}
                  variant="outlined"
                  type="date"
                  fullWidth
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Emergency <Asterisk />
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={formData.emergency}
                // onChange={(e: any) =>
                //   setFormData({ ...formData, emergency: e.target.value })
                // }
                onChange={(e: any) => handleChange("emergency", e.target.value)}
              >
                <FormControlLabel
                  value={"yes"}
                  control={<Radio />}
                  label="yes"
                />
                <FormControlLabel value={"no"} control={<Radio />} label="no" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <ButtonDiv
          disabled={
            !formData.name ||
            !formData.designation ||
            !formData.section ||
            !formData.cghs_card_no ||
            !formData.family_member_name ||
            !formData.relation ||
            !formData.upload_test_report ||
            !formData.upload_medical_bill ||
            !formData.claim_amount ||
            !formData.treatment ||
            !formData.hospital ||
            !formData.date_from ||
            !formData.date_to ||
            !formData.emergency
          }
          type="submit"
          variant="contained"
        >
          Submit
        </ButtonDiv>
        <ButtonDiv variant="outlined" sx={{ ml: 2 }} onClick={onClose}>
          Cancel
        </ButtonDiv>
      </form>
    </Box>
  );
};

export default ClaimForm;
