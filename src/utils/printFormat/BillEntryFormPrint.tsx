// PrintableTable.js
import React, { forwardRef } from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const BillEntryFormPrint = React.forwardRef(
  ({ info, formData }: any, ref: any) => {
    const tableCell = { border: "1px solid black" };

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = currentDate.getFullYear();

    return (
      <Box ref={ref} sx={{ Width: "100%", padding: "40px" }}>
        <Box sx={{ marginTop: "40px", marginLeft: "50px" }}>
          <Table sx={{ margin: "20px 0px", border: "1px solid black" }}>
            <TableHead sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography>Name & Designation of Govt. Servant</Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>
                    Name of the Patient & Relation with the Govt. Servant
                  </Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>Date of Submission of the claim</Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>Duration of illness</Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>Name of the Disease</Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>Name & Address of the A.M.A</Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>
                    No. of the Consultation & Fees paid for each
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>{info.treatment}</Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>{info.hospital}</Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    -
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>

            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        <Box sx={{ marginTop: "800px", padding: "40px" }}>
          <Table sx={{ margin: "20px 0px", pt: 10, border: "1px solid black" }}>
            <TableHead sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography>No of Injections</Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>System of Treatment</Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>
                    Name of the Chemist/shop medicine purchased from
                  </Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>Cost of Medicine</Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>Total Claimed</Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>Total Reimbursed</Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>Details of Bill i.e., No. & Date</Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    -
                  </Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    -
                  </Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    -
                  </Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    -
                  </Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography>{formData.bill_No}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>

            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
                <TableCell sx={tableCell}>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
    );
  }
);

BillEntryFormPrint.displayName = "BillEntryFormPrint";
export default BillEntryFormPrint;
