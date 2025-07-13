import { useMemo } from "react";
import { useGithubUserName } from "@/hooks/useGithubUserName";
import {
  useGetProfileQuery,
  useGetReposQuery,
} from "@/features/github/githubAPI";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setPage } from "@/store/githubSlice";
import { useTranslation } from "react-i18next";

const useProjects = () => {
  const dispatch = useDispatch();
  const username = useGithubUserName();

  const { t } = useTranslation();

  const { data: profile, isLoading: loadingProfile } = useGetProfileQuery(
    username,
    {
      skip: !username,
    }
  );

  const { page, perPage, sort, direction } = useSelector(
    (state: RootState) => state.github
  );

  const { data: repos, isLoading: loadingRepos } = useGetReposQuery(
    { username, page, per_page: perPage, sort, direction },
    {
      skip: !username,
    }
  );

  const handlePageChange = (value: number) => {
    dispatch(setPage(value));
  };

  const buttons = useMemo(
    () => [
      {
        text: t("pages.projects.buttons.github"),
        function: () => {
          window.open(profile?.repos_url, "_blank");
        },
      },
      {
        text: t("pages.projects.buttons.profile"),
        function: () => {
          window.open(profile?.html_url, "_blank");
        },
      },
    ],
    [profile, t]
  );

  const totalPages = Math.ceil(profile?.public_repos / perPage);

  return {
    profile,
    repos,
    buttons,
    loadingProfile,
    loadingRepos,
    username,
    handlePageChange,
    page,
    totalPages,
  };
};
export default useProjects;
