"use client";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

const AllEmp = () => {
  const [empData, setEmpData] = useState([]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "S.No.",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "user_name",
      headerName: "User ID",
      width: 100,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
      // renderCell: (params) => {
      //   return (
      //     <Typography variant="body2">
      //       {params.row.employee.designation}
      //     </Typography>
      //   );
      // },
    },
    {
      field: "section_branch_posted_at",
      headerName: "Branch",
      width: 180,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email_id",
      headerName: "Email",
      sortable: false,
      width: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phone_num",
      headerName: "Contact Number",
      sortable: false,
      width: 180,
      headerClassName: "super-app-theme--header",
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
        <Typography variant="h4">All Employees</Typography>
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

export default AllEmp;
