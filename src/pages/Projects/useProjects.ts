import { useCallback, useMemo, useState } from "react";
import { useGithubUserName } from "@/hooks/useGithubUserName";
import {
  Repository,
  useGetProfileQuery,
  useGetRepoContentsQuery,
  useGetReposQuery,
} from "@/features/github/githubAPI";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setPage } from "@/store/githubSlice";
import { useTranslation } from "react-i18next";

const useProjects = () => {
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [previewCode, setPreviewCode] = useState<boolean>(false);

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

  const { data: repoContents } =
    useGetRepoContentsQuery(
      { username, repo: selectedRepo?.name ?? "", path: "" },
      {
        skip: !selectedRepo,
        refetchOnMountOrArgChange: true,
      }
    );

  const handlePageChange = useCallback(
    (value: number) => {
      dispatch(setPage(value));
    },
    [dispatch]
  );

  const openPreview = useCallback((repo: Repository) => {
    setPreviewCode(true);
    handlePreviewCode(repo);
  }, []);

  const handlePreviewCode = useCallback(
    async (projectId: Repository) => {
      setSelectedRepo(projectId);
    },
    [setSelectedRepo]
  );

  const closePreview = useCallback(() => {
    setSelectedRepo(null);
    setPreviewCode(false);
  }, []);

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
      {
        text: t("pages.projects.buttons.preview"),
        function: (repo: Repository) => openPreview(repo),
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
    closePreview,
    page,
    totalPages,
    selectedRepo,
    previewCode,
    repoContents,
  };
};
export default useProjects;
