/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import AddHospitallForm from "../../components/forms/AddHospital/AddHospitallForm";

import EditIcon from "@mui/icons-material/Edit";
import EditHospitalForm from "../../components/forms/EditHospital/EditHospitalForm";
import axiosApi from "@/utils/axiosApi";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";

const Hospital = () => {
  const auth: any = useAuth();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [rows, setRows] = useState([]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "S.NO",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "code",
      headerName: "Hospital Code",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      renderCell: (params: any) => {
        return (
          <Box
            sx={{
              backgroundColor: params.row.is_active ? "#00cc00" : "#808080",
              color: "white",
              boxSizing: "border-box",
              padding: "5px 8px",
              borderRadius: "100px",
            }}
          >
            {params.row.is_active ? "Active" : "In-Active"}
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Hospital Name",
      width: 250,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "contact_no",
      headerName: "Contact Number",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      headerName: "Email",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "edit",
      headerName: "Edit",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <IconButton onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </IconButton>
        );
      },
    },
  ];

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleEditClick = (hospital: any) => {
    setSelectedHospital(hospital);
    setOpenEditDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    // setSelectedHospital(null);
  };

  const handleSave = (updatedHospital: any) => {
    handleEditDialogClose();
  };

  const getData = async () => {
    const config = {
      url: `/api/medical/get_all_hospital`,
      method: "GET",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth.user.token}`,
      },
    };

    let response = await axiosApi(config.url, config.method, config.headers);

    const reqRes = response.data.map((items: any, index: any) => ({
      ...items,
      id: index + 1,
    }));
    setRows(reqRes);
  };

  useEffect(() => {
    getData();
  }, []);

  const updateRow = (updatedHospital: any) => {
    setRows((prevRows: any) =>
      prevRows.map((row: any) =>
        row._id === updatedHospital._id ? { ...row, ...updatedHospital } : row
      )
    );
  };

  return (
    <Grid sx={{ backgroundColor: "white", p: 2, borderRadius: "5px" }}>
      <Grid container mb={2}>
        <Grid xs={6}>
          <Typography variant="h4">Empanelled Hospital</Typography>
        </Grid>

        <Grid sx={{ display: "flex", justifyContent: "flex-end" }} xs={6}>
          <Button onClick={handleAddClick} variant="contained">
            Add Hospital
          </Button>
        </Grid>
      </Grid>
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

      {/* Add Hospital Dialog */}
      {openAddDialog && (
        <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
          <AddHospitallForm onClose={handleAddDialogClose} />
        </Dialog>
      )}

      {/* Edit Hospital Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogContent>
          {selectedHospital && (
            <>
              <EditHospitalForm
                onClose={handleEditDialogClose}
                hospitalData={selectedHospital}
                updateRow={updateRow}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Hospital;
