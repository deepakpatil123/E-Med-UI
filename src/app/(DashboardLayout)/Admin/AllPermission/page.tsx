"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import ReactToPrint from "react-to-print";
import PrintNotesheet from "@/utils/printFormat/PrintNotsheet";
import DashboardCard from "../../components/shared/DashboardCard";
import axios from "axios";
import Link from "next/link";
import { BACKEND_BASE_URL } from "@/config";
import PrintPermission from "@/utils/PrintPermission";
import FileMovement from "../../components/FileMovement/FileMovement";

import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

const OnlineBills = () => {
  const auth: any = useAuth();

  const [open, setOpen] = React.useState(false);
  const [view, setView] = useState<any>(false);
  const [uploadFile, setUploadFile] = useState<any>(false);

  const handleOpen: any = (file: any) => {
    setUploadFile(file);
    setOpen(!open);
  };

  const [allPer, setAllPer] = useState([]);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [printDialogOpen2, setPrintDialogOpen2] = useState(false);
  const [empId, setEmpId] = useState<any>();
  const [file_num, setfile_Num] = useState<any>();
  const [hosp, setHosp] = useState<any>();
  const [hospData, setHospData] = useState<any>([]);
  const [Drname, setdrName] = useState<any>();
  const [family_mem, setFamily_mem] = useState<any>();
  const [relation, setRelation] = useState<any>();
  const [forDate, setForDate] = useState<any>();
  const [combineTests, setTestscombinetests] = useState<any>();
  const [Pro, setPro] = useState("");

  const NotesheetRef: any = useRef();
  const [hospEmailId, sethospEmailId] = useState<any>();

  const PrintPermissionRef: any = useRef();

  const handlePrintDialogClose = () => {
    setPrintDialogOpen(false);
  };

  const handlePrintDialogOpen2 = (
    empID: any,
    hospName: any,
    DrName: any,
    test: any,
    Family_Mem: any,
    Relation: any,
    date: any,
    filenum: any
  ) => {
    setFamily_mem(Family_Mem);
    setRelation(Relation);
    setHosp(hospName);
    setdrName(DrName);
    setEmpId(empID);
    setTestscombinetests(test);
    setPrintDialogOpen2(true);
    setForDate(date);
    setfile_Num(filenum);
  };

  const handlePrintDialogOpen = (
    empID: any,
    hospName: any,
    DrName: any,
    test: any
  ) => {
    setHosp(hospName);
    setdrName(DrName);
    setEmpId(empID);
    setTestscombinetests(test);
    setPrintDialogOpen(true);
  };

  const handlePrintDialogClose2 = () => {
    setPrintDialogOpen2(false);
  };

  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/get_all_permission`
    );

    const reqRes = res.data.data.map((i: any, index: any) => ({
      ...i,
      id: index + 1,
      files: i.upload_CGHS_AMA,
      status: i.current_status,
      forwardBy: i.lastForwardedBy,
      forwardTo: i.lastForwardedTo,
      employeId: i.employee._id,
      hname: i.pathiological_test[0]?.name_of_phospital,
      drName: i.pathiological_test[0]?.prescribed_pby,
      test:
        i.pathiological_test[0]?.name_of_pathological_test +
        "," +
        i.radiological_test[0]?.name_of_radiological_test,
      familyMem: i.family_member_name,
      relation: i.relation,
      forwardedDate: i?.movement[0]?.forwardedAt,
      fileNum: i._id,
    }));
    setAllPer(reqRes);
  };

  const handleFileMoveOpen: any = () => {
    setView(true);
  };

  const handleFileClose = () => {
    setView(false);
  };

  const hospitalData = async () => {
    const res = await axios.get(
      `${BACKEND_BASE_URL}/api/medical/get_all_hospital`
    );
    let data = res.data.data;
    setHospData(data);
  };

  useEffect(() => {
    getData();
    hospitalData();
  }, []);

  return (
    <DashboardCard title="All Permissions">
      <>
        {allPer.length === 0 ? (
          <Box py={2} color={"black"} fontWeight={"600"} fontSize={"16px"}>
            No Record Found
          </Box>
        ) : (
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    S.No/<br></br>Per-ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Employee name <br></br> (with Relation)
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Received From
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Status & <br></br>authority
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Forword To
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Movement
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    View Docs
                  </Typography>
                  {/* <VisibilityIcon /> */}
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Print
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allPer.map((product: any) => (
                <TableRow key={product.employeId}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {product.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {product.family_member_name}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "12px",
                          }}
                        >
                          {product.emp_designation}
                        </Typography>
                        {/* <Box
                      color="textSecondary"
                      sx={{
                        fontSize: "12px",
                      }}
                    > */}
                        <Chip
                          sx={{
                            px: "4px",
                            backgroundColor: "primary.main",
                            color: "#fff",
                          }}
                          size="small"
                          label={product.relation}
                        ></Chip>
                        {/* </Box> */}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {product.lastForwardedBy}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor:
                          product.currentStatus === "Return"
                            ? "error.main"
                            : product.currentStatus === "Approved"
                            ? "success.main"
                            : product.currentStatus === "Open"
                            ? "warning.main"
                            : "primary.main",
                        color: "#fff",
                      }}
                      size="small"
                      label={product.currentStatus}
                    ></Chip>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle2" fontWeight={400}>
                      {product.lastForwardedTo}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setPro(product);
                        setView(true);
                      }}
                      disabled={product.movement.length === 1}
                      sx={{
                        width: "30px",
                        height: "20px",
                        padding: "12px 20px",
                        fontSize: "8px",
                        backgroundColor: "",
                      }}
                    >
                      View
                    </Button>

                  </TableCell>

                  <TableCell align="center">
                    <Button
                      disabled={!product.upload_CGHS_AMA}
                      onClick={() => handleOpen(product.upload_CGHS_AMA)}
                    >
                      <VisibilityIcon />
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        width: "30px",
                        height: "20px",
                        padding: "12px 20px",
                        fontSize: "8px",
                      }}
                      onClick={() => {
                        handlePrintDialogOpen2(
                          product.employeId,
                          product.hname,
                          product.drName,
                          product.test,
                          product.familyMem,
                          product.relation,
                          product.forwardedDate,
                          product.fileNum
                        );
                      }}
                    >
                      Note Sheet
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        width: "30px",
                        height: "20px",
                        padding: "12px 20px",
                        fontSize: "8px",
                      }}
                      onClick={() => {
                        handlePrintDialogOpen(
                          product.employeId,
                          product.hname,
                          product.drName,
                          product.test
                        );
                      }}
                    >
                      Permission
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Dialog open={view} onClose={() => setView(false)}>
          <DialogContent>
            <Box>
              <Typography variant="h6" mb={2} fontWeight={600}>
                File Movement
              </Typography>
              <FileMovement product={Pro} />
            </Box>
          </DialogContent>
        </Dialog>

        {printDialogOpen && (
          <Dialog
            open={printDialogOpen}
            // onClose={handlePrintDialogClose}
            maxWidth="lg"
            fullWidth
          >
            <Box height="100vh">
              <DialogContent>
                <PrintPermission
                  empId={empId}
                  ref={PrintPermissionRef}
                  hospital={hosp}
                  DrName={Drname}
                  alltests={combineTests}
                  hospEmailId={hospEmailId}
                  hospitalDATA={hospData}
                  FILE_num={file_num}
                />
                <Button
                  title="close"
                  sx={{ margin: "0 10px" }}
                  variant="outlined"
                  onClick={handlePrintDialogClose}
                >
                  Close
                </Button>
                <ReactToPrint
                  trigger={() => (
                    <Button title="print" variant="contained">
                      Print
                    </Button>
                  )}
                  content={() => PrintPermissionRef.current}
                />
              </DialogContent>
            </Box>
          </Dialog>
        )}
        {printDialogOpen2 && (
          <Dialog
            open={printDialogOpen2}
            // onClose={handlePrintDialogClose2}
            maxWidth="lg"
            fullWidth
          >
            <Box height="100vh">
              <DialogContent>
                <PrintNotesheet
                  empId={empId}
                  hospital={hosp}
                  DrName={Drname}
                  alltests={combineTests}
                  hospEmailId={hospEmailId}
                  hospitalDATA={hospData}
                  ref={NotesheetRef}
                  familyMEM={family_mem}
                  RELATION={relation}
                  forWardedDate={forDate}
                  FILE_num={file_num}
                />
                <Button
                  title="close"
                  sx={{ margin: "0 10px" }}
                  variant="outlined"
                  onClick={handlePrintDialogClose2}
                >
                  Close
                </Button>
                <ReactToPrint
                  trigger={() => (
                    <Button title="print" variant="contained">
                      Print
                    </Button>
                  )}
                  content={() => NotesheetRef.current}
                />
              </DialogContent>
            </Box>
          </Dialog>
        )}
        {open && (
          <Dialog open={handleOpen} onClose={handleOpen}>
            <Box>
              <DialogContent
                sx={{
                  margin: "6px 50px",
                }}
              >
                {uploadFile && (
                  <Box>
                    <Link
                      href={`${BACKEND_BASE_URL}/uploads/${uploadFile}`}
                      target="_blank"
                    >
                      <InsertPhotoIcon sx={{ color: "blue" }} />
                      <Typography variant="body2">{uploadFile}</Typography>
                    </Link>
                  </Box>
                )}
              </DialogContent>
            </Box>
          </Dialog>
        )}
      </>
    </DashboardCard>
  );
};

export default OnlineBills;
