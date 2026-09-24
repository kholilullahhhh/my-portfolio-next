"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Activity,
  AlertCircle,
  BookMarked,
  CalendarDays,
  Clock,
  GitBranch,
  GitCommitVertical,
  GitFork,
  GitPullRequest,
  Github,
  MapPin,
  MessageSquare,
  RefreshCw,
  Rocket,
  Star,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Footer } from "@/components/common/footer";
import TechIcon from "@/components/common/tech-icon";
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars";
import { GradientFadedBackground } from "@/components/ui/gradient-faded-box";
import {
  computeContributionStats,
  describeEvent,
  fetchContributions,
  fetchGitHubEvents,
  fetchGitHubRepos,
  fetchGitHubUser,
  formatNumber,
  getLanguageStats,
  getTopRepos,
  GITHUB_USERNAME,
  sumStars,
  timeAgo,
  type ContributionStats,
  type GitHubEvent,
  type GitHubRepo,
  type GitHubUser,
} from "@/lib/github";
import { Pie, PieChart, Cell, Bar, BarChart, XAxis, YAxis } from "recharts";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((m) => m.GitHubCalendar),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[160px] w-full rounded-lg" />,
  },
);

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

const PIE_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const languageConfig = {
  language: { label: "Repos" },
} satisfies ChartConfig;

const topRepoConfig = {
  stars: { label: "Stars", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

function eventIcon(type: string) {
  switch (type) {
    case "PushEvent":
      return <GitCommitVertical className="h-4 w-4 text-primary" />;
    case "PullRequestEvent":
    case "PullRequestReviewEvent":
    case "PullRequestReviewCommentEvent":
      return <GitPullRequest className="h-4 w-4 text-chart-2" />;
    case "ForkEvent":
      return <GitFork className="h-4 w-4 text-chart-3" />;
    case "WatchEvent":
      return <Star className="h-4 w-4 text-yellow-500" />;
    case "IssuesEvent":
    case "IssueCommentEvent":
      return <MessageSquare className="h-4 w-4 text-chart-4" />;
    case "CreateEvent":
    case "DeleteEvent":
      return <GitBranch className="h-4 w-4 text-chart-5" />;
    case "ReleaseEvent":
      return <Rocket className="h-4 w-4 text-primary" />;
    default:
      return <Activity className="h-4 w-4 text-muted-foreground" />;
  }
}

function StatsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-32 rounded-lg" />
      <Skeleton className="h-[200px] rounded-lg" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-[320px] rounded-lg" />
        <Skeleton className="h-[320px] rounded-lg" />
      </div>
      <Skeleton className="h-[360px] rounded-lg" />
    </div>
  );
}

