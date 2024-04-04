"use client";
import { Box, Grid } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import PageContainer from "../components/container/PageContainer";
import DashboardNew from "../components/shared/DashboardNew";
import { DashboardPie } from "../components/shared/DashboardPie";
import { DashBoardChart } from "../components/shared/DashBoardChart";

//ICONS
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AddTaskIcon from "@mui/icons-material/AddTask";

import { TotalClaim } from "../components/dashboard/EmpDashboardBox/TotalClaim";
import { ClaimApproved } from "../components/dashboard/EmpDashboardBox/ClaimApproved";
import { ClaimPending } from "../components/dashboard/EmpDashboardBox/ClaimPending";
import { ClaimRejected } from "../components/dashboard/EmpDashboardBox/ClaimRejected";
import { OverviewLatestOrders } from "../components/dashboard/EmpTableData";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/config";
import { OverviewLatestOrders2 } from "../components/dashboard/EmpTableData2";
import { AdminBox } from "../components/dashboard/AdminDashBox/AdminBox";
import { PermissionApproved } from "../components/dashboard/EmpDashboardBox2/PermissionApproved";
import { PermissionPending } from "../components/dashboard/EmpDashboardBox2/PermissionPending";
import { PermissionRejected } from "../components/dashboard/EmpDashboardBox2/PermissionRejected";
import { TotalPermission } from "../components/dashboard/EmpDashboardBox2/TotalPermission";

