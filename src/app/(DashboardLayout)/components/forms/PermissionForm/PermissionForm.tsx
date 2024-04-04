import React, { useEffect, useState } from "react";
import DashboardCard from "../../shared/DashboardCard";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
  Checkbox,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomTextField from "../theme-elements/CustomTextField";
import { Asterisk } from "../StylesnS";
import axiosApi from "@/utils/axiosApi";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/config";
import { enqueueSnackbar } from "notistack";

const HospitalList = [
  "All India Institute of Medical Sciences (AIIMS)",
  "Post Graduate Institute of Medical Education and Research (PGIMER)",
  "Safdarjung Hospital",
  "Jawaharlal Institute of Postgraduate Medical Education and Research (JIPMER)",
  "King George's Medical University (KGMU)",
  "Madras Medical College (MMC)",
  "Lady Hardinge Medical College (LHMC)",
  "Grant Medical College and Sir J.J. Group of Hospitals",
  "All India Institute of Hygiene and Public Health (AIIH&PH)",
  "Lok Nayak Hospital",
];

function PermissionForm({ close, family, empData, aso }: any) {
  const auth: any = useAuth();
  const today = new Date().toISOString().split("T")[0];
  const [declaration, setDeclaration] = useState(false);

  const pathologicaltest = {
    name_of_pathological_test: "",
    name_of_phospital: "",
    prescribed_pby: "",
    prescribed_pdate: "",
  };

  const radiologicaltest = {
    name_of_radiological_test: "",
    name_of_rhospital: "",
    prescribed_rby: "",
    prescribed_rdate: "",
  };

  const treatmenttest = {
    name_of_procedure: "",
    name_of_thospital: "",
    prescribed_tby: "",
    prescribed_tdate: "",
  };

  const [pathologicalTestsData, setPathologicalTestsData] = useState<any>(
    !aso ? [pathologicaltest] : aso.pathalogical
  );
  const [radiologicalTestsData, setRadiologicalTestsData] = useState<any>(
    !aso ? [radiologicaltest] : aso.radiological
  );
  const [treatmentTestsData, setTreatmentTestsData] = useState<any>(
    !aso ? [treatmenttest] : aso.treatment
  );

  const [formData, setFormData] = useState();
  const [extraRemark, setExtraRemark] = useState();
  const [Hospital, setHospital] = useState([]);

  const getHospital = async () => {
    const res: any = await axios.get(
      `${BACKEND_BASE_URL}/api/medical/get_all_hospital`
    );
    setHospital(res.data);
    const data: any = res.data.data.map((e: any) => {
      return e.name;
    });
    setHospital(data);
  };

  useEffect(() => {
    getHospital();
  }, []);

  const [DateError, setDateError] = useState(false);

  const [DateError1, setDateError1] = useState(false);

  const [DateError2, setDateError2] = useState(false);

  const handleAddRowPathological = () => {
    if (pathologicalTestsData.length < 4)
      setPathologicalTestsData((prev: any) => [...prev, pathologicaltest]);
  };

  const handleAddRowRadiological = () => {
    if (radiologicalTestsData.length < 4)
      setRadiologicalTestsData((prev: any) => [...prev, radiologicaltest]);
  };

  const handleAddRowTreatment = () => {
    if (treatmentTestsData.length < 4)
      setTreatmentTestsData((prev: any) => [...prev, treatmenttest]);
  };

  const handleDeclaration = () => {
    setDeclaration(!declaration);

    // if (!declaration) {
    //   if (pathologicaltest.name_of_pathological_test !== "") {
    //     setPathologicalTestsData((prevData: any) => [
    //       ...prevData,
    //       pathologicaltest,
    //     ]);
    //     setPathologicalTest({
    //       ...pathologicaltest,
    //       name_of_pathological_test: "",
    //       name_of_phospital: "",
    //       prescribed_pby: "",
    //       prescribed_pdate: "",
    //     });
    //   }
    //   if (radiologicaltest.name_of_radiological_test !== "") {
    //     setRadiologicalTestsData((prevData: any) => [
    //       ...prevData,
    //       radiologicaltest,
    //     ]);
    //     setRadiologicalTest({
    //       ...radiologicaltest,
    //       name_of_radiological_test: "",
    //       name_of_rhospital: "",
    //       prescribed_rby: "",
    //       prescribed_rdate: "",
    //     });
    //   }
    //   if (treatmenttest.name_of_procedure !== "") {
    //     setTreatmentTestsData((prev: any) => [...prev, treatmenttest]);
    //     setTreatmentTest({
    //       ...treatmenttest,
    //       name_of_procedure: "",
    //       name_of_thospital: "",
    //       prescribed_tby: "",
    //       prescribed_tdate: "",
    //     });
    //   }
    // }
  };

  const handleDeletePathological = (index: number) => {
    const newArr = pathologicalTestsData.filter(
      (i: any, id: any) => id !== index
    );
    setPathologicalTestsData(newArr);
  };

  const handleDeleteRadiological = (index: number) => {
    const newArr = radiologicalTestsData.filter(
      (i: any, id: any) => id !== index
    );
    setRadiologicalTestsData(newArr);
  };

  const handleDeleteTreatment = (index: number) => {
    const newArr = treatmentTestsData.filter((i: any, id: any) => id !== index);
    setTreatmentTestsData(newArr);
  };

  const handleUpdatePathologicalData = (index: any, name: any, value: any) => {
    const updatedData = [...pathologicalTestsData];
    updatedData[index] = {
      ...updatedData[index],
      [name]: value,
    };
    setPathologicalTestsData(updatedData);
  };

  const handleUpdateRadiologicalData = (index: any, name: any, value: any) => {
    const updatedData = [...radiologicalTestsData];
    updatedData[index] = {
      ...updatedData[index],
      [name]: value,
    };
    setRadiologicalTestsData(updatedData);
  };

  const handleUpdateTreatmentData = (index: any, name: any, value: any) => {
    const updatedData = [...treatmentTestsData];
    updatedData[index] = {
      ...updatedData[index],
      [name]: value,
    };
    setTreatmentTestsData(updatedData);
  };

  const dummyData = !aso
    ? [
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
      ]
    : [
        {
          name: "Name and Designation of Employee",
          value: `${empData.employee.name} (${empData.employee.designation})`,
        },
        {
          name: "Section/Branch/Posted At",
          value: empData.employee.section_branch_posted_at,
        },
        { name: "Basic Pay", value: empData.employee.basic_pay },
        {
          name: "CGHS Card No./AMA",
          value: empData.employee.CGHS_card_number,
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
          value: empData.employee.dispensary_to_which_attached_ama,
        },
        {
          name: "Name of the procedure pathological/radiological test for which permission is required and name of the hospital/diagonstic centre where it is to be undertaken",
        },
      ];
  const EmpId = auth?.user?.data?.emp?._id;

  const [obj, setObj] = useState({});

  const [file, setFile] = useState<any>(null);

  const handleSubmit = async () => {
    const formData: any = {
      family_member_name: family.name,
      relation: family.relation,
      pathiological_test: [...pathologicalTestsData],
      radiological_test: radiologicalTestsData,
      treatment_undertaken: treatmentTestsData,
      upload_CGHS_AMA: file,
      extra_information: extraRemark,
    };

    // console.log(formData);
    try {
      // Field Validation
      if (
        formData.pathiological_test.length === 0 &&
        formData.radiological_test.length === 0 &&
        formData.treatment_undertaken.length === 0
      ) {
        // Show error message
        enqueueSnackbar("Add at least one report.", {
          autoHideDuration: 3000,
          variant: "error",
        });
        return; // Exit function early
      }

      // Upload CGHS AMA Validation
      if (!formData.upload_CGHS_AMA) {
        // Show upload CGHS AMA card
        enqueueSnackbar("Upload CGHS AMA", {
          autoHideDuration: 3000,
          variant: "error",
        });
        return; // Exit function early
      }

      let fd: any = new FormData();

      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item: any, index: number) => {
            for (const itemKey in item) {
              fd.append(`${key}[${index}][${itemKey}]`, item[itemKey]);
            }
          });
        } else {
          fd.append(key, formData[key]);
        }
      }

      console.log(fd);
      const config = {
        url: `/api/medical/applyPermission/${EmpId}`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${auth.user.token}`,
        },
        data: fd,
      };

      const response = await axiosApi(
        config.url,
        config.method,
        config.headers,
        config.data
      );

      if (JSON.stringify(obj) !== JSON.stringify(response.data)) {
        if (response) {
          enqueueSnackbar("Permission Applied", {
            autoHideDuration: 3000,
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            style: {
              minWidth: "300px", // Adjust the width as needed
              minHeight: "100px", // Adjust the height as needed
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            },
          });
          setFormData(response.data);
          close();
        }
      } else {
        enqueueSnackbar("Already Exist", {
          autoHideDuration: 3000,
          variant: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
    // close();
  };

  const handleUpdate = async (e: any) => {
    const formData: any = {
      pathiological_test: pathologicalTestsData,
      radiological_test: radiologicalTestsData,
      treatment_undertaken: treatmentTestsData,
      extra_information: extraRemark,
    };

    // console.log(formData);
    try {
      // Field Validation
      if (
        formData.pathiological_test.length === 0 &&
        formData.radiological_test.length === 0 &&
        formData.treatment_undertaken.length === 0
      ) {
        // Show error message
        enqueueSnackbar("Add at least one report.", {
          autoHideDuration: 3000,
          variant: "error",
        });
        return; // Exit function early
      }

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/update_Permission/${empData._id}`,
        formData
      );

      if (JSON.stringify(obj) !== JSON.stringify(response.data)) {
        if (response) {
          enqueueSnackbar("Permission updated", {
            autoHideDuration: 3000,
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            style: {
              minWidth: "300px", // Adjust the width as needed
              minHeight: "100px", // Adjust the height as needed
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            },
          });
          setFormData(response.data);

          close();
        }
      } else {
        enqueueSnackbar("Already Exist", {
          autoHideDuration: 3000,
          variant: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
    // close();
  };

  return (
    <>
      <DashboardCard title={"Permission Form"}>
        <>
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

          <Grid
            container
            spacing={1.5}
            columns={{ lg: 12, xs: 3, sm: 6, md: 9, xl: 12 }}
            mb={4}
          >
            {pathologicalTestsData.map((elem: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      {" "}
                      Name of the pathological test
                    </Typography>
                    {/* <Asterisk /> */}
                    <CustomTextField
                      value={elem.name_of_pathological_test}
                      name="name_of_pathological_test"
                      size="small"
                      placeholder="pathological test"
                      id="outlined-basic"
                      type="text"
                      sx={{ width: "100%" }}
                      onChange={(e: any) => {
                        const value = e.target.value;
                        // Validate if the input contains only alphabetic characters
                        if (/^[A-Za-z\s]+$/.test(value) || value === "") {
                          handleUpdatePathologicalData(
                            index,
                            e.target.name,
                            value
                          );
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      {" "}
                      Name of the Hospital/Diagonstic
                    </Typography>
                    {/* <Asterisk /> */}
                    <Autocomplete
                      value={elem.name_of_phospital}
                      size="small"
                      placeholder="Hospital/Diagonstic"
                      id="outlined-basic"
                      sx={{ width: "100%" }}
                      onChange={(e: any, newVal: any) => {
                        handleUpdatePathologicalData(
                          index,
                          "name_of_phospital",
                          newVal
                        );
                      }}
                      options={Hospital}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      {" "}
                      Prescribed by
                    </Typography>
                    <CustomTextField
                      value={elem.prescribed_pby}
                      size="small"
                      placeholder="Prescribed by"
                      id="outlined-basic"
                      type="text"
                      sx={{ width: "100%" }}
                      onChange={(e: any) => {
                        const value = e.target.value;
                        // Validate if the input contains only alphabetic characters
                        if (/^[A-Za-z\s]+$/.test(value) || value === "") {
                          handleUpdatePathologicalData(
                            index,
                            "prescribed_pby",
                            value
                          );
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={1.5}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      {" "}
                      Prescribed Date
                    </Typography>
                    {/* <Asterisk /> */}
                    <CustomTextField
                      value={elem.prescribed_pdate}
                      name="prescribed_pdate"
                      size="small"
                      id="outlined-basic"
                      type="date"
                      min={new Date()}
                      sx={{ width: "100%" }}
                      onChange={(e: any) => {
                        const selectedDate = new Date(e.target.value);
                        const currentDate = new Date();

                        const isDateValid = selectedDate < currentDate;

                        setDateError(!isDateValid);

                        if (isDateValid) {
                          handleUpdatePathologicalData(
                            index,
                            e.target.name,
                            e.target.value
                          );
                        }
                      }}
                    />
                    {/* {new Date() < new Date(elem.prescribed_pdate)? (
                      <span style={{ color: "red" }}>Invalid Date</span>
                    ) : null} */}
                  </Grid>

                  {pathologicalTestsData.length > 1 &&
                    index < pathologicalTestsData.length &&
                    !declaration && (
                      <Grid item xs={1.5}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          mb="5px"
                        >
                          {" "}
                          Delete
                        </Typography>
                        <Box>
                          <DeleteIcon
                            onClick={() => handleDeletePathological(index)}
                            fontSize="large"
                            sx={{
                              color: "rgb(225, 90, 17)",
                              cursor: "pointer",
                            }}
                          />
                        </Box>
                      </Grid>
                    )}
                </React.Fragment>
              );
            })}

            <Grid item xs={12}>
              <Button
                disabled={
                  !aso
                    ? pathologicalTestsData[pathologicalTestsData.length - 1]
                        .name_of_pathological_test === "" ||
                      pathologicalTestsData[pathologicalTestsData.length - 1]
                        .name_of_phospital === "" ||
                      pathologicalTestsData[pathologicalTestsData.length - 1]
                        .prescribed_pby === "" ||
                      pathologicalTestsData[pathologicalTestsData.length - 1]
                        .prescribed_pdate === "" ||
                      aso
                    : true
                }
                variant="contained"
                size="small"
                onClick={handleAddRowPathological}
              >
                Add More
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1.5}
            columns={{ lg: 12, xs: 3, sm: 6, md: 9, xl: 12 }}
            mb={4}
          >
            {radiologicalTestsData.map((elem: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      {" "}
                      Name of the Radiological test
                    </Typography>
                    {/* <Asterisk /> */}
                    <CustomTextField
                      value={elem.name_of_radiological_test}
                      size="small"
                      placeholder="Radiological test"
                      id="outlined-basic"
                      type="text"
                      sx={{ width: "100%" }}
                      onChange={(e: any) => {
                        const value = e.target.value;
                        // Validate if the input contains only alphabetic characters
                        if (/^[A-Za-z\s]+$/.test(value) || value === "") {
                          handleUpdateRadiologicalData(
                            index,
                            "name_of_radiological_test",
                            value
                          );
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      {" "}
                      Name of the Hospital/Diagonstic
                    </Typography>
                    {/* <Asterisk /> */}
                    <Autocomplete
                      value={elem.name_of_rhospital}
                      size="small"
                      placeholder="Hospital/Diagonstic"
                      id="outlined-basic"
                      sx={{ width: "100%" }}
                      onChange={(e: any, newVal: any) => {
                        handleUpdateRadiologicalData(
                          index,
                          "name_of_rhospital",
                          newVal
                        );
                      }}
                      options={Hospital}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      {" "}
                      Prescribed by
                    </Typography>
                    <CustomTextField
                      value={elem.prescribed_rby}
                      size="small"
                      placeholder="Prescribed by"
                      id="outlined-basic"
                      type="text"
                      sx={{ width: "100%" }}
                      onChange={(e: any) => {
                        const value = e.target.value;
                        // Validate if the input contains only alphabetic characters
                        if (/^[A-Za-z\s]+$/.test(value) || value === "") {
                          handleUpdateRadiologicalData(
                            index,
                            "prescribed_rby",
                            value
                          );
                        }
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={1.5}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      {" "}
                      Prescribed Date
                    </Typography>
                    {/* <Asterisk /> */}
                    <CustomTextField
                      value={elem.prescribed_rdate}
                      size="small"
                      placeholder="Prescribed Date"
                      id="outlined-basic"
                      type="date"
                      sx={{ width: "100%" }}
                      onChange={(e: any) => {
                        const selectedDate = new Date(e.target.value);
                        const currentDate = new Date();

                        const isDateValid = selectedDate < currentDate;

                        setDateError1(!isDateValid);

                        if (isDateValid) {
                          handleUpdateRadiologicalData(
                            index,
                            "prescribed_rdate",
                            e.target.value
                          );
                        }
                      }}
                      required
                    />
                    {DateError1 ? (
                      <span style={{ color: "red" }}>Invalid Date</span>
                    ) : null}
                  </Grid>

                  {radiologicalTestsData.length > 1 &&
                    index < radiologicalTestsData.length &&
                    !declaration && (
                      <Grid item xs={1.5}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          mb="5px"
                        >
                          {" "}
                          Delete
                        </Typography>
                        <DeleteIcon
                          onClick={() => handleDeleteRadiological(index)}
                          fontSize="large"
                          sx={{
                            color: "rgb(225, 90, 17)",
                            cursor: "pointer",
                          }}
                        />
                      </Grid>
                    )}
                </React.Fragment>
              );
            })}

            <Grid item xs={12}>
              <Button
                disabled={
                  !aso
                    ? radiologicalTestsData[radiologicalTestsData.length - 1]
                        .name_of_radiological_test === "" ||
                      radiologicalTestsData[radiologicalTestsData.length - 1]
                        .name_of_rhospital === "" ||
                      radiologicalTestsData[radiologicalTestsData.length - 1]
                        .prescribed_rby === "" ||
                      radiologicalTestsData[radiologicalTestsData.length - 1]
                        .prescribed_rdate === ""
                    : true
                }
                variant="contained"
                size="small"
                onClick={() => handleAddRowRadiological()}
              >
                Add More
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1.5}
            columns={{ lg: 12, xs: 3, sm: 6, md: 9, xl: 12 }}
          >
            {treatmentTestsData.map((elem: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      {" "}
                      Name of the Procedure/Treatment
                    </Typography>
                    {/* <Asterisk /> */}
                    <CustomTextField
                      value={elem.name_of_procedure}
                      size="small"
                      placeholder="Procedure/Treatment"
                      id="outlined-basic"
                      type="text"
                      sx={{ width: "100%" }}
                      onChange={(e: any) => {
                        const value = e.target.value;
                        // Validate if the input contains only alphabetic characters
                        if (/^[A-Za-z\s]+$/.test(value) || value === "") {
                          handleUpdateTreatmentData(
                            index,
                            "name_of_procedure",
                            value
                          );
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      {" "}
                      Name of the Hospital/Diagonstic
                    </Typography>
                    {/* <Asterisk /> */}
                    <Autocomplete
                      value={elem.name_of_thospital}
                      size="small"
                      placeholder="Hospital/Diagonstic"
                      id="outlined-basic"
                      sx={{ width: "100%" }}
                      onChange={(e: any, newVal: any) => {
                        handleUpdateTreatmentData(
                          index,
                          "name_of_thospital",
                          newVal
                        );
                      }}
                      options={Hospital}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      {" "}
                      Prescribed by
                    </Typography>
                    <CustomTextField
                      value={elem.prescribed_tby}
                      size="small"
                      placeholder="Prescribed by"
                      id="outlined-basic"
                      type="text"
                      sx={{ width: "100%" }}
                      onChange={(e: any) => {
                        const value = e.target.value;
                        // Validate if the input contains only alphabetic characters
                        if (/^[A-Za-z\s]+$/.test(value) || value === "") {
                          handleUpdateTreatmentData(
                            index,
                            "prescribed_tby",
                            value
                          );
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={1.5}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      mb="5px"
                    >
                      {" "}
                      Prescribed Date
                    </Typography>
                    {/* <Asterisk /> */}
                    <CustomTextField
                      value={elem.prescribed_tdate}
                      size="small"
                      placeholder="Prescribed Date"
                      id="outlined-basic"
                      type="date"
                      sx={{ width: "100%" }}
                      onChange={(e: any) => {
                        const selectedDate = new Date(e.target.value);
                        const currentDate = new Date();

                        const isDateValid = selectedDate < currentDate;

                        setDateError2(!isDateValid);

                        if (isDateValid) {
                          handleUpdateTreatmentData(
                            index,
                            "prescribed_tdate",
                            e.target.value
                          );
                        }
                      }}
                    />
                    {DateError2 ? (
                      <span style={{ color: "red" }}>Invalid Date</span>
                    ) : null}
                  </Grid>

                  {treatmentTestsData.length > 1 &&
                    index < treatmentTestsData.length &&
                    !declaration && (
                      <Grid item xs={1.5}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          component="label"
                          mb="5px"
                        >
                          {" "}
                          Delete
                        </Typography>

                        <DeleteIcon
                          onClick={() => handleDeleteTreatment(index)}
                          fontSize="large"
                          sx={{
                            color: "rgb(225, 90, 17)",
                            cursor: "pointer",
                          }}
                        />
                      </Grid>
                    )}
                </React.Fragment>
              );
            })}

            <Grid item xs={12}>
              <Button
                disabled={
                  !aso
                    ? treatmentTestsData[treatmentTestsData.length - 1]
                        .name_of_procedure === "" ||
                      treatmentTestsData[treatmentTestsData.length - 1]
                        .name_of_thospital === "" ||
                      treatmentTestsData[treatmentTestsData.length - 1]
                        .prescribed_tby === "" ||
                      treatmentTestsData[treatmentTestsData.length - 1]
                        .prescribed_tdate === ""
                    : true
                }
                variant="contained"
                size="small"
                onClick={() => handleAddRowTreatment()}
              >
                Add More
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            columns={{ lg: 12, xs: 3, sm: 6, md: 9, xl: 12 }}
            mt={5}
          >
            {!aso && (
              <>
                {" "}
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  mb="5px"
                >
                  Upload scanned letter from CGHS/AMA (Pdf Size 5 MB MAXIMUM)
                </Typography>
                <Asterisk />
                <Grid item xs={12}>
                  <label htmlFor="file-upload">
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        background: "rgb(225, 90, 17)",
                        "&:hover": { background: "rgb(255, 120, 50)" },
                      }}
                      component="span"
                    >
                      Choose File
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      hidden
                      accept="application/pdf"
                      onChange={(e: any) => {
                        console.log(e.target.files);
                        if (
                          e.target.files[0]?.size > 5 * 1000 * 1024 ||
                          e.target.files[0].type != "application/pdf"
                        ) {
                          alert("Upload Only PDF (Below 5 MB)");
                          return;
                        } else {
                          setFile(e.target.files[0]);
                          console.log(file);
                        }
                      }}
                    />
                  </label>{" "}
                  {file ? file.name : "No file chosen"}
                </Grid>
              </>
            )}

            <Grid
              columns={{ lg: 12, xs: 12, sm: 12, md: 12, xl: 12 }}
              sx={{
                width: "100%",
                height: "auto",
                padding: "20px 0",
                marginTop: "10px",
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
              >
                Enter below any exrta information you would like to provide
              </Typography>
              <Box>
                <TextareaAutosize
                  minRows={3}
                  placeholder="Remark"
                  style={{ width: "88%" }}
                  onChange={(e: any) => setExtraRemark(e.target.value)}
                />
              </Box>
            </Grid>

            <Grid columns={{ lg: 12, xs: 3, sm: 12, md: 12, xl: 12 }}>
              <FormControlLabel
                sx={{
                  padding: "5px 0",
                  margin: "10px 0",
                }}
                control={<Checkbox checked={declaration} size="medium" />}
                onChange={() => handleDeclaration()}
                label="I hereby declare that the details furnished above are true and correct to the best of my knowledge."
              />
            </Grid>

            <Grid
              container
              spacing={1.5}
              sx={{ paddingX: "30px", marginBottom: "20px" }}
            >
              <Grid item>
                <Button
                  disabled={!declaration || DateError}
                  variant="contained"
                  size="small"
                  onClick={!aso ? handleSubmit : handleUpdate}
                >
                  Submit
                </Button>
              </Grid>

              <Grid item>
                <Button variant="contained" size="small">
                  reset
                </Button>
              </Grid>

              <Grid item>
                <Button onClick={close} size="small" variant="text">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      </DashboardCard>
    </>
  );
}

export default PermissionForm;
