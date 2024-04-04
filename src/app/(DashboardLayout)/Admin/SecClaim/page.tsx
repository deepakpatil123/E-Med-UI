"use client";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { numStyle, onKeyDown } from "../../components/forms/StylesnS";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ReimbursementForm from "../../components/forms/Reimbursementform";
import Preview from "../../components/previewpage/preview";
import BillEntryForm from "../../components/forms/BillEntryForm";

const SecClaim = () => {
  const status = [
    "Open",
    "Under Processing",
    "Submitted for Approval",
    "Approved",
    "Return",
    "Not Approved",
    "Closed after Approval",
  ];
  const auth: any = useAuth();
  const roleID = auth?.user?.data?.user?.role;

  const [claimData, setClaimData] = useState<any>([]);
  const [reimbursementForm, setReimbursementForm] = useState(false);
  const [billEntryForm, setBillEntryForm] = useState(false);
  const [roles, setroles] = useState([]);
  const [roleNum, setRoleNum] = useState([]);
  const [info, setInfo] = useState({ id: "" });
  const [preview, setPreview] = useState(false);
  const [remark, setRemark] = useState("");
  const [openRemark, setopenRemark] = useState(false);

  const handleClose = () => {
    setopenRemark(false);
  };

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

  const diaryEntryColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "S.No",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "diary_No",
      headerName: "Diary number",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (info: any) => {
        return (
          <Input
            type="number"
            onChange={(e: any) => handleSetDiaryNo(info.row.id, e.target.value)}
            sx={numStyle}
            onKeyDown={onKeyDown}
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Employee Name",
      width: 120,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 150,
      headerClassName: "super-app-theme--header",
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
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      renderCell: (info: any) => {
        return (
          <Chip
            label={info.row.currentStatus}
            color={getColorForStatus(info.row.currentStatus)}
          />
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
          <FormControl sx={{ minWidth: "100%" }}>
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
            disabled={!info.row.diary_No || info.row.lastForwardedTo === ""}
            onClick={() => handleSend(info.row)}
            variant="contained"
          >
            Send <SendIcon />
          </Button>
        );
      },
    },
  ];
  const ASOcolumns: GridColDef[] = [
    {
      field: "id",
      headerName: "S.No",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "diary_No",
      headerName: "Diary number",
      width: 120,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "Employee Name",
      width: 120,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 150,
      headerClassName: "super-app-theme--header",
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
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      renderCell: (info: any) => {
        return (
          <Chip
            label={info.row.currentStatus}
            color={getColorForStatus(info.row.currentStatus)}
          />
        );
      },
    },
    {
      field: "preview",
      headerName: "Preview",
      headerClassName: "super-app-theme--header",
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
      field: "Action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 160,
      flex: 1,

      renderCell: (params: any) => {
        return (
          <>
            <Button
              title="reimbursement"
              variant="contained"
              sx={{ marginRight: 1 }}
              onClick={() => {
                setInfo(params.row);
                params.row.currentStatus === "Approved"
                  ? setBillEntryForm(true)
                  : setReimbursementForm(true);
              }}
            >
              {params.row.currentStatus === "Approved" ? (
                <>
                  <FactCheckIcon />
                  {"Bill entry"}
                </>
              ) : (
                <>
                  <AccountBalanceIcon />
                  {"reimburse"}
                </>
              )}
            </Button>
          </>
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
      field: "name",
      headerName: "Employee Name",
      width: 120,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 150,
      headerClassName: "super-app-theme--header",
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
      width: 120,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "preview",
      headerName: "Preview",
      headerClassName: "super-app-theme--header",
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
      field: "status",
      headerName: "Status",
      width: 250,
      headerClassName: "super-app-theme--header",
      renderCell: (info: any) => {
        return (
          <FormControl sx={{ m: 1, minWidth: "100%" }}>
            <Select
              value={info.row.currentStatus}
              onChange={(e: any) =>
                handleStatusUpdate(info.row.id, e.target.value)
              }
            >
              <MenuItem value="" disabled>
                <em>Select Status</em>
              </MenuItem>
              {status.map((i: any) => (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "lastForwardedTo",
      headerName: "Send file to",
      width: 250,
      headerClassName: "super-app-theme--header",
      renderCell: (info: any) => {
        return (
          <FormControl sx={{ m: 1, minWidth: "100%" }}>
            <Select
              disabled={info.row.currentStatus === "Return"}
              value={
                info.row.currentStatus === "Return"
                  ? info.row.lastForwardedBy
                  : info.row.lastForwardedTo
                  ? info.row.lastForwardedTo
                  : ""
              }
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
      field: "remrk",
      headerName: "Remark",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (info: any) => {
        return (
          <Button
            onClick={() => {
              setopenRemark(true);
              setInfo(info.row);
            }}
            variant="contained"
          >
            Remark
          </Button>
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
            disabled={
              (info.row.currentStatus !== "Return" &&
                info.row.lastForwardedTo === "") ||
              (info.row.currentStatus === "Return" && !info.row.currentremark)
            }
            color={info.row.currentStatus === "Return" ? "error" : "primary"}
            onClick={() =>
              info.row.currentStatus === "Return"
                ? handleReturn(info.row)
                : handleSend(info.row)
            }
            variant="contained"
          >
            {!(info.row.currentStatus === "Return") ? (
              <>
                Send <SendIcon />
              </>
            ) : (
              "return"
            )}
          </Button>
        );
      },
    },
  ];

  const handleSend = async (data: any) => {
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/claim_process`,
      {
        lastForwardedBy: roleOfUser.name,
        currentStatus:
          roleOfUser?.name === "Diary Entry - Admin IV"
            ? "Open"
            : data.currentStatus,
        claimId: data._id,
        lastForwardedTo: data.lastForwardedTo,
        diary_No: data.diary_No,
      }
    );
    getData();
  };

  const handleReturn = async (data: any) => {
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/claim_process`,
      {
        lastForwardedBy: roleOfUser.name,
        currentStatus:
          roleOfUser?.name === "Diary Entry - Admin IV"
            ? "Open"
            : data.currentStatus,
        claimId: data._id,
        lastForwardedTo: data.lastForwardedBy,
        diary_No: data.diary_No,
      }
    );
    getData();
  };

  const handleSetDiaryNo = (id: any, value: any) => {
    const newClaimData = claimData.map((i: any, index: any) => {
      if (id - 1 === index) return { ...i, diary_No: value };
      return i;
    });
    setClaimData(newClaimData);
  };

  const handleSetRemark = (id: any, value: any) => {
    const newClaimData = claimData.map((i: any, index: any) => {
      if (id - 1 === index) return { ...i, currentremark: value };
      return i;
    });
    setClaimData(newClaimData);
    setopenRemark(false);
  };

  const forwardingToAuthority = (id: any, value: any) => {
    const newClaimData = claimData.map((i: any, index: any) => {
      if (id - 1 === index) return { ...i, lastForwardedTo: value };
      return i;
    });
    setClaimData(newClaimData);
  };

  const handleStatusUpdate = (id: any, value: any) => {
    const newClaimData = claimData.map((i: any, index: any) => {
      if (id - 1 === index) return { ...i, currentStatus: value };
      return i;
    });
    setClaimData(newClaimData);
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

  const roleOfUser: any = roleNum.find((e: any) => e._id === roleID);

  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/get_all_claim`
    );

    const filterrRes =
      roleOfUser?.name === "Diary Entry - Admin IV"
        ? res.data.data.filter((i: any) => i.movement.length === 1)
        : res.data.data.filter(
            (i: any) => i.lastForwardedTo === roleOfUser?.name
          );
    const reqRes = filterrRes.map((i: any, index: any) => ({
      ...i,
      id: index + 1,
      createdAt: i.createdAt.slice(0, 10),
    }));
    setClaimData(reqRes);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getAllRoles();
    fetchFun();
  }, []);

  return (
    <Grid sx={{ backgroundColor: "white", borderRadius: "5px" }}>
      <Box mb={2} sx={{borderBottom:"1px solid #ccc", padding:"10px"}}>
        <Typography variant="h5">
          {reimbursementForm
            ? "Reimbursement Form"
            : billEntryForm
            ? "Bill Entry Form"
            : "Claim List"}
        </Typography>
      </Box>
      {reimbursementForm ? (
        <ReimbursementForm
          info={info}
          back={setReimbursementForm}
          refreshList={getData}
          roles={roles}
          lastForwardedBy={roleOfUser.name}
        />
      ) : billEntryForm ? (
        <BillEntryForm
          info={info}
          back={setBillEntryForm}
          refreshList={getData}
          lastForwardedBy={roleOfUser.name}
        />
      ) : claimData.length === 0 ? (
        <Box sx={{padding:"10px"}} py={2} color={"black"} fontWeight={"600"} fontSize={"16px"}>
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
            rows={claimData}
            columns={
              roleOfUser?.name === "Diary Entry - Admin IV"
                ? diaryEntryColumns
                : roleOfUser?.name.includes("ASO")
                ? ASOcolumns
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
            // pageSizeOptions={[5]}
            // checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      )}

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
              <Typography
                sx={{ p: 1 }}
                onClick={() => handleSetRemark(info?.id, remark)}
              >
                Enter
              </Typography>{" "}
              <SendIcon />
            </Button>
          </DialogContent>
        </Box>
      </Dialog>

      <Dialog open={preview} onClose={() => setPreview(false)} fullWidth>
        <Box
          sx={{
            boxShadow: 24,
            display: "flex",
            gap: "1rem",
            p: 4,
          }}
        >
          <Preview data={info} />
        </Box>
      </Dialog>
    </Grid>
  );
};

export default SecClaim;
