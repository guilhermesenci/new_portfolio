import { Box } from "@mui/material";
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";

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
  } = useProjects();

  if (!username) return <div>Carregando username...</div>;

  if (loadingProfile || loadingRepos)
    return <div>Carregando dados do GitHub...</div>;

  return (
    <Box sx={{ height: "calc(100vh - 160px)"}}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "auto",
          paddingX: 2,
        }}
      >
        {repos?.map((repo) => (
          <Card key={repo.id} buttons={buttons} {...repo} />
        ))}
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
