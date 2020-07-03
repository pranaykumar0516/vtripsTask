import React from "react";
import styled from "styled-components";
import { rgba } from "polished";

import { NavLink as RouterNavLink, withRouter } from "react-router-dom";
import { darken } from "polished";

import PerfectScrollbar from "react-perfect-scrollbar";
import "../vendor/perfect-scrollbar.css";

import {
  Avatar,
  Collapse,
  Grid,
  ListItem,
  ListItemText,
  Drawer as MuiDrawer,
  List as MuiList,
  Typography
} from "@material-ui/core";

import { ExpandLess, ExpandMore } from "@material-ui/icons";

import routes from "../routes/index";

import { Layers } from "react-feather";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${props => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const List = styled(MuiList)`
  background-color: ${props => props.theme.sidebar.background};
`;

const Items = styled.div`
  padding-top: ${props => props.theme.spacing(2.5)}px;
  padding-bottom: ${props => props.theme.spacing(2.5)}px;
`;

const Brand = styled(ListItem)`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.typography.fontWeightMedium};
  color: ${props => props.theme.sidebar.header.color};
  background-color: ${props => props.theme.sidebar.header.background};
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 56px;

  ${props => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }
`;

const BrandIcon = styled(Layers)`
  margin-right: ${props => props.theme.spacing(2)}px;
`;

const Category = styled(ListItem)`
  padding-top: ${props => props.theme.spacing(3)}px;
  padding-bottom: ${props => props.theme.spacing(3)}px;

  svg {
    color: ${props => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &.${props => props.activeClassName} {
    background-color: ${props => darken(0.05, props.theme.sidebar.background)};

    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`;

const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${props => props.theme.sidebar.color};
    font-size: ${props => props.theme.fontSizes.md};
    padding: 0 16px;
  }
`;

const CategoryIconLess = styled(ExpandLess)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`;

const CategoryIconMore = styled(ExpandMore)`
  color: ${props => rgba(props.theme.sidebar.color, 0.5)};
`;

const Link = styled(ListItem)`
  padding-left: ${props => props.theme.spacing(12)}px;
  padding-top: ${props => props.theme.spacing(2)}px;
  padding-bottom: ${props => props.theme.spacing(2)}px;

  span {
    color: ${props => rgba(props.theme.sidebar.color, 0.7)};
  }

  &:hover span {
    color: ${props => rgba(props.theme.sidebar.color, 0.9)};
  }

  &.${props => props.activeClassName} {
    background-color: ${props => darken(0.06, props.theme.sidebar.background)};

    span {
      color: ${props => props.theme.sidebar.color};
    }
  }
`;

const LinkText = styled(ListItemText)`
  color: ${props => props.theme.sidebar.color};
  span {
    font-size: ${props => props.theme.fontSizes.md};
  }
  margin-top: 0;
  margin-bottom: 0;
`;

const SidebarSection = styled(Typography)`
  color: ${props => props.theme.sidebar.color};
  padding: ${props => props.theme.spacing(2)}px
    ${props => props.theme.spacing(4)}px ${props => props.theme.spacing(1)}px;
  opacity: 0.9;
  display: block;
`;

const SidebarFooter = styled.div`
  background-color: ${props =>
    props.theme.sidebar.footer.background} !important;
  padding: ${props => props.theme.spacing(3)}px
    ${props => props.theme.spacing(4)}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const SidebarFooterText = styled(Typography)`
  color: ${props => props.theme.sidebar.footer.color};
`;

const Dot = styled.span`
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-color: ${props => props.theme.sidebar.footer.online.background};
  display: inline-block;
  border-radius: 50%;
  margin-bottom: -0.5px;
`;

function SidebarCategory({
  name,
  icon,
  classes,
  isOpen,
  isCollapsable,
  ...rest
}) {
  return (
    <Category {...rest}>
      {icon}
      <CategoryText>{name}</CategoryText>
      {isCollapsable ? (
        isOpen ? (
          <CategoryIconMore />
        ) : (
          <CategoryIconLess />
        )
      ) : null}
    </Category>
  );
}

function SidebarLink({ name, to }) {
  return (
    <Link
      button
      dense
      component={NavLink}
      exact
      to={to}
      activeClassName="active"
    >
      <LinkText>{name}</LinkText>
    </Link>
  );
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggle = index => {
    this.setState(state => ({
      [index]: !state[index]
    }));
  };

  componentDidMount() {
    /* Open collapse element that matches current url */
    const pathName = this.props.location.pathname;

    routes.forEach((route, index) => {
      this.setState(() => ({
        [index]: pathName.startsWith(route.path) || route.open
      }));
    });
  }

  render() {
    const { classes, staticContext, ...other } = this.props;

    return (
      <Drawer variant="permanent" {...other}>
        <Brand>
          <BrandIcon /> Material App
        </Brand>
        <Scrollbar>
          <List disablePadding>
            <Items>
              {routes.map((category, index) => (
                <React.Fragment key={index}>
                  {category.header ? (
                    <SidebarSection variant="caption">
                      {category.header}
                    </SidebarSection>
                  ) : null}

                  {category.children ? (
                    <React.Fragment key={index}>
                      <SidebarCategory
                        isOpen={!this.state[index]}
                        isCollapsable={true}
                        name={category.id}
                        icon={category.icon}
                        button={true}
                        onClick={() => this.toggle(index)}
                      />

                      <Collapse
                        in={this.state[index]}
                        timeout="auto"
                        unmountOnExit
                      >
                        {category.children.map((route, index) => (
                          <SidebarLink
                            key={index}
                            name={route.name}
                            to={route.path}
                            icon={route.icon}
                          />
                        ))}
                      </Collapse>
                    </React.Fragment>
                  ) : (
                    <SidebarCategory
                      isCollapsable={false}
                      name={category.id}
                      to={category.path}
                      activeClassName="active"
                      component={NavLink}
                      icon={category.icon}
                      exact
                    />
                  )}
                </React.Fragment>
              ))}
            </Items>
          </List>
        </Scrollbar>
        <SidebarFooter>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar
                alt="Lucy Lavender"
                src="/static/img/avatars/avatar-1.jpg"
              />
            </Grid>
            <Grid item>
              <SidebarFooterText variant="body2">
                Lucy Lavender
              </SidebarFooterText>
              <SidebarFooterText variant="body2">
                <Dot />
                Online
              </SidebarFooterText>
            </Grid>
          </Grid>
        </SidebarFooter>
      </Drawer>
    );
  }
}

export default withRouter(Sidebar);
