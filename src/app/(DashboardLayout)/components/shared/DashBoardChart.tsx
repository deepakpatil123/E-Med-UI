import PropTypes from "prop-types";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Chart } from "./Chart";

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: true,
      },
    },
    colors: [
      theme.palette.primary.main,
      alpha(theme.palette.primary.main, 0.25),
    ],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,

      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "80px",
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: false,
      },
      categories: [
        "Total Claim",
        "Total Permissions",
        "Approved Claim",
        "Approved Permissions",
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: any) => value,

        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};

export const DashBoardChart = (props: any) => {
  const { chartSeries, sx } = props;
  const chartOptions = useChartOptions();

  return (
    <Card sx={{boxShadow:"0 10px 10px 20px rgb(176 184 214 / 9%), 2px -4px 10px -5px #b0b8d6"}}>
      <CardHeader title="Year Wise Permissions" sx={{borderBottom:"1px solid #e3e6f0"}}/>
      <CardContent>
        <Chart
          height={300}
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
        />
      </CardContent>
      <Divider />
    </Card>
  );
};

DashBoardChart.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object,
};
