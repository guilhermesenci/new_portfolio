import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import ProjectPreview from "@/components/ProjectPreview";

import useProjects from "./useProjects";

const Projects = () => {
  const {
    repos,
    buttons,
    username,
    loadingProfile,
    loadingRepos,
    handlePageChange,
    page,
    totalPages,
    selectedRepo,
    closePreview,
    previewCode,
    repoContents,
  } = useProjects();

  if (!username) return <div>Carregando username...</div>;

  if (loadingProfile || loadingRepos)
    return <div>Carregando dados do GitHub...</div>;

  return (
    <Box sx={{ height: "calc(100vh - 160px)" }}>
      <Box
        sx={{
          gap: 2,
          padding: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {repos?.map((repo) => (
            <Card
              key={repo.id}
              buttons={buttons}
              {...repo}
              resume={previewCode}
            />
          ))}
        </Box>

        {selectedRepo ? (
          <Box sx={{ marginTop: 2 }}>
            <ProjectPreview
              repo={selectedRepo}
              onClose={closePreview}
              files={repoContents}
            />
          </Box>
        ) : null}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 4,
          position: "sticky",
          bottom: 0,
          paddingY: 2,
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Pagination
          page={page}
          count={totalPages}
          onChange={(_, value) => handlePageChange(value)}
        />
      </Box>
    </Box>
  );
};

export default Projects;
