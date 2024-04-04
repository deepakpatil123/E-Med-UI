"use client";
import React, { useState } from "react";
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
import { Asterisk } from "../../container/StylesnS";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import axiosApi from "@/utils/axiosApi";
import { onKeyDown, numStyle } from "../StylesnS";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { enqueueSnackbar } from "notistack";

type Props = {
  close: any;
  EmpData: any;
  onUpdate: (updatedData: any) => void;
};

const EmployeeDetailForm = ({ EmpData, close, onUpdate }: Props) => {
  const auth: any = useAuth();
  const [file, setFile] = useState<any>();
  const [formData, setFormData] = useState(EmpData);

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

  const EmpId = auth?.user?.data?.emp?.user_name;

  const handleChange = (field: string, value: any) => {
    if (field === "upload_CGHS") {
      if (value) {
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
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      let fd: any = new FormData();

      for (const key in formData) {
        if (formData[key] instanceof File) {
          fd.append(key, formData[key]);
        } else if (Array.isArray(formData[key])) {
          formData[key].forEach((item: any, index: number) => {
            for (const itemKey in item) {
              fd.append(`${key}[${index}][${itemKey}]`, item[itemKey]);
            }
          });
        } else {
          fd.append(key, formData[key]);
        }
      }

      // console.log(`${path}`, "IMAGE URL");

      const config = {
        url: `/api/medical/updateEmployee/${EmpId}`,
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
        // alert("Employee Data Updated Successfully");
        enqueueSnackbar("Employee Data Updated Successfully", {
          autoHideDuration: 3000,
          variant: "success",
        });
        onUpdate(response.data);
        setFormData(response.data);
      }
    } catch (error) {
      console.error(error, "Error! While updating employee");
    }

    close();
  };

  return (
    <Box m={6} sx={{ flexGrow: 1 }}>
      <Typography
        sx={{ fontSize: "16px", fontWeight: 700, marginBottom: "10px" }}
      >
        Employee Entry Form (Login ID-{EmpData.user_name})
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Service Type:
            </Typography>
            <Asterisk />
            <Select
              onChange={(e: any) =>
                handleChange("service_type", e.target.value)
              }
              value={formData.service_type}
              size="small"
              fullWidth
            >
              <MenuItem value="Serving">
                <em>Serving</em>
              </MenuItem>
              <MenuItem value="Retired">
                <em>Retired</em>
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
              Name:
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("name", e.target.value)}
              value={formData.name}
              disabled
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
              Designation:
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("designation", e.target.value)}
              value={formData.designation}
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
              Gender:
            </Typography>
            <Asterisk />
            <Select
              onChange={(e: any) => handleChange("gender", e.target.value)}
              value={formData.gender}
              disabled
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
              Date of Birth:
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
              Email address:
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("email_id", e.target.value)}
              value={formData.email_id}
              variant="outlined"
              type="email"
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
              Mobile Number:
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("phone_num", e.target.value)}
              sx={numStyle}
              onKeyDown={(e: any) => onKeyDown(e)}
              value={formData.phone_num}
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
              Beneficiary Type:
            </Typography>
            <Asterisk />
            <Select
              onChange={(e: any) =>
                handleChange("beneficiary_type", e.target.value)
              }
              value={formData.beneficiary_type}
              size="small"
              fullWidth
            >
              <MenuItem value="CGHS Card">
                <em>CGHS Card</em>
              </MenuItem>
              <MenuItem value="AMA">
                <em>AMA</em>
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
              CGHS Card Number:
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) =>
                handleChange("CGHS_card_number", e.target.value)
              }
              value={formData.CGHS_card_number}
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
              Dispensary To Which Attached/ama:
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) =>
                handleChange("dispensary_to_which_attached_ama", e.target.value)
              }
              value={formData.dispensary_to_which_attached_ama}
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
              Validity Date:
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) =>
                handleChange("validity_date", e.target.value)
              }
              value={formData.validity_date}
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
              Basic Pay:
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("basic_pay", e.target.value)}
              value={formData.basic_pay}
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
              Pay Level(as per 7th pay commission):
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("pay_level", e.target.value)}
              value={formData.pay_level}
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
              Grade Pay(as per 6th pay commission):
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("grade_pay", e.target.value)}
              value={formData.grade_pay}
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
              Address:
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("address", e.target.value)}
              value={formData.address}
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
              Entitlement:
            </Typography>
            <Asterisk />

            <Select
              onChange={(e: any) => handleChange("entitlement", e.target.value)}
              value={formData.entitlement}
              size="small"
              fullWidth
            >
              <MenuItem value="Private ward">
                <em>Private Ward</em>
              </MenuItem>
              <MenuItem value="Semi-Private ward">
                <em>Semi-Private Ward</em>
              </MenuItem>
              <MenuItem value="General ward">
                <em>General Ward</em>
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
              Section/Branch/Posted At:
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) =>
                handleChange("section_branch_posted_at", e.target.value)
              }
              value={formData.section_branch_posted_at}
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
              Rax:
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("rax", e.target.value)}
              value={formData.rax}
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
              Pan:
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("pan", e.target.value)}
              value={formData.pan}
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
              Bank Name:
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("bank_name", e.target.value)}
              value={formData.bank_name}
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
              IFSC Code:
            </Typography>
            <Asterisk />
            <CustomTextField
              onChange={(e: any) => handleChange("IFSC_code", e.target.value)}
              value={formData.IFSC_code}
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
              Blood Group:
            </Typography>
            <Asterisk />
            <Select
              onChange={(e: any) => handleChange("blood_group", e.target.value)}
              value={formData.blood_group}
              size="small"
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

          {/* <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              22. CGHS Card Preview:
            </Typography>
            <Asterisk />
            <Box>
              {preview && (
                <img
                  style={{
                    width: "60%",
                  }}
                  src={preview}
                  alt="CGHS Card Preview"
                />
              )}
            </Box>
          </Grid> */}

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
            <Box>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput
                  id="file-upload"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e: any) => {
                    const file2 = e.target.files[0];
                    handleChange("upload_CGHS", file2);

                    console.log(file2.size / 1000);

                    if (file2.size > 5 * 1000 * 1024) {
                      alert("Upload File Below 5MB");
                    } else {
                      setFile(file2);
                    }
                  }}
                  type="file"
                />
              </Button>
              {file ? file.name : "No file choosen"}
            </Box>
          </Grid>
        </Grid>

        <ButtonDiv type="submit" variant="contained">
          Submit
        </ButtonDiv>
        <ButtonDiv onClick={close} variant="outlined">
          Cancel
        </ButtonDiv>
      </form>
    </Box>
  );
};

export default EmployeeDetailForm;
