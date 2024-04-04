"use client";

import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

const SecEmergency = () => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Name & Designation",
      headerName: "Name & Designation",
      width: 250,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Submitted On",
      headerName: "Submitted On",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Forward to",
      headerName: "Forward On",
      type: "number",
      width: 110,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "File Movement",
      headerName: "File Movement",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Status",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Forward",
      headerName: "Forward",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "Print",
      headerName: "Print",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      headerClassName: "super-app-theme--header",
    },
  ];
  const rows = [
    {
      id: 1,
      "Name & Designation": "Emp Name & Designation/Patient",
      "Submitted On": "Submitted On",
      "Forward to": "Forward to",
      "File Movement": "File Movement",
      Status: "File Movement",
      Forward: "File Movement",
      Print: "Print",
    },
    {
      id: 2,
      "Name & Designation": "Emp Name & Designation/Patient",
      "Submitted On": "Submitted On",
      "Forward to": "Forward to",
      "File Movement": "File Movement",
      Status: "File Movement",
      Forward: "File Movement",
      Print: "Print",
    },
  ];
  return (
    <Grid sx={{ backgroundColor: "white", p: 2, borderRadius: "5px" }}>
      <Box mb={2}>
        <Typography variant="h4">Emergency List</Typography>
      </Box>
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
          // pageSizeOptions={[5]}
          // checkboxSelection
          // disableRowSelectionOnClick
        />
      </Box>
    </Grid>
  );
};

export default SecEmergency;
