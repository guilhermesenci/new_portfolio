import { Box, Icon, IconButton, Typography } from "@mui/material";
import RepoExplorer from "../RepoExplorer";
import { useTranslation } from "react-i18next";

type ProjectPreviewProps = {
  onClose: () => void;
  files?: any[];
  repo: any;
};

const ProjectPreview = ({ repo, files, onClose }: ProjectPreviewProps) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{repo.name}</Typography>
        <IconButton onClick={onClose}>
          <Icon>close</Icon>
        </IconButton>
      </Box>

      <RepoExplorer files={files || []} repo={repo} />

      <Box
        sx={{
          display: "flex",
          marginTop: 2,
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle2" sx={{ marginTop: 2 }}>
          {`${t("projectView.language")}: ${
            repo.language || t("projectView.error")
          }`}
        </Typography>
        <Typography variant="subtitle2" sx={{ marginTop: 2 }}>
          {`${t("projectView.lastUpdate")} ${new Date(
            repo.updated_at
          ).toLocaleDateString()}`}
        </Typography>
        <Typography variant="subtitle2" sx={{ marginTop: 2 }}>
          {`${t("projectView.description")} ${repo.description}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProjectPreview;
