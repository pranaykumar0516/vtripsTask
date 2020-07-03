import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import {
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardMedia as MuiCardMedia,
  Divider as MuiDivider,
  Typography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Button = styled(MuiButton)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;

function SimpleCard() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be•nev•o•lent
        </Typography>
        <Typography color="textSecondary">adjective</Typography>
        <Typography component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

function MediaCard() {
  return (
    <Card mb={6}>
      <CardActionArea>
        <CardMedia
          image="/static/img/animals/reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

function Cards() {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom display="inline">
        Cards
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Dashboard
        </Link>
        <Link component={NavLink} exact to="/">
          Components
        </Link>
        <Typography>Cards</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <MediaCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <SimpleCard />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Cards;
