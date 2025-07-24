import { Box, CircularProgress } from "@mui/material";
import { RepositoryFile, Repository } from "@/features/github/githubAPI";
import FileItem from "@/components/FileItem";

interface Props {
  files: RepositoryFile[];
  repo: Repository;
  loading?: boolean;
}

const RepoExplorer = ({ files, loading, repo }: Props) => {
  return (
    <Box sx={{ marginTop: 2, maxHeight: 400, overflowY: "auto" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        files.map((file) => (
          <FileItem key={file.path} file={file} repo={repo} />
        ))
      )}
    </Box>
  );
};

export default RepoExplorer;
