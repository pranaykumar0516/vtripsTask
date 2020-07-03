import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import Default from "./Default";
import Hybrid from "./Hybrid";
import LightStyle from "./LightStyle";
import DarkStyle from "./DarkStyle";
import Streetview from "./Streetview";
import Markers from "./Markers";

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography as MuiTypography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Typography = styled(MuiTypography)(spacing);

class Maps extends React.Component {
  render() {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom display="inline">
        Maps
      </Typography>

      {/* <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Typography>Maps</Typography>
      </Breadcrumbs>

      <Divider my={6} /> */}

      {/* <Grid container spacing={6}> */}
        {/* <Grid item xs={12} md={6}> */}
          <Default />
        {/* </Grid> */}
        {/* <Grid item xs={12} md={6}>
          <Hybrid />
        </Grid>
        <Grid item xs={12} md={6}>
          <LightStyle />
        </Grid>
        <Grid item xs={12} md={6}>
          <DarkStyle />
        </Grid>
        <Grid item xs={12} md={6}>
          <Streetview />
        </Grid>
        <Grid item xs={12} md={6}>
          <Markers />
        </Grid> */}
      {/* </Grid> */}
    </React.Fragment>
  );
      }
}

export default Maps;
