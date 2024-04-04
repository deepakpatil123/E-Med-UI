import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

import AddTaskIcon from "@mui/icons-material/AddTask";

export const ClaimApproved = (props: any) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={{boxShadow:"0 10px 10px 20px rgb(176 184 214 / 9%), 2px -4px 10px -5px #b0b8d6"}}>
      <CardContent sx={{borderLeft:".25rem solid #13deb9"}}>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              letterSpacing={0.5}
              color="text.secondary"
              variant="overline"
              textTransform='inherit'
              lineHeight='25px' 
            >
              Total Claims Approved
            </Typography>
            <Typography variant="h4">{`${value}`}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 45,
              width: 45,
            }}
          >
            <SvgIcon>
              <AddTaskIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {/* {difference && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={positive ? "success.main" : "error.main"}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="caption">
              Since last month
            </Typography>
          </Stack>
        )} */}
      </CardContent>
    </Card>
  );
};

ClaimApproved.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
