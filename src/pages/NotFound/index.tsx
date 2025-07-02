import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        height: "calc(100vh - 90px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography sx={{ padding: 1 }} variant="body1">
        {t("pages.NotFound.title")}
      </Typography>
      <Link to="/">{t("pages.NotFound.button")}</Link>
    </Box>
  );
}
