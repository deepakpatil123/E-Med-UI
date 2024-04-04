import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

import PendingActionsIcon from "@mui/icons-material/PendingActions";

export const ClaimPending = (props: any) => {
  const { value, sx } = props;

  return (
    <Card sx={{boxShadow:"0 10px 10px 20px rgb(176 184 214 / 9%), 2px -4px 10px -5px #b0b8d6"}}>
      <CardContent sx={{borderLeft:".25rem solid #ffae1f"}}>
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
              gutterBottom
              variant="overline"
              textTransform='inherit'
              lineHeight='25px'  
            >
              Total Claims Pending
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 45,
              width: 45,
            }}
          >
            <SvgIcon>
              <PendingActionsIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {/* <Box sx={{ mt: 3 }}>
          <LinearProgress value={value} variant="determinate" />
        </Box> */}
      </CardContent>
    </Card>
  );
};

ClaimPending.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object,
};
