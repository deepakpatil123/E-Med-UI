"use client";

import React, { forwardRef, useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Box,
  Button,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
} from "@mui/material";
import axios from "axios";

const PrintNotesheet = forwardRef((props: any, ref) => {
  const [empData, setEmpData] = useState<any>([]);
  const {
    empId,
    hospital,
    DrName,
    alltests,
    hospitalDATA,
    familyMEM,
    RELATION,
    forWardedDate,
    FILE_num,
  } = props;

  const date = new Date(forWardedDate);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  // console.log(formattedDate);
  const shortenedFileId = FILE_num.slice(0, 5);

  const getEmpData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/medical/getEmployee/${empId}`
    );

    let result = res.data.data;
    setEmpData([result]);
  };

  useEffect(() => {
    getEmpData();
  }, [empId]);

  function getTodaysDate() {
    var today = new Date();

    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    var formattedDay = day < 10 ? "0" + day : day;
    var formattedMonth = month < 10 ? "0" + month : month;
    return formattedDay + "/" + formattedMonth + "/" + year;
  }

  var currentDate = getTodaysDate();
  return (
    <Container sx={{ width: "100%", mr: "48prem" }} className="print-container">
      {" "}
      {!empData ? (
        <p>Loading</p>
      ) : (
        empData.map((data: any) => {
          return (
            <Box
              ref={ref}
              sx={{
                p: 4,
                width: "100%",
              }}
              key={data._id}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography fontWeight="bold">
                    FileNo : {`${shortenedFileId}`}
                  </Typography>
                  <Typography fontWeight="bold">
                    Unoin Public Service Commission
                  </Typography>
                  <Typography fontWeight="bold">
                    (Sangh Lok Seva Aayog)
                  </Typography>
                  <Typography fontWeight="bold">
                    Dholpur House, Shahjahan Road
                  </Typography>
                  <Typography fontWeight="bold">New Delhi</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: "15px" }}>
                  name, designation , UPSC has submitted an application(flagged
                  PUC) requesting the office to accord the permission as per
                  details given below.
                </Typography>
                <Typography sx={{ fontSize: "15px" }}>
                  name, designation ,, ने संघ लोक सेवा आयोग में नीचे दिए गए
                  विवरण के अनुसार अनुमति प्रदान करने के लिए कार्यालय से अनुरोध
                  करते हुए आवेदन पत्र (विचारार्थ प्रस्ताव पताका पर) प्रस्तुत
                  किया है:-
                </Typography>
              </Box>

              <Box sx={{ display: "flex", mb: 2 }}>
                <Box sx={{ flex: 1, marginRight: 2 }}>
                  <Stack spacing={2}>
                    <Typography sx={{ fontSize: "15px" }}>
                      1. Name & Designation of the Govt. Servant
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      सरकारी सेवक का नाम एवं पदनाम
                    </Typography>
                  </Stack>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography>{`${data.name}`}</Typography>
                  <Typography>{`${data.designation}`}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", mb: 2 }}>
                <Box sx={{ flex: 1, marginRight: 2 }}>
                  <Stack spacing={2}>
                    <Typography sx={{ fontSize: "15px" }}>
                      2. Name of the Patient & his/her relationship with the
                      Govt. Servant.{" "}
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      रोगी का नाम एवं सरकारी सेवक के साथ उनका संबंध
                    </Typography>
                  </Stack>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography>{`${familyMEM}`}</Typography>
                  <Typography>{`${RELATION}`}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", mb: 2 }}>
                <Box sx={{ flex: 1, marginRight: 2 }}>
                  <Stack spacing={2}>
                    <Typography sx={{ fontSize: "15px" }}>
                      3. Whether CGHS/Non-CGHS Beneficiary{" "}
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      क्या केंद्रीय सरकार स्वास्थ्य योजना / गैर केंद्रीय सरकार
                      स्वास्थ्य योजना के लाभार्थी
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography>
                    {data.CGHS_card_number ? "Yes" : "No"}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", mb: 2 }}>
                <Box sx={{ flex: 1, marginRight: 2 }}>
                  <Stack spacing={2}>
                    <Typography sx={{ fontSize: "15px" }}>
                      4. C.G.H.S. Card No.{" "}
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      केंद्रीय सरकार स्वास्थ्य योजना कार्ड स
                    </Typography>
                  </Stack>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography> {`${data.CGHS_card_number}`}</Typography>
                </Box>
              </Box>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ border: "2px solid black", width: "25%" }}>
                      <Box>
                        <Typography
                          sx={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          Test/Treatment
                        </Typography>
                        <Typography
                          sx={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          इलाज की प्रकृति
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ border: "2px solid black", width: "25%" }}>
                      <Box>
                        <Typography
                          sx={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          Referred/Diagnosed/Endorsed by
                        </Typography>
                        <Typography
                          sx={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          भेजे गए / निदान किए गए पुष्टि करना
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ border: "2px solid black", width: "25%" }}>
                      <Box>
                        <Typography
                          sx={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          Referred/requested to
                        </Typography>
                        <Typography
                          sx={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          केंद्रीय सरकार स्वास्थ्य योजना रेफरल अस्पताल निदान
                          केंद्र द्वारा भेजा गया / | अनुरोध किया गया
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "2px solid black",
                        fontWeight: "bold",
                        width: "25%",
                      }}
                    >
                      Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ border: "2px solid black" }}>
                  {/* Example rows */}
                  <TableRow sx={{ border: "2px solid black" }}>
                    <TableCell
                      sx={{ border: "2px solid black" }}
                    >{`${alltests}`}</TableCell>
                    <TableCell
                      sx={{ border: "2px solid black" }}
                    >{`${DrName}`}</TableCell>
                    <TableCell
                      sx={{ border: "2px solid black" }}
                    >{`${hospital}`}</TableCell>
                    <TableCell sx={{ border: "2px solid black" }}>{`${
                      forWardedDate === undefined ? currentDate : formattedDate
                    }`}</TableCell>
                  </TableRow>
                  {/* Add more rows as needed */}
                </TableBody>
              </Table>

              <Box sx={{ mb: 2 }}>
                <Typography sx={{ mt: 2, fontSize: "15px" }}>
                  , UPSC being the competent authority, is requested to grant
                  permission for Test & Treatment to Sh. Sandeep Kumar, Deputy
                  Secretary UPSC as requested. A fair letter in anticipation of
                  the approval is attached for signature of US(Admn.IV) please.
                </Typography>
                <Typography sx={{ fontSize: "15px" }}>
                  , संघ लोक सेवा आयोग के सक्षम प्राधिकारी होने के कारण उनसे
                  अनुरोध किया जाता है कि Sh. Sandeep Kumar, Deputy Secretary,
                  संघ लोक सेवा आयोग को उनके द्वारा किए गए अनुरोध के अनुसार
                  अनुमति की स्वीकृति प्रदान करे । अनुमोदन की प्रत्याशा में एक
                  स्वच्छ पत्र अवर सचिव (प्रशा.IV) के हस्ताक्षर के लिए संलग्न है।
                </Typography>
              </Box>
              {/* <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  FILE MOVEMENT
                </Typography>
                <Typography>no history</Typography>
              </Box> */}
            </Box>
          );
        })
      )}
    </Container>
  );
});

PrintNotesheet.displayName = "PrintNotesheet";
export default PrintNotesheet;
