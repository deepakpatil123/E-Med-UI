"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import axiosApi from "@/utils/axiosApi";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import { ToastContainer, toast } from "react-toastify";
import { enqueueSnackbar } from "notistack";

const AllRegEmp = () => {
  const [empData, setEmpData] = useState<any>([]);
  const auth: any = useAuth();

  const handleFreez = async (rowIndex: number, isFreez: boolean) => {
    try {
      const updatedEmpData = [...empData];
      updatedEmpData[rowIndex] = {
        ...updatedEmpData[rowIndex],
        is_freez: !isFreez,
      };

      const config = {
        url: `/api/medical/freeze/${updatedEmpData[rowIndex].user_name}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
        data: { is_freez: !isFreez },
      };

      await axiosApi(config.url, config.method, config.headers, config.data);

      setEmpData(updatedEmpData);

      enqueueSnackbar(
        `${isFreez ? "Employee Unfreez" : "Employee Freez"} successful`,
        {
          autoHideDuration: 3000,
          variant: "success",
        }
      );
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("Error occurred", {
        autoHideDuration: 3000,
        variant: "error",
      });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "S.No",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "designation",
      headerName: "Designation",
      minWidth: 188,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "section_branch_posted_at",
      headerName: "Branch",
      minWidth: 180,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "is_freez",
      headerName: "Freez/Unfreeze",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      headerClassName: "super-app-theme--header",
      minWidth: 180,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => handleFreez(params.row.id - 1, params.row.is_freez)}
            variant="contained"
          >
            {params.row.is_freez ? "Unfreeze" : "Freeze"}
          </Button>
        );
      },
    },
    {
      field: "Reset to Default Password",
      headerName: "Reset Password",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      headerClassName: "super-app-theme--header",
      minWidth: 180,
      renderCell: () => {
        return <Button variant="outlined">Reset</Button>;
      },
    },
  ];
  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/get_all_employee`
    );
    const reqRes = res.data.data.map((i: any, index: any) => ({
      ...i,
      id: index + 1,
    }));
    setEmpData(reqRes);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid sx={{ backgroundColor: "white", p: 2, borderRadius: "5px" }}>
      <Box mb={2}>
        <Typography variant="h4">All Registered Employees</Typography>
      </Box>
      {empData.length === 0 ? (
        <Box py={2} color={"black"} fontWeight={"600"} fontSize={"16px"}>
          No Record Found
        </Box>
      ) : (
        <Box
          sx={{
            "& .super-app-theme--header": {
              backgroundColor: "#bccdfb",
            },
          }}
        >
          <DataGrid
            rows={empData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      )}
    </Grid>
  );
};

export default AllRegEmp;