const Dashboard = () => {
  const { user }: any = useAuth();
  const auth: any = useAuth();
  // const router: any = useRouter();
  // const [id, setId] = React.useState(auth.user.data.emp._id);
  // const [permissionsData, setPermission] = React.useState<any>();
  const [claims, setClaims] = React.useState<any>();
  const [ALLClaims, setALLClaim] = React.useState<any>();
  const [ALLPermissions, setALLPermissions] = React.useState<any>();
  const [AllPermission, setAllPer] = React.useState<any>();

  const handleFetchpermission = async () => {
    let permissions = await axios.get(
      `${BACKEND_BASE_URL}/api/medical/get_permission/${user?.data?.emp?._id}`
    );

    setAllPer(permissions.data.data);
  };

  useEffect(() => {
    if (user?.data?.emp?._id) {
      handleFetchpermission();
    }
  }, [user?.data?.emp?._id]);

  const approvedPer: any = AllPermission?.filter(
    (claim: any) => claim.currentStatus === "Approved"
  );

  const getAllClaims = async () => {
    const res: any = await axios.get(
      `${BACKEND_BASE_URL}/api/medical/get_claim/${user?.data?.emp?._id}`
    );

    setClaims(res.data);
  };

  useEffect(() => {
    if (user?.data?.emp?._id) {
      getAllClaims();
    }
  }, [user?.data?.emp?._id]);

  const getAlltheClaims = async () => {
    const res: any = await axios.get(
      `${BACKEND_BASE_URL}/api/medical/get_all_claim`
    );

    setALLClaim(res.data);
  };

  useEffect(() => {
    getAlltheClaims();
  }, []);

  const getAllthePermissions = async () => {
    let permissions = await axios.get(
      `${BACKEND_BASE_URL}/api/medical/get_all_permission`
    );

    setALLPermissions(permissions.data.data);
  };

  useEffect(() => {
    getAllthePermissions();
  }, []);

  let pending: any = 0;
  let rejected: any = 0;
  let pending2: any = 0;

  let allclaimPending: any = 0;
  let allpendingPermissions: any = 0;

  for (let i = 0; i < claims?.data.length; i++) {
    if (claims?.data[i].currentStatus === "Open") {
      pending++;
    }
  }

  for (let i = 0; i < AllPermission?.length; i++) {
    if (AllPermission[i]?.currentStatus === "Open") {
      pending2++;
    }
  }

  for (let i = 0; i < ALLClaims?.data.length; i++) {
    if (ALLClaims?.data[i].currentStatus === "Open") {
      allclaimPending++;
    }
  }

  for (let i = 0; i < ALLPermissions?.length; i++) {
    if (ALLPermissions[i]?.currentStatus === "Open") {
      allpendingPermissions++;
    }
  }

  const allapprovedClaims: any = ALLClaims?.data.filter(
    (claim: any) => claim.currentStatus === "Approved"
  );
  const allapprovedClaimCount: any = Number(allapprovedClaims?.length);

  const allapprovedPermissions: any = ALLPermissions?.filter(
    (permission: any) => permission.currentStatus === "Approved"
  );
  const allapprovedPermissionCount: any = Number(
    allapprovedPermissions?.length
  );

  const allrejectedClaims: any = ALLClaims?.data.filter(
    (claim: any) => claim.currentStatus === "Not Approved"
  );
  const allrejectedClaimCount: any = Number(allrejectedClaims?.length);

  const allrejectedPermission: any = ALLPermissions?.filter(
    (permission: any) => permission.currentStatus === "Not Approved"
  );
  const allrejectedPermissionCount: any = Number(allrejectedPermission?.length);

  const approvedClaims: any = claims?.data.filter(
    (claim: any) => claim.currentStatus === "Approved"
  );
  const approvedCount: any = Number(approvedClaims?.length);

  const approvedPermissions: any = AllPermission?.filter(
    (permission: any) => permission.currentStatus === "Approved"
  );
  const approvedPermissionCount: any = Number(approvedPermissions?.length);

  const rejectedClaims: any = claims?.data.filter(
    (claim: any) => claim.currentStatus === "Not Approved"
  );
  const rejectedCount: any = Number(rejectedClaims?.length);

  const rejectedPermission: any = AllPermission?.filter(
    (permission: any) => permission.currentStatus === "Not Approved"
  );
  const rejectedPermissionCount: any = Number(rejectedPermission?.length);

  const totalSum = (AllPermission?.length || 0) + (claims?.data.length || 0);

  const permissionsPercentage = ((AllPermission?.length || 0) / totalSum) * 100;
  const claimsPercentage = ((claims?.data.length || 0) / totalSum) * 100;
  const totalFilesPercentage = totalSum;

  if (!auth?.user?.message) {
    return <p>Loading....</p>;
  } else if (auth?.user?.message?.includes("user")) {
    return (
      <PageContainer title="Welcome to Dashboard" description="">
        {/* <DashboardNew> */}
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                // gap: "20px",
                // bgcolor: "background.paper",
                borderRadius: 1,
                width: "100%",
              }}
            >
              <Grid xs={12} sm={6} lg={3}>
                <AdminBox
                  difference={12}
                  positive
                  sx={{ height: "100%", width: "250px" }}
                  value={ALLClaims?.data.length}
                  title="Total Claims"
                  backgroundColor="#ffe2e6"
                  icon={<NoteAltIcon />}
                />
              </Grid>

              <Grid xs={12} sm={6} lg={3}>
                <AdminBox
                  difference={16}
                  positive={false}
                  sx={{ height: "100%" }}
                  value={allapprovedClaimCount}
                  title="Approved Claims"
                  backgroundColor="#fff4de"
                  icon={<AddTaskIcon />}
                />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <AdminBox
                  sx={{ height: "auto" }}
                  value={allrejectedClaimCount}
                  title="Rejected Claims"
                  backgroundColor="#dcfce7"
                  icon={<NoteAltIcon />}
                />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <AdminBox
                  sx={{ height: "auto"}}
                  value={allclaimPending}
                  title="Pending Claims"
                  backgroundColor="#f1e2ff"
                  icon={<AddTaskIcon />}
                />
              </Grid>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                 gap: "20px",
                // gap: "20px",
                // bgcolor: "background.paper",
                borderRadius: 1,
                width: "100%",
                marginTop: 2,
              }}
            >
              <Grid xs={12} sm={6} lg={3}>
                <AdminBox
                  difference={12}
                  positive
                  sx={{ height: "auto"}}
                  value={ALLPermissions?.length}
                  title="Total Permissions"
                  backgroundColor="#ffe2e6"
                  icon={<NoteAltIcon />}
                />
              </Grid>

              <Grid xs={12} sm={6} lg={3}>
                <AdminBox
                  difference={16}
                  positive={false}
                  sx={{ height: "auto"}}
                  value={allapprovedPermissionCount}
                  title="Approved Permissions"
                  backgroundColor="#fff4de"
                  icon={<AddTaskIcon />}
                />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <AdminBox
                  sx={{ height: "auto"}}
                  value={allrejectedPermissionCount}
                  title="Rejected Permissions"
                  backgroundColor="#dcfce7"
                  icon={<NoteAltIcon />}
                />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <AdminBox
                  sx={{ height: "auto"}}
                  value={allpendingPermissions}
                  title="Pending Permission"
                  backgroundColor="#f1e2ff"
                  icon={<AddTaskIcon />}
                />
              </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                // borderRadius: 1,
                marginTop: "20px",
                justifyContent: "space-between",
              }}
            >
              <Grid width={"100%"}>
                <DashBoardChart
                  chartSeries={[
                    {
                      name: "This Year",
                      data: [
                        Number(ALLClaims?.data.length),
                        Number(ALLPermissions?.length),
                        Number(allapprovedClaimCount),
                        Number(allapprovedPermissionCount),
                      ],
                    },
                  ]}
                  sx={{ height: "auto" }}
                />
              </Grid>

              <Grid width={"50%"}>
                <DashboardPie
                  chartSeries={[
                    Number(ALLPermissions?.length),
                    Number(ALLPermissions?.length + ALLClaims?.data.length),
                    Number(ALLClaims?.data.length),
                  ]}
                  labels={["Permissions", "Total Claim/Permission", "Claims"]}
                  sx={{ height: "auto" }}
                />
              </Grid>
            </Box>
          </>
        {/* </DashboardNew> */}
      </PageContainer>
    );
  }
   else {
    return (
      <Grid 
        component="main"
        sx={{
          width: "100%",
          flexGrow: 1,
          // py: 8,
          // pl: 5, 
        }}
      >
        <Grid>
        {/* <DashboardNew> */}
          <Box>
            <Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "20px",
                  bgcolor: "none",
                  borderRadius: 1,
                  // marginTop: "20px",
                  width: "100%",
                }}
              >
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TotalClaim
                    difference={12}
                    positive
                    sx={{ height: "auto" }}
                    value={claims?.data.length}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <ClaimApproved
                    difference={16}
                    positive={false}
                    sx={{ height: "auto"}}
                    value={approvedCount}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <ClaimPending
                    sx={{ height: "auto" }}
                    value={pending}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <ClaimRejected
                    sx={{ height: "auto"}}
                    value={rejectedCount}
                  />
                </Grid>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "20px",
                  bgcolor: "none",
                  borderRadius: 1,
                  marginTop: "20px",
                  width: "100%",
                }}
              >
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TotalPermission
                    difference={12}
                    positive
                    sx={{ height: "auto", textTransform:"lowercase" }}
                    value={AllPermission?.length}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <PermissionApproved
                    difference={16}
                    positive={false}
                    sx={{ height: "100%" }}
                    value={approvedPermissionCount}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <PermissionPending
                    sx={{ height: "100%" }}
                    value={pending2}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <PermissionRejected
                    sx={{ height: "100%" }}
                    value={rejectedPermissionCount}
                  />
                </Grid>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  // borderRadius: 1,
                  marginTop: "20px",
                  justifyContent: "space-between",
                }}
              >
                <Grid width={"100%"}>
                  <DashBoardChart
                    chartSeries={[
                      {
                        name: "This year",
                        data: [
                          Number(claims?.data.length),
                          Number(AllPermission?.length),
                          approvedCount,
                          approvedPermissionCount,
                        ],
                      },
                      // {
                      //   name: "Last year",
                      //   data: [12, 11, 4, 6],
                      // },
                    ]}
                    sx={{ height: "100%" }}
                  />
                </Grid>

                <Grid width={"50%"}>
                  <DashboardPie
                    chartSeries={[
                      Number(AllPermission?.length),
                      Number(AllPermission?.length + claims?.data.length),
                      Number(claims?.data.length),
                    ]}
                    labels={["Permissions", "Total Claim/Permission", "Claims"]}
                    sx={{ height: "100%" }}
                  />
                </Grid>
              </Box>
              </Box>
          </Box>
           {/* </DashboardNew> */}
        </Grid>
      </Grid>
    );
  }
};

export default Dashboard;
