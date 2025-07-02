import { useMemo } from "react";

import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { RootState } from "@/store";

import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/Header";
import AppRoutes from "./routes";

import getTheme from "@/theme";

function App() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = useMemo(() => getTheme(mode), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <AppRoutes />;
    </ThemeProvider>
  );
}

export default App;
