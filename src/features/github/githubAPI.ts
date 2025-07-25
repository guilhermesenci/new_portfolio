import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Owner = {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: false;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
  user_view_type: string;
};

type PayloadProjects = {
  username: string;
  repo: string;
  path?: string;
};

export type Repository = {
  allow_forking: boolean;
  archived: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  created_at: string;
  default_branch: string;
  deployments_url: string;
  description: string | null;
  disabled: boolean;
  downloads_url: string;
  events_url: string;
  fork: boolean;
  forks: number;
  forks_count: number;
  forks_url: string;
  full_name: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  has_discussions: boolean;
  has_downloads: boolean;
  has_issues: boolean;
  has_pages: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  homepage: string | null;
  hooks_url: string;
  html_url: string;
  id: number;
  is_template: boolean;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  language: string | null;
  languages_url: string;
  license: string | null;
  merges_url: string;
  milestones_url: string;
  mirror_url: string | null;
  name: string;
  node_id: string;
  notifications_url: string;
  open_issues: number;
  open_issues_count: number;
  owner: Owner;
  private: boolean;
  pulls_url: string;
  pushed_at: string;
  releases_url: string;
  size: number;
  ssh_url: string;
  stargazers_count: number;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  svn_url: string;
  tags_url: string;
  teams_url: string;
  topics: string[];
  trees_url: string;
  updated_at: string;
  url: string;
  visibility: string;
  watchers: number;
  watchers_count: number;
  web_commit_signoff_required: boolean;
};

export type RepositoryFile = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: "file" | "dir";
};
interface GetReposArgs {
  username: string;
  page?: number;
  per_page?: number;
  sort?: "created" | "updated" | "pushed" | "full_name";
  direction?: "asc" | "desc";
}

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_GITHUB ?? "https://api.github.com/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${import.meta.env.VITE_GITHUB_KEY}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getProfile: builder.query<any, string>({
      query: (username) => `users/${username}`,
    }),

    getRepos: builder.query<Repository[], GetReposArgs>({
      query: ({
        username,
        page,
        per_page,
        sort = "created",
        direction = "desc",
      }) =>
        `users/${username}/repos?page=${page}&per_page=${per_page}&sort=${sort}&direction=${direction}`,
    }),

    getRepoContents: builder.query<RepositoryFile[], PayloadProjects>({
      query: ({ username, repo, path = "" }) =>
        `repos/${username}/${repo}/contents/${path}`,
    }),

    getFileContent: builder.query<string, { url: string }>({
      queryFn: async ({ url }, _api, _extraOptions, baseQuery) => {
        const result = await baseQuery({ url });
        if (
          "data" in result &&
          result.data &&
          typeof result.data === "object" &&
          "content" in result.data &&
          (result.data as any).encoding === "base64"
        ) {
          const decoded = atob((result.data as any).content);
          return { data: decoded };
        }

        return {
          error: result.error ?? {
            status: 500,
            statusText: "Erro ao acessar conteúdo",
            data: "Arquivo não possui conteúdo base64 válido",
          },
        };
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetReposQuery,
  useGetRepoContentsQuery,
  useGetFileContentQuery,
  useLazyGetFileContentQuery,
  useLazyGetRepoContentsQuery,
} = githubApi;
