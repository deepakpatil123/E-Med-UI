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

export const AdminBox = (props: any) => {
  const { sx, value, title, backgroundColor, icon } = props;

  return (
    <Card sx={{boxShadow:"0 10px 10px 20px rgb(176 184 214 / 9%),2px -4px 10px -5px #b0b8d6"}}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={1}
        >
          <Stack spacing={1}>
            <Typography
              letterSpacing={0.5}
              // color="text.secondary"
              variant="overline" 
              color="text.secondary" 
              textTransform='inherit'
              lineHeight='25px' 
            >
              {title}
            </Typography>
            <Typography variant="h4">{`${value}`}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: { backgroundColor },
              color: "black",
              border: "4px solid lightgrey",
              height: 42,
              width: 42,
            }}
          >
            <SvgIcon>{icon}</SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

AdminBox.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.number.isRequired,
  sx: PropTypes.object,
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  icon: PropTypes,
};
