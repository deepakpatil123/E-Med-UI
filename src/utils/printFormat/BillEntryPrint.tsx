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

const BillEntryPrint = React.forwardRef(({ info, formData }: any, ref: any) => {
  const tableCell = { border: "1px solid black" };

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return (
    <Box ref={ref} style={{ width: "90%", margin: "50px" }}>
      <Box>
        <Stack alignItems={"center"}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            G.A.R. 23
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            {" "}
            (See Rule 91)
          </Typography>
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            Medical Charges Reimbursement Bill
          </Typography>
        </Stack>

        <Stack sx={{ width: "50%" }}>
          <Typography>{`Bill No.   ${formData.bill_No}`}</Typography>
          <Typography>{`Ministry/Department/Office of Union Public Service Commission For the Month/year: ${formattedDate}`}</Typography>
          <Typography>{`Head of Account:   2051-Public Service Commission 00.101-UPSC 01 Administrative Expenditure 01.00.06 Medical Treatment`}</Typography>
        </Stack>

        <Table sx={{ margin: "20px 0px", border: "1px solid black" }}>
          <TableHead sx={{ border: "1px solid black" }}>
            <TableRow sx={tableCell}>
              <TableCell sx={tableCell}>
                <Typography>SL NO. 1.</Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>
                  Section of Establishment and Name of Incumbent 2
                </Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>Gross Claim (Rs.) 3</Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>Recovery of Advance (Rs.) 4</Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>Net Amount Payable (Rs.) 5</Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>Remarks 6</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ border: "1px solid black" }}>
            <TableRow sx={tableCell}>
              <TableCell sx={tableCell}>
                <Typography>1</Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>{info.name}</Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>{info.amount_reimbursed}</Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography></Typography>
              </TableCell>
              <TableCell sx={tableCell}>
                <Typography>{info.amount_reimbursed}</Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={tableCell}>
              <TableCell sx={tableCell} colSpan={6}>
                {`Net amount required for payment (In words) `}
                <b>(Rupees {info.amount_in_words} Only)</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box>
          <Typography my={3}>
            {`Certified that I have satisfied myself that the amounts included in Bills drawn 1 month/2 months previous to this date, with the execution of these detailed below (of which the total amount has been refunded by deduction from this bill) have been disbursed to the Govt. servants therein named and their receipts taken in the office copy for the bill or in a separate acquaintance roll.`}
          </Typography>

          <Box>
            <Typography my={3}>Details of Medical charges refunded</Typography>
            <Typography my={3}>
              2. Certified that Essentiality certificate, receipts etc. are
              appended.
            </Typography>
            <Typography my={3}>
              3. Please issue a cheque in favour of the official concerned/F&BO,
              UPSC, New Delhi.
            </Typography>
            <Box my={3}>
              <Typography>{`4. a) Appropriation for 2023-24 Rs. ${formData.budget}`}</Typography>
              <Typography>{`      b) Expenditure including this bill Rs. ${formData.expenditure}`}</Typography>
              <Typography>{`      c) Balance Rs. ${formData.remaining_budget}`}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "1rem",
            }}
          >
            <Typography>Received payment</Typography>
            <Typography>Signature -----------------</Typography>
            <Typography>Designation of drawing officer</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "90%",
          marginTop: "250px",
          marginLeft: "50px",
          marginRight: "50px",
          marginBottom: "50px",
        }}
      >
        <Box pt={10}>
          <Typography>
            {`Passed For Rs ${info.amount_reimbursed}/- `}{" "}
            <b>(Rupees {info.amount_in_words} Only)</b>
          </Typography>
          <Table
            sx={{
              margin: "20px 0px",
              border: "1px solid black",
              width: "100%",
            }}
          >
            <TableBody sx={{ border: "1px solid black" }}>
              <TableRow sx={tableCell}>
                <TableCell sx={tableCell}>
                  <Typography sx={{ my: "1rem" }}>
                    <span style={{ marginRight: "7px" }}>Station</span>
                    <b>New Delhi</b>
                  </Typography>

                  <Typography
                    sx={{
                      my: "8px",
                      justifyContent: "space-between",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <span style={{ marginRight: "8px" }}>
                      {`Date   ${formattedDate}`}
                    </span>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <b>Signature of the Controlling Officer</b>
                      <p>Designation</p>
                    </Typography>
                  </Typography>

                  <Typography sx={{ my: "1rem" }}>
                    Passed For Payment of
                    ........................................................................................................Rupees
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  height: "5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Payment through Cheque No_____________________________
                </Typography>
              </TableRow>

              <TableRow>
                <TableCell sx={tableCell}>
                  <Typography
                    sx={{
                      paddingLeft: "2rem",
                    }}
                  >
                    Pay And Accounts Officer/Cheque Drawing D.D.O.
                  </Typography>

                  <Typography>Dated:_____________________</Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={tableCell}>
                  <Typography sx={{ marginLeft: "2rem" }}>
                    For use in Pay and Accounts Officer
                    <br></br>
                    (Post Cheque)
                  </Typography>

                  <Typography sx={{ my: "1rem" }}>
                    Admitted For Rs.________________________________
                    <br></br>
                    Objected For Rs.________________________________
                    <br></br>
                    Reason For Objection.___________________________
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <Typography>
              <b>Jr./Sr. Accountant</b>
            </Typography>
            <Typography>
              <b>Jr.A.O.</b>
            </Typography>
            <Typography>
              <b>Pay and Accounts Officer</b>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ marginTop: "400px" }}>
        <Box py={8}>
          <Stack alignItems={"center"}>
            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              {`File No. D-12015/ ${info.file_No} /2023-Admin.IV`}
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
              Union Public Service Commission
            </Typography>
            <Typography sx={{ fontSize: "14px", marginLeft: "80%" }}>
              {`New Delhi  ${formattedDate}`}
            </Typography>

            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              Order
            </Typography>

            <Typography sx={{ margin: "20px 0" }}>
              {`Sanction of the Competent Authority/Head of the department is
              hereby conveyed to pay a sum of Rs.${info.amount_reimbursed}/-(${info.amount_in_words} Only) to ${info.name}, US on
              account of reimbursement of medical expenses incurred by him/her
              on medical treatment of Eye ______________________ in r/o
              Sh. K. K. Bhardwaj, Father of __________________, US for the
              period on _____________________ as OPD/Indoor patient from ${info.hospital}. The
              payment will be made to ${info.name}, US.`}
              <br></br>
              2. The expenditure is debitable to the Major head 2051, Public
              Service Commission, 00.101.PSC.01-Administrative Expenditure
              01.00.06-Medical Treatment for the year 2023-24.
            </Typography>
          </Stack>

          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                margin: "20px 0",
                textAlign: "right",
              }}
            >
              Section Officer
              <br></br>
              Admn. IV Section
              <br></br>
              Union Public Service Commission
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: "bold",
                margin: "20px 0",
              }}
            >
              To
              <br></br>
              The Pay & Accounts Officer,
              <br></br>
              Union Public Service Commission
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

BillEntryPrint.displayName = "BillEntryPrint";

export default BillEntryPrint;