export default function StatsPage() {
  const { resolvedTheme } = useTheme();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [contribStats, setContribStats] = useState<ContributionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const [userData, repoData, eventData, contributionData] = await Promise.all([
        fetchGitHubUser(),
        fetchGitHubRepos(),
        fetchGitHubEvents(),
        fetchContributions(),
      ]);
      setUser(userData);
      setRepos(repoData);
      setEvents(eventData);
      setContribStats(computeContributionStats(contributionData));
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data GitHub");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const id = setInterval(() => loadData(true), REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [loadData]);

  const languages = getLanguageStats(repos);
  const topRepos = getTopRepos(repos);
  const totalStars = sumStars(repos);

  const statCards = user
    ? [
        { label: "Public Repos", value: formatNumber(user.public_repos), icon: BookMarked },
        { label: "Followers", value: formatNumber(user.followers), icon: Users },
        { label: "Total Stars", value: formatNumber(totalStars), icon: Star },
        {
          label: "Contributions (1y)",
          value: contribStats ? formatNumber(contribStats.lastYear) : "—",
          icon: CalendarDays,
        },
        {
          label: "Current Streak",
          value: contribStats ? `${formatNumber(contribStats.currentStreak)}d` : "—",
          icon: Activity,
        },
        {
          label: "Longest Streak",
          value: contribStats ? `${formatNumber(contribStats.longestStreak)}d` : "—",
          icon: Clock,
        },
      ]
    : [];

  return (
    <GlowingStarsBackgroundCard className="min-h-screen flex flex-col">
      <GradientFadedBackground>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10 text-center"
          >
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
              GitHub Dashboard
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
              Real-time statistics and code contributions from my public GitHub
              activity.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <Badge variant="outline" className="gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Live
              </Badge>
              {lastUpdated && (
                <span>
                  Updated {lastUpdated.toLocaleTimeString()} · auto-refresh 5m
                </span>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => loadData(true)}
                disabled={refreshing}
                className="h-8"
              >
                <RefreshCw
                  className={`mr-2 h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex flex-col items-center justify-between gap-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4 sm:flex-row"
            >
              <div className="flex items-center gap-3 text-sm">
                <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
                <span>{error}</span>
              </div>
              <Button size="sm" variant="outline" onClick={() => loadData()}>
                Coba lagi
              </Button>
            </motion.div>
          )}

          {loading ? (
            <StatsSkeleton />
          ) : (
            <div className="space-y-8">
              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {statCards.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-4">
                        <stat.icon className="mb-2 h-4 w-4 text-muted-foreground" />
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Profile */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <Card>
                    <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
                      <Avatar className="h-16 w-16 border-2 border-primary/30">
                        <AvatarImage
                          src={user.avatar_url}
                          alt={user.login}
                        />
                        <AvatarFallback>
                          {user.login.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-semibold">
                            {user.name ?? user.login}
                          </h2>
                          <Badge variant="secondary">@{user.login}</Badge>
                          {user.hireable && (
                            <Badge className="bg-green-600 text-white">
                              Hireable
                            </Badge>
                          )}
                        </div>
                        {user.bio && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {user.bio}
                          </p>
                        )}
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          {user.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {user.location}
                            </span>
                          )}
                          {user.company && (
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {user.company}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            Joined{" "}
                            {new Date(user.created_at).toLocaleDateString(
                              "en-US",
                              { month: "short", year: "numeric" },
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="h-3 w-3" />
                            {formatNumber(user.following)} following
                          </span>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={user.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          View Profile
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Contribution calendar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                  <Card className="h-full bg-card text-card-foreground shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <CalendarDays className="h-5 w-5 text-primary" />
                        Contribution Calendar
                      </CardTitle>
                    <CardDescription>
                      {contribStats &&
                        `${formatNumber(contribStats.lastYear)} contributions in the last year · ${formatNumber(contribStats.activeDays)} active days`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="w-full text-foreground">
                    <div className="w-full">
                      <GitHubCalendar
                        username={GITHUB_USERNAME}
                        year="last"
                        colorScheme={colorScheme}
                        className="!w-full [&>div]:w-full [&>div>svg]:!w-full [&>div>svg]:!h-auto [&_footer]:text-muted-foreground"
                        theme={{
                          light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                          dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                        }}
                        errorMessage="Gagal memuat contribution calendar."
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Charts */}
              <div className="grid gap-6 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Top Languages</CardTitle>
                      <CardDescription>
                        By number of public repositories
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {languages.length === 0 ? (
                        <p className="py-10 text-center text-sm text-muted-foreground">
                          No language data available.
                        </p>
                      ) : (
                        <>
                          <ChartContainer
                            config={languageConfig}
                            className="mx-auto aspect-square max-h-[260px]"
                          >
                            <PieChart>
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Pie
                                data={languages.slice(0, 5)}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={50}
                                outerRadius={90}
                                paddingAngle={3}
                              >
                                {languages.slice(0, 5).map((entry, index) => (
                                  <Cell
                                    key={entry.name}
                                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                                  />
                                ))}
                              </Pie>
                            </PieChart>
                          </ChartContainer>
                          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                            {languages.slice(0, 5).map((lang, index) => (
                              <li
                                key={lang.name}
                                className="flex items-center gap-2 text-sm"
                              >
                                <span
                                  className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                  style={{
                                    backgroundColor:
                                      PIE_COLORS[index % PIE_COLORS.length],
                                  }}
                                />
                                <TechIcon
                                  name={lang.name}
                                  className="h-4 w-4 shrink-0"
                                />
                                <span>{lang.name}</span>
                                <span className="text-muted-foreground">
                                  {lang.value}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Most Starred Repos</CardTitle>
                      <CardDescription>Top repositories by stars</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {topRepos.length === 0 ? (
                        <p className="py-10 text-center text-sm text-muted-foreground">
                          No repository data available.
                        </p>
                      ) : (
                        <ChartContainer
                          config={topRepoConfig}
                          className="h-[280px] w-full"
                        >
                          <BarChart
                            data={topRepos.map((r) => ({
                              name:
                                r.name.length > 16
                                  ? `${r.name.slice(0, 16)}…`
                                  : r.name,
                              stars: r.stargazers_count,
                            }))}
                            layout="vertical"
                            margin={{ left: 8, right: 16, top: 8, bottom: 8 }}
                          >
                            <XAxis type="number" hide />
                            <YAxis
                              type="category"
                              dataKey="name"
                              width={110}
                              tickLine={false}
                              axisLine={false}
                              tick={{ fontSize: 11 }}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                              dataKey="stars"
                              fill="hsl(var(--chart-1))"
                              radius={[0, 6, 6, 0]}
                              barSize={18}
                            />
                          </BarChart>
                        </ChartContainer>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Activity + top repos list */}
              <div className="grid gap-6 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Activity className="h-5 w-5 text-primary" />
                        Recent Activity
                      </CardTitle>
                      <CardDescription>
                        Latest public events on GitHub
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {events.length === 0 ? (
                        <p className="py-10 text-center text-sm text-muted-foreground">
                          No recent activity.
                        </p>
                      ) : (
                        <ul className="space-y-3">
                          {events.slice(0, 10).map((event) => (
                            <li
                              key={event.id}
                              className="flex items-start gap-3 rounded-md border border-border/50 p-3 transition-colors hover:bg-muted/40"
                            >
                              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                                {eventIcon(event.type)}
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm">
                                  {describeEvent(event)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {timeAgo(event.created_at)}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Star className="h-5 w-5 text-yellow-500" />
                        Top Repositories
                      </CardTitle>
                      <CardDescription>
                        Sorted by star count
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {topRepos.length === 0 ? (
                        <p className="py-10 text-center text-sm text-muted-foreground">
                          No repositories found.
                        </p>
                      ) : (
                        <ul className="space-y-3">
                          {topRepos.map((repo) => (
                            <li key={repo.id}>
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-md border border-border/50 p-3 transition-colors hover:bg-muted/40"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="truncate text-sm font-medium text-primary">
                                    {repo.full_name}
                                  </span>
                                  <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                                    <Star className="h-3 w-3" />
                                    {formatNumber(repo.stargazers_count)}
                                    <GitFork className="ml-2 h-3 w-3" />
                                    {formatNumber(repo.forks_count)}
                                  </span>
                                </div>
                                {repo.description && (
                                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                    {repo.description}
                                  </p>
                                )}
                                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                                  {repo.language && (
                                    <span className="flex items-center gap-1">
                                      <TechIcon
                                        name={repo.language}
                                        className="h-3 w-3"
                                      />
                                      {repo.language}
                                    </span>
                                  )}
                                  <span>updated {timeAgo(repo.pushed_at)}</span>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                        <a
                          href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          All repositories
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </GradientFadedBackground>
    </GlowingStarsBackgroundCard>
  );
}
