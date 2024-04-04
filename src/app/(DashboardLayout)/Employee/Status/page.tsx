"use client";
import React, { useEffect, useState } from "react";
import DashboardNew from "../../components/shared/DashboardNew";
import { Box, Grid } from "@mui/material";
import { OverviewLatestOrders2 } from "../../components/dashboard/EmpTableData2";
import { OverviewLatestOrders } from "../../components/dashboard/EmpTableData";
import axios from "axios";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import { BACKEND_BASE_URL } from "@/config";

type Props = {};

const Status = (props: Props) => {
  const { user }: any = useAuth();
  // const [id, setId] = useState();
  // const id = user?.data?.emp?._id
  // useEffect(() => {
  //   setId(user?.data?.emp?._id);
  // }, []);

  // console.log(id, "jnjknx");
  // const id = auth.user.data.emp._id;

  const [claims, setClaims] = useState<any>([]);
  const [permissions, setPermissions] = useState<any>();

  const getAllClaims = async () => {
    const res: any = await axios.get(
      `${BACKEND_BASE_URL}/api/medical/get_claim/${user?.data?.emp?._id}`
    );

    setClaims(res.data.data);
  };

  useEffect(() => {
    if (user?.data?.emp?._id) {
      getAllClaims();
    }
  }, [user?.data?.emp?._id]);

  const getPermissions = async () => {
    const res: any = await axios.get(
      `${BACKEND_BASE_URL}/api/medical/get_permission/${user?.data?.emp?._id}`
    );

    setPermissions(res.data.data);
  };

  useEffect(() => {
    if (user?.data?.emp?._id) {
      getPermissions();
    }
  }, [user?.data?.emp?._id]);

  return (
   
    // <DashboardNew>
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "space-between",
            flexDirection: "column", 
          }}
        >
          <Grid width={"100%"} xs={12} md={12} lg={8}>
            <OverviewLatestOrders2
              orders={claims}
              sx={{ height: "100%" }}
              fn2={getAllClaims}
            />
          </Grid>
          <Grid width={"100%"} xs={12} md={12} lg={8}>
            <OverviewLatestOrders
              orders={permissions}
              fn={getPermissions}
              sx={{ height: "100%" }}
            />
          </Grid>
        </Box>
      </>
    // </DashboardNew>
  );
};

export default Status;
