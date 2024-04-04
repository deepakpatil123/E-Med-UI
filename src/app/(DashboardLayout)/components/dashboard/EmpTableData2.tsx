import { format } from "date-fns";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Chip,
  Dialog,
  Divider,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/config";
import { useState } from "react";
import DetailClaimTable from "../shared/DetailClaimTable";
import { enqueueSnackbar } from "notistack";

export const OverviewLatestOrders2 = (props: any) => {
  const { orders = [], sx, fn2 } = props;
  const [dialogOpen, setDailogOpen] = useState(false);
  const [claim, setClaim] = useState([]);
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

  const handleDeleteClaim = async (id: any) => {
    const res: any = await axios.put(
      `${BACKEND_BASE_URL}/api/medical/delete_claim/${id}`
    );

    if (res.status === 200) {
      enqueueSnackbar("Claim Deleted Successfully", {
        autoHideDuration: 3000,
        variant: "success",
      });
    }
    fn2();
  };

  const handleDialogOpen = () => {
    setDailogOpen(true);
  };

  const handleDailogClose = () => {
    setDailogOpen(false);
  };

  return (
    <Card sx={sx}>
      <CardHeader title="Applied Claims" />
      <Box sx={{ minWidth: 700 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "700" }}>S No.</TableCell>{" "}
              <TableCell sx={{ fontWeight: "700" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Designation</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Relation</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Current Status</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>More Details</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Delete Claim</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              ?.filter((order: any) => order.is_deleted === false)
              .map((order: any, index: any) => {
                return (
                  <TableRow hover key={order._id}>
                    <TableCell>{index + 1}</TableCell>{" "}
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.designation}</TableCell>
                    <TableCell>{order.relation}</TableCell>{" "}
                    <TableCell>
                      <Chip
                        label={order.currentStatus}
                        color={getColorForStatus(order.currentStatus)}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: "700" }}>
                      <IconButton
                        sx={{
                          marginLeft: 3,
                        }}
                        onClick={() => {
                          handleDialogOpen();
                          setClaim(order);
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                    {order.currentStatus === "Open" ? (
                      <TableCell>
                        <IconButton
                          sx={{
                            marginLeft: 5,
                          }}
                          onClick={() => handleDeleteClaim(order._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <Typography
                          sx={{
                            textAlign: "center",
                            marginTop: 3,
                            marginRight: 5,
                          }}
                        >
                          N/A
                        </Typography>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        {dialogOpen && (
          <Dialog open={dialogOpen} maxWidth="lg" fullWidth>
            <Box height={"100vh"}>
              <DetailClaimTable onClose={handleDailogClose} claimData={claim} />
            </Box>
          </Dialog>
        )}
      </Box>
      <Divider />
    </Card>
  );
};

OverviewLatestOrders2.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
