import { useCallback, useMemo } from "react";

import { useTranslation } from "react-i18next";
import { Language } from "@mui/icons-material";

const useHeader = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
    },
    [i18n]
  );

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
        onClick: () => {},
      },
      {
        label: t("components.header.options.about"),
        onClick: () => {},
      },
      {
        label: t("components.header.options.history"),
        onClick: () => {},
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
