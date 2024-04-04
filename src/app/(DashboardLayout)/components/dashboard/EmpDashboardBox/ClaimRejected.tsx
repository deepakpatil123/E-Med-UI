import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

export const ClaimRejected = (props: any) => {
  const { value, sx } = props;
  // const stringValur = value.toString();

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
              variant="overline"
            >
              Number of Claims Rejected
            </Typography>
            <Typography variant="h4">{isNaN(value) ? 0 : value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ThumbDownOffAltIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

ClaimRejected.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
