"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

const DateWisePer = () => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "S.No.",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name_designation",
      headerName: "Name and  Designation",
      width: 100,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "submitted_on",
      headerName: "Submitted On",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "forward_to",
      headerName: "Forward To",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "file_movement",
      headerName: "File Movement",
      width: 180,
      editable: true,
      headerClassName: "super-app-theme--header",
      renderCell: () => {
        return <Button variant="outlined">View</Button>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 180,
      headerClassName: "super-app-theme--header",
      renderCell: () => {
        return (
          <Button color="success" variant="contained">
            Closed after Approval
          </Button>
        );
      },
    },
    {
      field: "view_docs",
      headerName: "View Docs",
      sortable: false,
      width: 180,
      headerClassName: "super-app-theme--header",
      renderCell: () => {
        return <Button variant="outlined">Docs</Button>;
      },
    },
  ];
  const rows = [
    {
      id: 1,
      name_designation: "Ashok Kumar (87632)",
      submitted_on: "04/10/2023",
      forward_to: "Anubhav verma",
    },
  ];

  return (
    <Grid sx={{ backgroundColor: "white", p: 2, borderRadius: "5px" }}>
      <Box mb={2}>
        <Typography variant="h4">Rejected Employees Permission List</Typography>
      </Box>
      {rows.length === 0 ? (
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
            rows={rows}
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

export default DateWisePer;
