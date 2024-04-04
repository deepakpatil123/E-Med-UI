"use client";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { BACKEND_BASE_URL } from "@/config";
import Preview from "../../components/previewpage/preview";

const RejectedPer = () => {
  const [rows, setRows] = useState([]);
  const [info, setInfo] = useState<any>({});
  const [preview, setPreview] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen: any = () => {
    setOpen(!open);
  };

  // console.log(rows);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "S.no.",
      minWidth: 10,
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
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
      minWidth: 150,
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
      field: "family_member_name",
      headerName: "Applicant's Name (Relation)",
      minWidth: 150,
      headerClassName: "super-app-theme--header",

      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="body2" textAlign={"center"}>
              {params.row.family_member_name}
            </Typography>
            <Chip
              sx={{
                backgroundColor: "primary.main",
                color: "#fff",
              }}
              size="small"
              label={params.row.relation}
            ></Chip>
          </Box>
        );
      },
    },
    {
      field: "currentStatus",
      headerName: "Status",
      minWidth: 100,
      headerClassName: "super-app-theme--header",
      flex: 1,
      renderCell: (info: any) => {
        return <Chip label={info.row.currentStatus} color="error" />;
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
          <Button variant="contained" onClick={handleOpen}>
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
      (item: any) => item.currentStatus === "Not Approved"
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
                    <Button
                      href={`${BACKEND_BASE_URL}/uploads/${info.upload_CGHS_AMA}`}
                      target="_blank"
                    >
                      <PictureAsPdfIcon sx={{ color: "red" }} />
                      <Typography variant="body2">
                        {info.upload_CGHS_AMA}
                      </Typography>
                    </Button>
                  ) : (
                    <Button
                      href={`${BACKEND_BASE_URL}/uploads/${info.upload_CGHS_AMA}`}
                      target="_blank"
                    >
                      <ImageIcon sx={{ color: "blue" }} />
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
    </Grid>
  );
};

export default RejectedPer;
