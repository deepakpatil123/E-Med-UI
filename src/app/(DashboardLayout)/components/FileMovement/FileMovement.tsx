import {
  Box,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import React from "react";

const Light = styled(Typography)({
  fontSize: "14px",
});
const FileMovement = ({ product }: any) => {
  const Movement = product.movement;
  return (
    <>
      <TableHead sx={{ backgroundColor: "#5D87FF" }}>
        <TableRow sx={{ border: "1px solid black" }}>
          <TableCell sx={{ border: "1px solid black" }}>
            <Typography color="white" variant="subtitle2" fontWeight={500}>
              File Forwarded From
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid black" }}>
            <Typography color="white" variant="subtitle2" fontWeight={500}>
              File Forwarded To
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid black" }}>
            <Typography color="white" variant="subtitle2" fontWeight={500}>
              Status
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid black" }}>
            <Typography color="white" variant="subtitle2" fontWeight={500}>
              Date
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid black" }}>
            <Typography color="white" variant="subtitle2" fontWeight={500}>
              Remark
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Movement.slice(1).map((data: any, index: number) => (
          <TableRow sx={{ border: "1px solid black" }} key={index}>
            <TableCell sx={{ border: "1px solid black" }}>
              <Light>{data.forwardedBy}</Light>
            </TableCell>
            <TableCell sx={{ border: "1px solid black" }}>
              <Light>{data.forwardedTo}</Light>
            </TableCell>
            <TableCell sx={{ border: "1px solid black" }}>
              <Light>{data.status}</Light>
            </TableCell>
            <TableCell sx={{ border: "1px solid black" }}>
              <Light>{data.forwardedAt.slice(0, 10)}</Light>
            </TableCell>
            <TableCell sx={{ border: "1px solid black" }}>
              <Light>{data.remarks}</Light>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default FileMovement;
