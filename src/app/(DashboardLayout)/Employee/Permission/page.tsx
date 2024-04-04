"use client";
import {
  Box,
  Button,
  Dialog,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PermissionForm from "../../components/forms/PermissionForm/PermissionForm";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import axiosApi from "@/utils/axiosApi";
import ClaimForm from "../../components/forms/ClaimForm/ClaimForm";
import { BACKEND_BASE_URL } from "@/config";

const Boxx = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  alignItems: "flex-start",
  textAlign: "left",
  margin: "10px auto",
});
const Typographyy = styled(Typography)({
  padding: "0 10px",
});

const PermissionList = () => {
  const auth: any = useAuth();
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [printDialogOpen1, setPrintDialogOpen1] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [EmpData, setEmpData] = useState<any>([]);
  const [familyCards, setFamilyCards] = useState([]);
  const [empCards, setEmpCards] = useState([]);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);

  const EmpId = auth?.user?.data?.emp?._id;
  const route = useRouter();
  const abortControllerRef = useRef(new AbortController());

  const handlePrintDialogOpen = (person: any) => {
    setSelectedPerson(person);
    setPrintDialogOpen(true);
  };

  const handlePrintDialogClose = () => {
    setPrintDialogOpen(false);
  };

  const handlePrintDialogOpen1 = (person: any) => {
    setSelectedPerson(person);
    setPrintDialogOpen1(true);
  };

  const handlePrintDialogClose1 = () => {
    setPrintDialogOpen1(false);
  };

  const handleApplyButtonClick = (person: any) => {
    setSelectedPerson(person);
    setApplyDialogOpen(true);
  };

  const handleApplyDialogClose = () => {
    setApplyDialogOpen(false);
  };

  const getUpdatedEmp = async () => {
    try {
      const config = {
        url: `/api/medical/getEmployee/${EmpId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth.user.token}`,
        },
      };

      const response = await axiosApi(
        config.url,
        config.method,
        config.headers
      );

      // console.log(response, "RESPO");

      if (response) {
        setEmpData(response?.data);

        const familyCardsData = response?.data?.family?.map((i: any) => {
          const arr = i.upload_CGHS.split("\\");
          return arr[arr.length - 1];
        });

        setFamilyCards(familyCardsData);

        const file = response?.data?.upload_CGHS.split("\\");
        setEmpCards(file[file.length - 1]);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Request aborted");
      } else {
        console.error(error, "Error! While updating employee");
      }
    }
  };

  useEffect(() => {
    getUpdatedEmp();
  }, [EmpId, abortControllerRef]);

  const EmpData1: any = [EmpData];

  const FamilyData = EmpData?.family;

  return (
    <Grid
      sx={{
        display: "flex",
        // flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {EmpData1.map((self: any, i: any) => {
        return (
          <Stack
            key={i}
            sx={{
              backgroundColor: "white",
              p: 2,
              borderRadius: "6px",
              width: "300px",
              margin: "5px",
            }}
          >
            <Box>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BACKEND_BASE_URL}/uploads/${empCards}`}
                alt=""
                height={200}
                width="100%"
              />
            </Box>
            <Box my={2}>
              <Boxx>
                <Typographyy>Relation:</Typographyy>
                <Typographyy>{self?.relation}</Typographyy>
              </Boxx>
              <Boxx>
                <Typographyy>Name:</Typographyy>
                <Typographyy>{self?.name}</Typographyy>
              </Boxx>
              <Boxx>
                <Typographyy>CGHS No:</Typographyy>
                <Typographyy>{self?.CGHS_card_number}</Typographyy>
              </Boxx>
              <Boxx>
                <Typographyy>Blood Group:</Typographyy>
                <Typographyy>{self?.blood_group}</Typographyy>
              </Boxx>
              <Boxx>
                <Typographyy>Validity:</Typographyy>
                <Typographyy>{self?.validity_date}</Typographyy>
              </Boxx>
              <Boxx>
                <Typographyy>Date Of Birth:</Typographyy>
                <Typographyy>{self?.date_of_birth}</Typographyy>
              </Boxx>
            </Box>
            <Box sx={{ display: "flex", gap: "1em" }}>
              <Button
                onClick={() => handleApplyButtonClick(self)}
                variant="contained"
              >
                Apply
              </Button>
            </Box>
          </Stack>
        );
      })}

      {FamilyData &&
        FamilyData.map((familyMember: any, i: any) => {
          return (
            <Stack
              key={i}
              sx={{
                backgroundColor: "white",
                p: 2,
                borderRadius: "6px",
                width: "300px",
                margin: "5px",
              }}
            >
              <Box>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BACKEND_BASE_URL}/uploads/${familyCards[i]}`}
                  alt=""
                  height={200}
                  width="100%"
                />
              </Box>
              <Box my={2}>
                <Boxx>
                  <Typographyy>Relation:</Typographyy>
                  <Typographyy>{familyMember.relation}</Typographyy>
                </Boxx>
                <Boxx>
                  <Typographyy>Name:</Typographyy>
                  <Typographyy>{familyMember.name}</Typographyy>
                </Boxx>
                <Boxx>
                  <Typographyy>CGHS No:</Typographyy>
                  <Typographyy>{familyMember.CGHS_card_number1}</Typographyy>
                </Boxx>
                <Boxx>
                  <Typographyy>Blood Group:</Typographyy>
                  <Typographyy>{familyMember.blood_group}</Typographyy>
                </Boxx>
                <Boxx>
                  <Typographyy>Validity:</Typographyy>
                  <Typographyy>{familyMember.validity_date}</Typographyy>
                </Boxx>
                <Boxx>
                  <Typographyy>Date Of Birth:</Typographyy>
                  <Typographyy>{familyMember.date_of_birth}</Typographyy>
                </Boxx>
              </Box>
              <Box sx={{ display: "flex", gap: "1em" }}>
                <Button
                  onClick={() => handleApplyButtonClick(familyMember)}
                  variant="contained"
                >
                  Apply
                </Button>
              </Box>
              <Box></Box>
            </Stack>
          );
        })}

      {applyDialogOpen && (
        <Dialog open={applyDialogOpen} maxWidth="xs" fullWidth>
          <Box p={2}>
            <Typography variant="h6" gutterBottom>
              Select an option:
            </Typography>
            <Button
              variant="contained"
              color="error"
              style={{
                position: "absolute",
                top: "0",

                marginLeft: "22.7rem",
              }}
              onClick={handleApplyDialogClose}
            >
              X
            </Button>
            <Box mt={2}>
              <Button
                onClick={() => {
                  handlePrintDialogOpen(selectedPerson);
                  handleApplyDialogClose();
                }}
                variant="contained"
                sx={{ mr: 3 }}
              >
                Apply For Permission
              </Button>
              <Button
                onClick={() => {
                  handlePrintDialogOpen1(selectedPerson);
                  handleApplyDialogClose();
                }}
                variant="contained"
              >
                Apply For Claim
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}

      {printDialogOpen && (
        <Dialog
          open={printDialogOpen}
          maxWidth="lg"
          fullWidth
        >
          <Box height={"100vh"}>
            <PermissionForm
              family={selectedPerson}
              empData={EmpData1}
              close={handlePrintDialogClose}
            />
          </Box>
        </Dialog>
      )}

      {printDialogOpen1 && (
        <Dialog
          open={printDialogOpen1}
          maxWidth="lg"
          fullWidth
        >
          <Box height={"100vh"}>
            <ClaimForm
              family={selectedPerson}
              empData={EmpData1}
              onClose={handlePrintDialogClose1}
            />
          </Box>
        </Dialog>
      )}
    </Grid>
  );
};

export default PermissionList;
