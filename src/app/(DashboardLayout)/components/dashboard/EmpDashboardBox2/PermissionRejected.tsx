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

export const PermissionRejected = (props: any) => {
  const { value, sx } = props;
  // const stringValur = value.toString();

  return (
    <Card sx={{boxShadow:"0 10px 10px 20px rgb(176 184 214 / 9%), 2px -4px 10px -5px #b0b8d6"}}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={1}
        >
          <Stack spacing={0.5}>
            <Typography
              letterSpacing={1}
              color="text.secondary"
              variant="overline"
              textTransform='capitalize'
              lineHeight='25px' 
            >
              No. of Permission Rejected
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 45,
              width: 45,
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

PermissionRejected.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
