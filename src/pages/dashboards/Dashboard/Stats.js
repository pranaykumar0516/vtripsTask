import React from "react";
import styled from "styled-components";

import {
  CardContent as MuiCardContent,
  Card as MuiCard,
  Typography as MuiTypography,
  Chip as MuiChip
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import MuiLinearProgress from "@material-ui/core/LinearProgress";

const Card = styled(MuiCard)(spacing);

const LinearProgress = styled(MuiLinearProgress)(spacing);

const Typography = styled(MuiTypography)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 75%;
  position: absolute;
  right: 16px;
  top: 20px;
`;

const CardContent = styled(MuiCardContent)`
  position: relative;
  margin: ${props => props.theme.spacing(1)}px;
`;

function Stats({ title, amount, chip, value }) {
  return (
    <Card mb={3}>
      <CardContent>
        <Typography variant="body2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" gutterBottom mt={3} mb={5}>
          {amount}
        </Typography>
        <Chip color="secondary" label={chip} />

        <LinearProgress variant="determinate" value={value} color="secondary" />
      </CardContent>
    </Card>
  );
}

export default Stats;
