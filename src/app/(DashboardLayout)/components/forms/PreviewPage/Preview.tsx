import React from "react";
import DashboardCard from "../../shared/DashboardCard";
import { Grid, styled, Paper, Modal, Typography, Box } from "@mui/material";

function Preview(props: any) {
  const obj = props.data;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid container>
      {Object.entries(obj).map((item: any, index: number) => {
        if (
          !item[0].startsWith("_") &&
          !item[0].endsWith("At") &&
          typeof item[1] !== "boolean" &&
          !item[0].includes("id") &&
          !item[0].includes("movement")
        ) {
          return (
            <Grid item xs={6} key={index}>
              <strong>
                {item[0].charAt(0).toUpperCase() +
                  item[0].replace(/_/g, " ").slice(1)}{" "}
              </strong>
              :- {item[1]}
            </Grid>
          );
        }
      })}

      {/* {obj.map((ele) => {
        return (
          <Box key={ele._id}>
            <Typography>{ele.name}</Typography>
          </Box>
        );
      })} */}
    </Grid>
  );
}

export default Preview;
