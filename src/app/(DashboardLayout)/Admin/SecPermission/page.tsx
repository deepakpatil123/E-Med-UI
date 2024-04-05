"use client";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  Dialog,
  DialogContent,
  TextareaAutosize,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";

import VisibilityIcon from "@mui/icons-material/Visibility";
import Preview from "../../components/previewpage/preview";
import PermissionForm from "../../components/forms/PermissionForm/PermissionForm";

const SecPermission = () => {
  const auth: any = useAuth();
  const roleID = auth?.user?.data?.body?.user?.role?.name;
  const [perform, setPerForm] = useState(false);
  const [roles, setroles] = useState([]);
  const [roleNum, setRoleNum] = useState([]);
  const [openRemark, setopenRemark] = useState(false);
  const [info, setInfo] = useState<any>({});
  const [preview, setPreview] = useState(false);

  const handleClickOpen = () => {
    setopenRemark(true);
  };

  const handleClose = () => {
    setopenRemark(false);
  };

  const handlePreviewclose = () => {
    setPreview(false);
  };

  const handleClick = () => {
    enqueueSnackbar("Remark Added", {
      autoHideDuration: 3000,
      variant: "success",
    });
    handleClose();
  };
  const [permissionData, setPermissionData] = useState<any>([]);

  const roleOfUser: any = roleNum.find((e: any) => e.name === roleID);

  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("");
  const [authority, setAuthority] = useState("");

  const [diaryRemark, setDiaryRemark] = useState("");
  const getColorForStatus = (status: any) => {
    switch (status) {
      case "Open":
        return "warning";
      case "Not Approved":
        return "error";
      case "Approved":
        return "success";
      default:
        return "warning";
    }
  };

  const secretaryColumn: GridColDef[] = [
    {
      field: "id",
      headerName: "S.No",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "employee.name",
      headerName: "Employee Name",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (parms) => {
        return (
          <Typography variant="body2">{parms.row.employee.name}</Typography>
        );
      },
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (parms) => {
        return (
          <Typography variant="body2">
            {parms.row.employee.designation}
          </Typography>
        );
      },
    },
    {
      field: "family_member_name",
      headerName: "Family Member",
      minWidth: 150,
      headerClassName: "super-app-theme--header",

      renderCell: (params) => {
        return (
          <Typography variant="body2">
            {params.row.family_member_name}
          </Typography>
        );
      },
    },

    {
      field: "relation",
      headerName: "Relation",
      minWidth: 150,
      headerClassName: "super-app-theme--header",

      renderCell: (params) => {
        return (
          <Chip
            sx={{
              backgroundColor: "primary.main",
              color: "#fff",
            }}
            size="small"
            label={params.row.relation}
          ></Chip>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Submitted on",
      headerClassName: "super-app-theme--header",
      width: 150,
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
      field: "remrk",
      headerName: "Remark",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (info: any) => {
        return (
          <Button onClick={() => handleClickOpen()} variant="contained">
            Remark
          </Button>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 250,
      renderCell: (info: any) => {
        return (
          <FormControl sx={{ m: 1, minWidth: "100%" }}>
            <Select
              value={status}
              onChange={(e: any) => setStatus(e.target.value)}
              // inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                <em>Select Status</em>
              </MenuItem>
              <MenuItem value="Under Processing">Under Processing</MenuItem>
              <MenuItem value="Submitted for Approval">
                Submitted for Approval
              </MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Return">Return</MenuItem>
              <MenuItem value="Not Approved">Not Approved</MenuItem>
              <MenuItem value="Closed after Approval">
                Closed after Approval
              </MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "lastForwardedTo",
      headerName: "Send file to",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (info: any) => {
        return (
          <FormControl sx={{ m: 1, minWidth: "100%" }}>
            <Select
              value={info.row.lastForwardedTo}
              onChange={(e: any) =>
                forwardingToAuthority(info.row.id, e.target.value)
              }
              disabled={status === "Approved"}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Select authority</em>
              </MenuItem>

              {/* {status === "Approved" ? (
                <MenuItem selected value={info.row.lastForwardedBy}>
                  {info.row.lastForwardedBy}
                </MenuItem>
              ) : ( */}
              {roles.map((i: any) => {
                if (i !== roleOfUser?.name)
                  return (
                    <MenuItem key={i} value={i}>
                      {i}
                    </MenuItem>
                  );
              })}
              {/* )} */}
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "Send",
      headerName: "Send file",
      headerClassName: "super-app-theme--header",
      renderCell: (info: any) => {
        return (
          <Button
            sx={{
              color: status === "Return" ? "error" : "",
            }}
            onClick={() => handleSend(info.row)}
            variant="contained"
          >
            Send <SendIcon />
          </Button>
        );
      },
    },
  ];

  const permissionColumn: GridColDef[] = [
    {
      field: "id",
      headerName: "S.No",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "employee.name",
      headerName: "Employee Name",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (parms) => {
        return (
          <Typography variant="body2">{parms.row.employee.name}</Typography>
        );
      },
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (parms) => {
        return (
          <Typography variant="body2">
            {parms.row.employee.designation}
          </Typography>
        );
      },
    },
    {
      field: "family_member_name",
      headerName: "Family Member",
      minWidth: 150,
      headerClassName: "super-app-theme--header",

      renderCell: (params) => {
        return (
          <Typography variant="body2">
            {params.row.family_member_name}
          </Typography>
        );
      },
    },

    {
      field: "relation",
      headerName: "Relation",
      minWidth: 150,
      headerClassName: "super-app-theme--header",

      renderCell: (params) => {
        return (
          <Chip
            sx={{
              color: "#4ba9e1",
              border: "1px solid #4ba9e1",
              padding: "2px",
              borderRadius: "3px",
              backgroundColor: "#fff",
              // backgroundColor: "primary.main",
              // color: "#fff",
            }}
            size="small"
            label={params.row.relation}
          ></Chip>
        );
      },
    },

    {
      field: "createdAt",
      headerName: "Submitted on",
      headerClassName: "super-app-theme--header",
      width: 150,
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
          <Button onClick={handlePreview}>
            <VisibilityIcon
              sx={{
                color: "#4ba9e1",
                border: "1px solid #4ba9e1",
                padding: "2px",
                borderRadius: "3px",
              }}
            />
          </Button>
        );
      },
    },
    {
      field: "remrk",
      headerName: "Remark",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (info: any) => {
        return (
          <Button
            onClick={() => handleClickOpen()}
            sx={{
              color: "#4ba9e1",
              border: "1px solid #4ba9e1",
              padding: "2px",
              borderRadius: "3px",
            }}
          >
            Remark
          </Button>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 130,
      renderCell: (info: any) => {
        return (
          <Chip
            label={info.row.currentStatus}
            color={getColorForStatus(info.row.currentStatus)}
          />
        );
      },
    },
    // {
    //   field: "remrk",
    //   headerName: "Remark",
    //   width: 120,
    //   headerClassName: "super-app-theme--header",
    //   cellClassName:  "hide",
    //   // hide: true,

    //   renderCell: (info: any) => {
    //     return (
    //       <Input
    //         type="text"
    //         onChange={(e: any) => setDiaryRemark(e.target.value)}
    //         sx={numStyle}
    //       />
    //     );
    //   },
    // },
    {
      field: "lastForwardedTo",
      headerName: "Send file to",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (info: any) => {
        return (
          <FormControl sx={{ m: 1, minWidth: "100%" }}>
            <Select
              value={info.row.lastForwardedTo}
              onChange={(e: any) =>
                forwardingToAuthority(info.row.id, e.target.value)
              }
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Select authority</em>
              </MenuItem>

              {roles.map((i: any) => {
                if (i !== roleOfUser?.name)
                  return (
                    <MenuItem key={i} value={i}>
                      {i}
                    </MenuItem>
                  );
              })}
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "Send",
      headerName: "Send file",
      headerClassName: "super-app-theme--header",
      renderCell: (info: any) => {
        return (
          <Button
            sx={{
              // color: status === "Return" ? "error" : "",
              color: "#4ba9e1",
              border: "1px solid #4ba9e1",
              padding: "4px",
              borderRadius: "3px",
            }}
            onClick={() => handleSend(info.row)}
          >
            <Typography
              sx={{
                paddingRight: 1,
              }}
            >
              Send
            </Typography>
            <SendIcon
              sx={{
                width: "15px",
                height: "15px",
              }}
            />
          </Button>
        );
      },
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "emp_name",
      headerName: "Employee Name",
      width: 250,
      headerClassName: "super-app-theme--header",
      renderCell: (parms) => {
        return (
          <Typography variant="body2">{parms.row.employee.name}</Typography>
        );
      },
    },
    {
      field: "emp_designation",
      headerName: "Designation",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (parms) => {
        return (
          <Typography variant="body2">
            {parms.row.employee.designation}
          </Typography>
        );
      },
    },
    {
      field: "family_member_name",
      headerName: "Family Member",
      minWidth: 150,
      headerClassName: "super-app-theme--header",

      renderCell: (params) => {
        return (
          <Typography variant="body2">
            {params.row.family_member_name}
          </Typography>
        );
      },
    },

    {
      field: "relation",
      headerName: "Relation",
      minWidth: 150,
      headerClassName: "super-app-theme--header",

      renderCell: (params) => {
        return (
          <Chip
            sx={{
              backgroundColor: "primary.main",
              color: "#fff",
            }}
            size="small"
            label={params.row.relation}
          ></Chip>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Submitted on",
      width: 150,
      headerClassName: "super-app-theme--header",
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
    // {
    //   field: "remrk",
    //   headerName: "Remark",
    //   width: 120,
    //   headerClassName: "super-app-theme--header",
    //   renderCell: (info: any) => {
    //     return (
    //       <Button onClick={() => handleClickOpen()} variant="contained">
    //         Remark
    //       </Button>
    //     );
    //   },
    // },
    {
      field: "edit",
      headerName: "Edit",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (info: any) => {
        const handleClick = () => {
          setInfo(info.row);
          setPerForm(true);
        };
        return (
          <Button
            disabled={!roleOfUser?.name.includes("ASO")}
            onClick={handleClick}
            variant="contained"
            color="warning"
          >
            <EditNoteIcon />
          </Button>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 250,
      renderCell: (info: any) => {
        return (
          <FormControl sx={{ m: 1, minWidth: "100%" }}>
            <Select
              value={status}
              onChange={(e: any) => setStatus(e.target.value)}
              // inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                <em>Select Status</em>
              </MenuItem>
              <MenuItem value="Under Processing">Under Processing</MenuItem>
              <MenuItem value="Submitted for Approval">
                Submitted for Approval
              </MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Return">Return</MenuItem>
              <MenuItem value="Not Approved">Not Approved</MenuItem>
              <MenuItem value="Closed after Approval">
                Closed after Approval
              </MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "Approve",
      headerName: "Approval",
      width: 250,
      headerClassName: "super-app-theme--header",
      renderCell: (info: any) => {
        return (
          <FormControl sx={{ m: 1, minWidth: "100%" }}>
            <Select
              value={authority}
              onChange={(e: any) => setAuthority(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Select authority</em>
              </MenuItem>

              {status === "Return" ? (
                <MenuItem selected value={info.row.lastForwardedBy}>
                  {info.row.lastForwardedBy}
                </MenuItem>
              ) : (
                roles.map((i: any) => {
                  if (i !== roleOfUser?.name)
                    return (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    );
                })
              )}
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "Send",
      headerName: "Send file",
      headerClassName: "super-app-theme--header",
      width: 180,
      renderCell: (info: any) => {
        return (
          <>
            {status == "Return" ? (
              <Button
                color="error"
                onClick={() => handleSend(info.row)}
                variant="contained"
              >
                Return <SendIcon />
              </Button>
            ) : (
              <Button onClick={() => handleSend(info.row)} variant="contained">
                Send <SendIcon />
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const forwardingToAuthority: any = (id: any, value: any) => {
    const newPerData = permissionData.map((i: any, index: any) => {
      if (id - 1 === index) return { ...i, lastForwardedTo: value };
      return i;
    });
    setPermissionData(newPerData);
  };

  const handleSend = async (data: any) => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/permission_process`,
      {
        lastForwardedBy: roleOfUser.name,
        lastForwardedTo:
          roleOfUser?.name === "Diary Entry - Admin IV"
            ? data.lastForwardedTo
            : authority,
        currentStatus:
          roleOfUser?.name === "Diary Entry - Admin IV" ? "Open" : status,
        permissionId: data._id,
        currentremark:
          roleOfUser?.name === "Diary Entry - Admin IV" && data.currentStatus
            ? diaryRemark
            : remark,
      }
    );

    if (res) {
      enqueueSnackbar(
        status === "Approved"
          ? "File Approved Successfully"
          : status === "Return"
          ? `File return back to ${info.row.lastForwardedBy}`
          : `File Send to ${authority}`,
        {
          autoHideDuration: 3000,
          variant: "success",
        }
      );
    }
    getData();
  };

  const getAllRoles = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/getAllUser`
    );
    setroles(res.data.data.map((i: any) => i.role.name));
  };

  const fetchFun = async () => {
    const res: any = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/getAllRole`
    );

    setRoleNum(res.data.data);
  };

  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/get_all_permission`
    );

    const filterrRes =
      roleOfUser?.name === "Diary Entry - Admin IV"
        ? res.data.data.filter(
            (i: any) =>
              i.movement.length === 1 ||
              i.lastForwardedTo === "Diary Entry - Admin IV"
          )
        : res.data.data.filter((i: any) => {
            return i.lastForwardedTo && i.lastForwardedTo === roleOfUser?.name;
          });

    const reqRes = filterrRes.map((i: any, index: any) => ({
      ...i,
      id: index + 1,
      createdAt: i.createdAt.slice(0, 10),
      lastForwardedTo: "",
    }));


    setPermissionData(reqRes);
  };

  useEffect(() => {
    getData();
  }, [roleOfUser]);

  useEffect(() => {
    getAllRoles();
    fetchFun();
  }, []);

  return (
    <Grid
      sx={{
        backgroundColor: "white",
        p: 1,
        borderRadius: "5px",
        boxShadow:
          "0 10px 10px 20px rgb(176 184 214 / 9%),2px -4px 10px -5px #b0b8d6",
        width: "960px",
      }}
    >
      <Box mb={2} sx={{ borderBottom: "1px solid #e3e6f0", padding: "10px" }}>
        <Typography variant="h5">Permission List</Typography>
      </Box>
      {permissionData === 0 ? (
        <Box py={2} color={"black"} fontWeight={"600"} fontSize={"16px"}>
          No Record Found
        </Box>
      ) : (
        <Box
          sx={{
            "& .super-app-theme--header": {
              backgroundColor: "#bccdfb",
            },
            // "& .hide": {
            //   display: "none",
            // },
          }}
        >
          <DataGrid
            rows={permissionData}
            columns={
              roleOfUser?.name === "Diary Entry - Admin IV"
                ? permissionColumn
                : roleOfUser?.name === "Secretary"
                ? secretaryColumn
                : columns
            }
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            disableRowSelectionOnClick
          />
        </Box>
      )}

      <Dialog open={perform} maxWidth="lg" fullWidth>
        <Box height={"100vh"}>
          <PermissionForm
            family={{ name: info.family_member_name, relatin: info.relation }}
            empData={info}
            close={() => {
              getData();
              setPerForm(false);
            }}
            aso={{
              pathalogical: info.pathiological_test,
              radiological: info.radiological_test,
              treatment: info.treatment_undertaken,
            }}
          />
        </Box>
      </Dialog>

      {openRemark && (
        <Dialog open={openRemark} onClose={handleClose}>
          <Box
            sx={{
              height: "30vh",
              width: "35vw",
            }}
          >
            <DialogContent>
              <Button
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
                onClick={handleClose}
                variant="contained"
                color="error"
              >
                X
              </Button>

              <TextareaAutosize
                value={remark}
                onChange={(e) => {
                  setRemark(e.target.value);
                }}
                placeholder="Enter Your Remark"
                minRows={5}
                style={{ width: "100%", marginTop: "2rem" }}
              />
              <Button variant="contained">
                <Typography sx={{ p: 1 }} onClick={() => handleClick()}>
                  Enter
                </Typography>{" "}
                <SendIcon />
              </Button>
            </DialogContent>
          </Box>
        </Dialog>
      )}
      <Dialog open={preview} fullWidth>
        <Box
          sx={{
            boxShadow: 24,
            display: "flex",
            gap: "2rem",
            p: 4,
          }}
        >
          <Preview data={info} onClose={handlePreviewclose} />
        </Box>
      </Dialog>
    </Grid>
  );
};

export default SecPermission;
