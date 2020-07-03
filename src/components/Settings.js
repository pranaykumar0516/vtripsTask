import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setTheme } from "../redux/actions/themeActions";

import {
  Typography,
  Drawer,
  ListItem,
  Fab as MuiFab,
  Paper as MuiPaper
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { Palette as PaletteIcon } from "@material-ui/icons";

const Paper = styled(MuiPaper)(spacing);

const Demo = styled(Paper)`
  cursor: pointer;
  text-align: center;
`;

const Fab = styled(MuiFab)`
  position: fixed;
  right: ${props => props.theme.spacing(8)}px;
  bottom: ${props => props.theme.spacing(8)}px;
`;

const Wrapper = styled.div`
  width: 250px;
`;

const Screenshot = styled.img`
  max-width: 100%;
  height: auto;
  border: 1px solid ${props => props.theme.palette.grey["300"]};
`;

const Heading = styled(ListItem)`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
  color: ${props => props.theme.palette.common.black};
  background: ${props => props.theme.palette.common.white};
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 56px;

  ${props => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }
`;

class Demos extends Component {
  state = {
    anchorMenu: null
  };

  toggleMenu = event => {
    this.setState({ anchorMenu: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorMenu: null });
  };

  render() {
    const { dispatch } = this.props;

    return (
      <Wrapper>
        <Heading>Select a demo</Heading>
        <Demo m={4} onClick={() => dispatch(setTheme(0))}>
          <Typography variant="h6" gutterBottom>
            Blue
          </Typography>
          <Screenshot alt="Blue" src="/static/img/screenshots/blue.png" />
        </Demo>
        <Demo m={4} onClick={() => dispatch(setTheme(1))}>
          <Typography variant="h6" gutterBottom>
            Green
          </Typography>
          <Screenshot alt="Green" src="/static/img/screenshots/green.png" />
        </Demo>
        <Demo m={4} onClick={() => dispatch(setTheme(2))}>
          <Typography variant="h6" gutterBottom>
            Light
          </Typography>
          <Screenshot alt="Light" src="/static/img/screenshots/light.png" />
        </Demo>
        <Demo m={4} onClick={() => dispatch(setTheme(3))}>
          <Typography variant="h6" gutterBottom>
            Dark
          </Typography>
          <Screenshot alt="Dark" src="/static/img/screenshots/dark.png" />
        </Demo>
      </Wrapper>
    );
  }
}

Demos = connect()(Demos);

export default function Settings() {
  const [state, setState] = React.useState({
    isOpen: false
  });

  const toggleDrawer = open => () => {
    setState({ ...state, isOpen: open });
  };

  return (
    <React.Fragment>
      <Fab color="primary" aria-label="Edit" onClick={toggleDrawer(true)}>
        <PaletteIcon />
      </Fab>
      <Drawer anchor="right" open={state.isOpen} onClose={toggleDrawer(false)}>
        <Demos />
      </Drawer>
    </React.Fragment>
  );
}
