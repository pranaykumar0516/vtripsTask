import { createMuiTheme } from "@material-ui/core/styles";

import blue from "@material-ui/core/colors/blue";
import blueGrey from "@material-ui/core/colors/blueGrey";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";
import { darken } from "polished";

const variants = [
  {
    name: "Blue",
    palette: {
      primary: {
        main: blue[800],
        contrastText: "#FFF"
      },
      secondary: blue
    },
    header: {
      color: grey[500],
      background: "#FFF",
      search: {
        color: grey[800]
      }
    },
    sidebar: {
      color: "#FFF",
      background: blue[700],
      header: {
        color: "#FFF",
        background: blue[800]
      },
      footer: {
        color: "#FFF",
        background: blue[800],
        online: {
          background: "#FFF"
        }
      }
    }
  },
  {
    name: "Green",
    palette: {
      primary: {
        main: green[800],
        contrastText: "#FFF"
      },
      secondary: {
        main: green[500],
        contrastText: "#FFF"
      }
    },
    header: {
      color: grey[500],
      background: "#FFF",
      search: {
        color: grey[800]
      }
    },
    sidebar: {
      color: "#FFF",
      background: green[700],
      header: {
        color: "#FFF",
        background: green[800]
      },
      footer: {
        color: "#FFF",
        background: green[800],
        online: {
          background: "#FFF"
        }
      }
    }
  },
  {
    name: "Light",
    palette: {
      primary: {
        main: blue[800],
        contrastText: "#FFF"
      },
      secondary: blue
    },
    header: {
      color: grey[200],
      background: blue[800],
      search: {
        color: grey[100]
      }
    },
    sidebar: {
      color: grey[900],
      background: "#FFF",
      header: {
        color: "#FFF",
        background: blue[800]
      },
      footer: {
        color: grey[900],
        background: grey[100],
        online: {
          background: green[500]
        }
      }
    }
  },
  {
    name: "Dark",
    palette: {
      primary: {
        main: blue[800],
        contrastText: "#FFF"
      },
      secondary: blue
    },
    header: {
      color: grey[500],
      background: "#FFF",
      search: {
        color: grey[800]
      }
    },
    sidebar: {
      color: "#FFF",
      background: blueGrey[900],
      header: {
        color: "#FFF",
        background: darken(0.05, blueGrey[900])
      },
      footer: {
        color: "#FFF",
        background: darken(0.05, blueGrey[900]),
        online: {
          background: "#FFF"
        }
      }
    }
  }
];

const theme = variant => {
  const muiTheme = createMuiTheme(
    {
      palette: {
        ...variant.palette
      },
      spacing: 4,
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1440
        }
      },
      typography: {
        useNextVariants: true,
        fontFamily: [
          "Nunito Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join(","),
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        h1: {
          fontSize: "2.5rem",
          fontWeight: 600
        },
        h2: {
          fontSize: "2rem",
          fontWeight: 600
        },
        h3: {
          fontSize: "1.75rem",
          fontWeight: 600
        },
        h4: {
          fontSize: "1.5rem",
          fontWeight: 600
        },
        h5: {
          fontSize: "1.25rem",
          fontWeight: 600
        },
        h6: {
          fontSize: "1rem",
          fontWeight: 600
        },
        body1: {
          fontSize: 14
        },
        button: {
          textTransform: "none"
        }
      },
      props: {
        MuiButtonBase: {
          disableRipple: true
        }
      },
      shadows: Array(25).fill("none"),
      header: {
        ...variant.header
      },
      sidebar: {
        ...variant.sidebar
      },
      status: {
        success: green[500],
        warning: orange[500],
        danger: red[500]
      },
      overrides: {
        MuiPickersDay: {
          day: {
            fontWeight: "300"
          }
        },
        MuiPickersYear: {
          root: {
            height: "64px"
          }
        },
        MuiPickersCalendar: {
          transitionContainer: {
            marginTop: "6px"
          }
        },
        MuiPickersCalendarHeader: {
          iconButton: {
            backgroundColor: "transparent",
            "& > *": {
              backgroundColor: "transparent"
            }
          },
          switchHeader: {
            marginTop: "2px",
            marginBottom: "4px"
          }
        },
        MuiPickersClock: {
          container: {
            margin: `32px 0 4px`
          }
        },
        MuiPickersClockNumber: {
          clockNumber: {
            left: `calc(50% - 16px)`,
            width: "32px",
            height: "32px"
          }
        },
        MuiPickerDTHeader: {
          dateHeader: {
            "& h4": {
              fontSize: "2.125rem",
              fontWeight: 400
            }
          },
          timeHeader: {
            "& h3": {
              fontSize: "3rem",
              fontWeight: 400
            }
          }
        },
        MuiPickersTimePicker: {
          hourMinuteLabel: {
            "& h2": {
              fontSize: "3.75rem",
              fontWeight: 300
            }
          }
        },
        MuiPickersToolbar: {
          toolbar: {
            "& h4": {
              fontSize: "2.125rem",
              fontWeight: 400
            }
          }
        }
      }
    },
    variant.name
  );

  return {
    ...muiTheme,
    fontSizes: {
      xs: "10px",
      sm: "12px",
      md: "14px",
      lg: "16px",
      xl: "18px"
    },
    body: {
      background: "#F7F7F7"
      // background: "#F6F7FB"
    }
  };
};

const themes = variants.map(variant => theme(variant));

export default themes;
