import React from "react";
import styled from "styled-components";

import {
  Grid,
  Hidden,
  Divider as MuiDivider,
  Typography as MuiTypography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import Actions from "./Actions";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import Stats from "./Stats";
import Table from "./Table";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Dashboard() {
  return (
    <React.Fragment>
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h4" display="inline">
            Dashboard
          </Typography>
          <Typography variant="body2" ml={2} display="inline">
            Monday, 29 April 2019
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats title="Sales Today" amount="2.532" chip="Today" value={75} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats title="Visitors" amount="170.212" chip="Annual" value={25} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Total Earnings"
            amount="$ 24.300"
            chip="Yearly"
            value={85}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats title="Pending Orders" amount="45" chip="Annual" value={30} />
        </Grid>
        <Hidden lgDown>
          <Grid item xs={12} sm={12} md={6} lg={3} xl>
            <Stats
              title="Total Revenue"
              amount="$ 86.200"
              chip="Yearly"
              value={30}
            />
          </Grid>
        </Hidden>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <LineChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <PieChart />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={4}>
          <BarChart />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Table />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Dashboard;
