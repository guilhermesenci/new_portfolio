import { useCallback, useMemo } from "react";

import { useTranslation } from "react-i18next";
import { Language } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const useHeader = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
    },
    [i18n]
  );

  const handlePageChange = useCallback((destiny: string) => {
    navigate(destiny);
  }, []);

  const languageOptions = useMemo(
    () => [
      {
        label: t("components.header.options.pt-br"),
        onClick: () => changeLanguage("pt"),
      },
      {
        label: t("components.header.options.en"),
        onClick: () => changeLanguage("en"),
      },
    ],
    [t, changeLanguage]
  );

  const pages = useMemo(
    () => [
      {
        label: t("components.header.options.initialPage"),
        onClick: () => {
          handlePageChange("/");
        },
      },
      {
        label: t("components.header.options.about"),
        onClick: () => {
          handlePageChange("/about");
        },
      },
      {
        label: t("components.header.options.projects"),
        onClick: () => {
          handlePageChange("/projects");
        },
      },
      {
        label: t("components.header.options.history"),
        onClick: () => {
          handlePageChange("/history");
        },
      },
      {
        label: t("components.header.options.contact"),
        onClick: () => {
          handlePageChange("/contact");
        },
      },
    ],
    [t]
  );

  const LanguageButton = useCallback(() => {
    return (
      <>
        {i18n.language} <Language sx={{ paddingLeft: 1 }} />
      </>
    );
  }, [i18n]);

  return { languageOptions, pages, LanguageButton };
};

export default useHeader;
