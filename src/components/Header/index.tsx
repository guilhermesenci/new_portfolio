import { useDispatch, useSelector } from "react-redux";

import { Brightness4, Brightness7 } from "@mui/icons-material";

import { toggleTheme } from "@/store/themeSlice";
import { RootState } from "@/store";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import DropDownMenu from "@/components/DropDownMenu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import useHeader from "./useHeader";
import { Stack } from "@mui/material";

const Header = () => {
  const { languageOptions, pages, LanguageButton } = useHeader();

  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            Guilherme Senci
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <DropDownMenu title={<MenuIcon />} options={pages} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            Guilherme Senci
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}
          >
            {pages.map((page) => (
              <Button key={page.label}>{page.label}</Button>
            ))}
          </Box>
          <Stack display={"flex"} direction={"row"} gap={2}>
            <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <DropDownMenu
              title={<LanguageButton />}
              options={languageOptions}
            />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
