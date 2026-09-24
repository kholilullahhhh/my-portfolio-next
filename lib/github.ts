export const GITHUB_USERNAME = "kholilullahhhh";

const GITHUB_API = "https://api.github.com";
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`;

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  hireable: boolean | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  private: boolean;
}

export interface GitHubEvent {
  id: string;
  type: string;
  actor: { login: string; avatar_url: string };
  repo: { name: string };
  payload: Record<string, unknown>;
  created_at: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionsResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

export interface ContributionStats {
  lastYear: number;
  allTime: number;
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
}

export interface LanguageStat {
  name: string;
  value: number;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!res.ok) {
    if (res.status === 403) {
      throw new Error("GitHub API rate limit tercapai. Coba lagi beberapa menit lagi.");
    }
    throw new Error(`GitHub API error: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchGitHubUser(): Promise<GitHubUser> {
  return fetchJson<GitHubUser>(`${GITHUB_API}/users/${GITHUB_USERNAME}`);
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  return fetchJson<GitHubRepo[]>(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
  );
}

export async function fetchGitHubEvents(): Promise<GitHubEvent[]> {
  return fetchJson<GitHubEvent[]>(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=20`,
  );
}

export async function fetchContributions(): Promise<ContributionsResponse> {
  const res = await fetch(CONTRIBUTIONS_API);
  if (!res.ok) throw new Error(`Contributions API error: ${res.status}`);
  return res.json() as Promise<ContributionsResponse>;
}

export function computeContributionStats(data: ContributionsResponse): ContributionStats {
  const today = new Date();
  const toISO = (d: Date) => d.toISOString().slice(0, 10);
  const todayISO = toISO(today);
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const oneYearAgoISO = toISO(oneYearAgo);

  const past = data.contributions
    .filter((d) => d.date <= todayISO)
    .sort((a, b) => a.date.localeCompare(b.date));

  const lastYear = past
    .filter((d) => d.date >= oneYearAgoISO)
    .reduce((sum, d) => sum + d.count, 0);

  const allTime = Object.values(data.total).reduce((sum, n) => sum + n, 0);
  const activeDays = past.filter((d) => d.count > 0).length;

  let currentStreak = 0;
  for (let i = past.length - 1; i >= 0; i--) {
    if (past[i].count > 0) currentStreak++;
    else if (currentStreak > 0) break;
    else if (past[i].date < todayISO) break;
  }

  let longestStreak = 0;
  let run = 0;
  for (const day of past) {
    if (day.count > 0) {
      run++;
      longestStreak = Math.max(longestStreak, run);
    } else {
      run = 0;
    }
  }

  return { lastYear, allTime, currentStreak, longestStreak, activeDays };
}

export function getLanguageStats(repos: GitHubRepo[]): LanguageStat[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (repo.fork || repo.private) continue;
    const lang = repo.language ?? "Other";
    counts.set(lang, (counts.get(lang) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getTopRepos(repos: GitHubRepo[], limit = 6): GitHubRepo[] {
  return [...repos]
    .filter((r) => !r.private)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit);
}

export function sumStars(repos: GitHubRepo[]): number {
  return repos.reduce((sum, r) => sum + r.stargazers_count, 0);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function timeAgo(dateString: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function describeEvent(event: GitHubEvent): string {
  const repo = event.repo.name;
  const p = event.payload as {
    action?: string;
    ref?: string;
    ref_type?: string;
    size?: number;
    changes?: unknown;
    release?: { tag_name?: string };
    pull_request?: { number?: number };
    issue?: { number?: number };
    comment?: unknown;
    pages?: unknown[];
  };

  switch (event.type) {
    case "PushEvent": {
      const size = p.size ?? 1;
      return `Pushed ${size} commit${size > 1 ? "s" : ""} to ${repo}`;
    }
    case "CreateEvent":
      return `Created ${p.ref_type ?? "repository"}${p.ref ? ` ${p.ref}` : ""} in ${repo}`;
    case "DeleteEvent":
      return `Deleted ${p.ref_type ?? "ref"}${p.ref ? ` ${p.ref}` : ""} in ${repo}`;
    case "IssuesEvent":
      return `${capitalize(p.action ?? "updated")} an issue in ${repo}`;
    case "IssueCommentEvent":
      return `Commented on an issue in ${repo}`;
    case "PullRequestEvent":
      return `${capitalize(p.action ?? "updated")} a pull request in ${repo}`;
    case "PullRequestReviewEvent":
      return `${capitalize(p.action ?? "reviewed")} a pull request in ${repo}`;
    case "PullRequestReviewCommentEvent":
      return `Commented on a pull request in ${repo}`;
    case "ForkEvent":
      return `Forked ${repo}`;
    case "WatchEvent":
      return `Starred ${repo}`;
    case "ReleaseEvent":
      return `${capitalize(p.action ?? "published")} a release${p.release?.tag_name ? ` (${p.release.tag_name})` : ""} in ${repo}`;
    case "GollumEvent":
      return `Updated the wiki in ${repo}`;
    case "CommitCommentEvent":
      return `Commented on a commit in ${repo}`;
    case "PublicEvent":
      return `Made ${repo} public`;
    case "MemberEvent":
      return `${capitalize(p.action ?? "added")} a collaborator to ${repo}`;
    default:
      return `${event.type.replace("Event", "")} on ${repo}`;
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
