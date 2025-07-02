import { createTheme, ThemeOptions } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

type AppPalette = {
  primary: string;
  secondary: string;
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  hover: string;
};

const commonPalette = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "inherit",
          transition: "background-color 0.2s ease-in-out",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
        },
      },
    },
  },
};

export const lightPalette: AppPalette = {
  primary: "#1976d2",
  secondary: "#9c27b0",
  background: {
    default: "#f5f5f5",
    paper: "#ffffff",
  },
  text: {
    primary: "#000000",
    secondary: "#555555",
  },
  hover: "#00000010",
};

export const darkPalette: AppPalette = {
  primary: "#90caf9",
  secondary: "#ce93d8",
  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },
  text: {
    primary: "#ffffff",
    secondary: "#cccccc",
  },
  hover: "#ffffff10",
};

export const createAppTheme = (
  mode: PaletteMode
): ReturnType<typeof createTheme> => {
  const palette = mode === "light" ? lightPalette : darkPalette;

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: palette.primary,
      },
      secondary: {
        main: palette.secondary,
      },
      background: palette.background,
      text: palette.text,
    },
    typography: commonPalette.typography,
    components: {
      ...commonPalette.components,

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: palette.hover,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            ...commonPalette.components!.MuiTypography!.styleOverrides!.root,
            color: palette.text.primary,
            ":hover": {
              backgroundColor: palette.hover,
            },
          },
        },
      },

      MuiTypography: {
        styleOverrides: {
          root: {
            ...commonPalette.components!.MuiTypography!.styleOverrides!.root,
            color: palette.text.primary,
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            color: palette.primary,
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};
