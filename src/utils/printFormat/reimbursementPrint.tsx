import React, { forwardRef } from "react";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

const PrintData = forwardRef(
  (
    {
      data,
      InadmiAmo,
      fileNumber,
      AmountInWord,
      amountReim,
      remark,
      CGHS_Type,
    }: any,
    ref: any
  ) => {
    const rows = Object.entries(data).map(([key, value], index) => ({
      id: index + 1,
      key,
      value,
    }));

    const columns = [
      {
        field: "Name & Designation of the Govt. Servant",
        headerName: data.name,
      },
      {
        field:
          "Name of the Patient & his/her relationship with the Govt. Servant",
        headerName: data.family_member_name,
      },
      {
        field: "Whether CGHS/Non-CGHS Benificiary",
        headerName: CGHS_Type,
      },
      {
        field: "Nature of treatment (Whether OPD or Indoor)",
        headerName: data.treatment,
      },
      {
        field: "Whether treatment taken under Emergency",
        headerName: data.emergency,
      },
      {
        field:
          "Whether treatment taken from (CGHS Dispensary / Govt. Hospital / unrecognised Private Hospital)",
        headerName: data.hospital_Name,
      },
      {
        field: "Visited CGHS empanelled hospital on recommendation of: ",
        headerName: data.recomendation_Of ? (
          data.recomendation_Of
        ) : (
          <span style={{ marginLeft: "10px" }}>-</span>
        ),
      },
      {
        field:
          "Period of treatment for which the reimbursement claim submitted",
        headerName: `${data.date_from} & ${data.date_to}`,
      },
      { field: "Amout Claimed", headerName: `${data.claim_amount}/-` },
      { field: "Inadmissible Amount", headerName: `${InadmiAmo}/-` },
      { field: "Admissible Amount", headerName: `${amountReim}/-` },
      {
        field: "Authority/Rule under which amount reimbursable",
        headerName: CGHS_Type,
      },
      {
        field: "No. of emergency claim during 2024-24",
        headerName: "_____1____",
      },
    ];

    const tableCell = { border: "1px solid black", padding: "5px" };

    return (
      <Box ref={ref} style={{}}>
        <Container
          sx={{
            width: "70%",
            // marginTop: "10px",
            marginLeft: "170px",
          }}
          className="print-container"
        >
          <Box sx={{ paddingTop: "60px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                padding: "8px 20px",
                fontSize: "12px",
              }}
            >
              {`File No. D-12015/ ${fileNumber} /2024-Admin.IV`}
            </Box>
            <Box
              p={1}
              fontSize={"12px"}
            >{`Medical Reimbursement Claim (Flag/PUC) recived in r/o , UPSC as per the details furnished below: `}</Box>
            <Table sx={{ margin: "0 8px" }}>
              <TableBody sx={{ border: "1px solid black" }}>
                {columns.map((data: any, i: any) => (
                  <TableRow
                    sx={{
                      border: "1px solid black",
                      height: "10px",
                      fontSize: "10px",
                    }}
                    key={i}
                  >
                    <TableCell sx={{ ...tableCell, height: "10px" }}>
                      <Typography fontSize={"12px"}>{i + 1}.</Typography>
                    </TableCell>
                    <TableCell sx={{ ...tableCell, height: "10px" }}>
                      <Typography fontSize={"12px"}>{data.field}</Typography>
                    </TableCell>
                    <TableCell sx={{ ...tableCell, height: "10px" }}>
                      <Typography fontSize={"12px"}>
                        {data.headerName}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box p={1} display={"flex"} flexDirection={"column"} gap={2}>
              <Box>
                <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
                  {`14.  The rates of tests/investigations/treatment have been cross-checked with CGHS rates and found to be in order. The Data Sheet for admissible amount is at page ___/corr.`}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
                  {`Remark: ${remark}`}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
                  {`15.  JS(Admn.), UPSC, being the competent authority [As per Office Order No. A-36019/1/96-Admn.I dt. 20/04/2005], may be requested to sanction the admissible amount of Rs.${data.amount_Claimed}/- (Rupees${AmountInWord} Only) to ${data.name}`}
                </Typography>
              </Box>
              <Box my={1}>
                {[
                  "SO(Admn.IV)",
                  "US(Admn.II)- L.O.",
                  "DS(SKG)",
                  "JS(Admn.)",
                ].map((text, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                      textDecoration: "underline",
                      padding: "2px 0",
                    }}
                  >
                    {text}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>

        <Container
          sx={{ width: "70%", marginTop: "200px", mr: "500px" }}
          className="print-container"
        >
          <Box sx={{ paddingTop: "80px", paddingLeft: "60px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "8px 20px",
                fontSize: "12px",
                textAlign: "center",
                // mt: 100,
              }}
            >
              {`File No. D-12015/ ${fileNumber} /2024-Admin.IV`}
            </Box>

            <Box p={1} display={"flex"} flexDirection={"column"} gap={2}>
              <Box>
                <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
                  {`1. Reference preceding note at page __/ ante.`}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
                  {`2. As per the approval of the JS(Admn.), UPSC a fair Medical bill bearing No. ____________ for Rs.${data.amount_Claimed}/- (${AmountInWord} Only) in respect of Sh. ${data.name}, UPSC is prepared and put up for signature of DDO please.`}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
                  {`3. US(Admn.II), UPSC as controlling officer may countersign the bill. Necessary entries have been made in the relevant register at page no. ____, which may be attested by the SO(Admn.IV) please.`}
                </Typography>
              </Box>

              <Box my={1}>
                {["SO(ADMN-IV)", "DDO", "US(Admn.II)-L.O"].map(
                  (text, index) => (
                    <Typography
                      key={index}
                      sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        textDecoration: "underline",
                        padding: "2px 0",
                      }}
                    >
                      {text}
                    </Typography>
                  )
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
);

PrintData.displayName = "PrintData";
export default PrintData;
