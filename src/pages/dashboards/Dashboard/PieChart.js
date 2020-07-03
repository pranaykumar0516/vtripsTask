import React from "react";
import styled, { withTheme } from "styled-components";

import {
  CardContent,
  Card as MuiCard,
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
  Table,
  TableBody,
  TableHead,
  Typography
} from "@material-ui/core";

import { green, orange, red } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";

import { Pie } from "react-chartjs-2";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 140px;
`;

const TableRow = styled(MuiTableRow)`
  height: 42px;
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

const GreenText = styled.span`
  color: ${() => green[500]};
`;

const RedText = styled.span`
  color: ${() => red[500]};
`;

const PieChart = ({ theme }) => {
  const data = {
    labels: ["Social", "Search Engines", "Direct", "Other"],
    datasets: [
      {
        data: [260, 125, 54, 146],
        backgroundColor: [
          theme.palette.secondary.main,
          orange[500],
          red[500],
          theme.palette.grey["300"]
        ],
        borderColor: "transparent"
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    }
  };

  return (
    <Card mb={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Weekly sales
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Pie data={data} options={options} />
        </ChartWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Source</TableCell>
              <TableCell align="right">Revenue</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Social
              </TableCell>
              <TableCell align="right">260</TableCell>
              <TableCell align="right">
                <GreenText>+35%</GreenText>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Search Engines
              </TableCell>
              <TableCell align="right">125</TableCell>
              <TableCell align="right">
                <RedText>-12%</RedText>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Direct
              </TableCell>
              <TableCell align="right">54</TableCell>
              <TableCell align="right">
                <GreenText>+46%</GreenText>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Other
              </TableCell>
              <TableCell align="right">146</TableCell>
              <TableCell align="right">
                <GreenText>+24%</GreenText>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default withTheme(PieChart);
