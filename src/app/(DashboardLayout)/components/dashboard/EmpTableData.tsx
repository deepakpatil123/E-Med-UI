import { format } from "date-fns";
import PropTypes from "prop-types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { useState } from "react";
import DetailPermTable from "../shared/DetailPermTable";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/config";
import { enqueueSnackbar } from "notistack";

export const OverviewLatestOrders = (props: any) => {
  const [dialogOpen, setDailogOpen] = useState(false);
  const [currentPerm, setCurrentPerm] = useState([]);
  const { orders, sx, fn } = props;

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

  const handleDialogOpen = () => {
    setDailogOpen(true);
  };

  const handleDailogClose = () => {
    setDailogOpen(false);
  };

  const handleDeletePermission = async (id: any) => {
    const res: any = await axios.put(
      `${BACKEND_BASE_URL}/api/medical/delete_permission/${id}`
    );

    if (res.status === 200) {
      enqueueSnackbar("Permission Deleted Successfully", {
        autoHideDuration: 3000,
        variant: "success",
      });
    }
    fn();
  };
  return (
    <Card sx={sx}>
      <CardHeader title="Applied Permission" />
      <Box sx={{ minWidth: 700 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "700" }}>S No.</TableCell>{" "}
              <TableCell sx={{ fontWeight: "700" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Designation</TableCell>
              <TableCell sx={{ fontWeight: "700" }} sortDirection="desc">
                Relation
              </TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Current Status</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>More Details</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>
                Delete Permission
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              ?.filter((order: any) => order.is_deleted === false)
              .map((order: any, index: any) => {
                return (
                  <TableRow hover key={order._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order.employee.name}</TableCell>
                    <TableCell>{order.employee.designation}</TableCell>
                    <TableCell>{order.relation}</TableCell>
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
                          setCurrentPerm(order);
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
                          onClick={() => handleDeletePermission(order._id)}
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
              <DetailPermTable
                onClose={handleDailogClose}
                permissionData={currentPerm}
              />
            </Box>
          </Dialog>
        )}
      </Box>
      <Divider />
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
