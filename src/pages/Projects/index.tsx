import Title from "@/components/Title";

import { useGithubUserName } from "@/hooks/useGithubUserName";
import {
  useGetProfileQuery,
  useGetReposQuery,
} from "@/features/github/githubAPI";
import { Stack } from "@mui/material";

const Projects = () => {
  const username = useGithubUserName();

  const { data: profile, isLoading: loadingProfile } = useGetProfileQuery(
    username,
    {
      skip: !username,
    }
  );

  const { data: repos, isLoading: loadingRepos } = useGetReposQuery(username, {
    skip: !username,
  });

  if (!username) return <div>Carregando username...</div>;
  if (loadingProfile || loadingRepos)
    return <div>Carregando dados do GitHub...</div>;
  return (
    <Stack>
      <Title label={profile?.name ?? "Erro"} />
      {repos?.map((repo) => (
        <Title key={repo.id} label={repo?.name ?? "Erro"} />
      ))}
    </Stack>
  );
};

export default Projects;
