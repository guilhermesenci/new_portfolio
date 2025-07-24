import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Icon,
} from "@mui/material";
import { useState } from "react";
import { RepositoryFile, Repository } from "@/features/github/githubAPI";
import {
  useLazyGetFileContentQuery,
  useLazyGetRepoContentsQuery,
} from "@/features/github/githubAPI";
import { ExpandCircleDown } from "@mui/icons-material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTranslation } from "react-i18next";

interface Props {
  file: RepositoryFile;
  repo: Repository;
  depth?: number;
}

const FileItem = ({ file, repo, depth = 0 }: Props) => {
  const indent = depth * 4;
  const { t } = useTranslation("repoExplorer");

  const [expanded, setExpanded] = useState(false);
  const [fetchDir] = useLazyGetRepoContentsQuery();
  const [fetchFile] = useLazyGetFileContentQuery();
  const [content, setContent] = useState<
    RepositoryFile[] | string | null | undefined
  >(null);

  const handleExpand = async () => {
    setExpanded(!expanded);
    if (content) return;

    if (file.type === "dir") {
      const result = await fetchDir({
        username: repo.owner.login,
        repo: repo.name,
        path: file.path,
      });

      setContent("data" in result ? result.data : []);
    } else if (file.type === "file") {
      const result = await fetchFile({ url: file.url });
      setContent("data" in result ? result.data : t("fileNotFound"));
    }
  };

  return (
    <Box sx={{ marginLeft: indent, marginBottom: 1 }}>
      {file.type === "dir" ? (
        <>
          <Typography
            onClick={handleExpand}
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            📁 {file.name}
          </Typography>

          {!content && expanded && (
            <CircularProgress size={16} sx={{ ml: 1 }} />
          )}

          {Array.isArray(content) &&
            content.map((subfile) => (
              <FileItem
                key={subfile.path}
                file={subfile}
                repo={repo}
                depth={depth + 1}
              />
            ))}
        </>
      ) : (
        <Accordion
          expanded={expanded}
          onChange={handleExpand}
          sx={{ background: "#1e1e1e" }}
        >
          <AccordionSummary
            expandIcon={
              <Icon>
                <ExpandCircleDown />
              </Icon>
            }
          >
            <Typography color="white">{file.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {!content ? (
              <CircularProgress size={24} />
            ) : typeof content === "string" ? (
              <SyntaxHighlighter language="tsx" style={darcula}>
                {content}
              </SyntaxHighlighter>
            ) : null}
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};

export default FileItem;
