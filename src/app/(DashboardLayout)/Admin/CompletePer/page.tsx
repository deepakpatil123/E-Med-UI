"use client";

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/shared/DashboardCard";
import { BACKEND_BASE_URL } from "@/config";
import Preview from "../../components/previewpage/preview";
import Link from "next/link";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";

function CompletedFiles() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  const [rows, setRows] = useState([]);
  const [info, setInfo] = useState<any>({});
  const [preview, setPreview] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen: any = () => {
    setOpen(!open);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "S.no.",
      minWidth: 50,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      headerClassName: "super-app-theme--header",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography variant="body2">{params.row.employee.name}</Typography>
        );
      },
    },
    {
      field: "designation",
      headerName: "Designation",
      minWidth: 100,
      headerClassName: "super-app-theme--header",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography variant="body2">
            {params.row.employee.designation}
          </Typography>
        );
      },
    },
    {
      field: "relation",
      headerName: "Permission Applied For",
      minWidth: 100,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "currentStatus",
      headerName: "Status",
      minWidth: 100,
      headerClassName: "super-app-theme--header",
      flex: 1,
      renderCell: (info: any) => {
        return <Chip label={info.row.currentStatus} color="success" />;
      },
    },
    {
      field: "preview",
      headerName: "Preview",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (info: any) => {
        const handlePreview = () => {
          setInfo(info.row);
          setPreview(true);
        };
        return (
          <Button onClick={handlePreview} variant="contained">
            <VisibilityIcon />
          </Button>
        );
      },
    },
    {
      field: "docs",
      headerName: "Docs",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (info: any) => {
        const handleOpen = () => {
          setInfo(info.row);
          setOpen(true);
        };
        return (
          <Button
            disabled={!info.row.upload_CGHS_AMA}
            variant="contained"
            onClick={handleOpen}
          >
            <DescriptionIcon />
          </Button>
        );
      },
    },
  ];

  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/get_all_permission`
    );

    const reqRes = res.data.data.filter(
      (item: any) => item.currentStatus === "Approved"
    );
    const rowData = reqRes.map((item: any, index: number) => ({
      ...item,
      id: index + 1,
    }));

    setRows(rowData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DashboardCard title="Completed Permission Files">
      <>
        {rows.length === 0 ? (
          <Box py={2} color={"black"} fontWeight={"600"} fontSize={"16px"}>
            No Record Found
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              "& .super-app-theme--header": {
                backgroundColor: "#bccdfb",
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Box>
        )}

        <Dialog open={preview} onClose={() => setPreview(false)} fullWidth>
          <Box
            sx={{
              boxShadow: 24,
              display: "flex",
              gap: "2rem",
              p: 4,
            }}
          >
            <Button
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
              onClick={() => setPreview(false)}
              variant="contained"
              color="error"
            >
              X
            </Button>
            <Preview data={info} />
          </Box>
        </Dialog>

        {open && (
          <Dialog open={handleOpen} onClose={handleOpen}>
            <Box>
              <Button
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
                onClick={handleOpen}
                variant="contained"
                color="error"
              >
                X
              </Button>
              <DialogContent sx={{ margin: "20px 100px" }}>
                {info.upload_CGHS_AMA && (
                  <Box>
                    {info.upload_CGHS_AMA.includes(".pdf") ? (
                      <embed
                        src={`${BACKEND_BASE_URL}/uploads/${info.upload_CGHS_AMA}`}
                        type="application/pdf"
                        width="100%"
                        height="400px" // adjust height as needed
                      />
                    ) : (
                      <Button
                        href={`${BACKEND_BASE_URL}/uploads/${info.upload_CGHS_AMA}`}
                        target="_blank"
                      >
                        <PictureAsPdfIcon sx={{ color: "red" }} />
                        <Typography variant="body2">
                          {info.upload_CGHS_AMA}
                        </Typography>
                      </Button>
                    )}
                  </Box>
                )}
              </DialogContent>
            </Box>
          </Dialog>
        )}
      </>
    </DashboardCard>
  );
}

export default CompletedFiles;
