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

export const PermissionPending = (props: any) => {
  const { value, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              letterSpacing={1}
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              Total Permission Pending
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
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

PermissionPending.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object,
};
