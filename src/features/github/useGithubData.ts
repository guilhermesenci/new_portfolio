import { useGetProfileQuery, useGetReposQuery } from "./githubAPI";

export const useGithubData = (username: string) => {
  const {
    data: profile,
    error: profileError,
    isLoading: profileLoading,
  } = useGetProfileQuery(username);

  const {
    data: repos,
    error: reposError,
    isLoading: reposLoading,
  } = useGetReposQuery({ username });

  return {
    profile,
    repos,
    isLoading: profileLoading || reposLoading,
    error: profileError || reposError,
  };
};
