const RELEASES_API =
  "https://api.github.com/repos/nonbili/meron/releases";
const RELEASES_PER_PAGE = 100;

export type ReleasePlatform = "desktop" | "mobile";

export type ChangelogRelease = {
  tag: string;
  publishedAt: string;
  notes: string[];
  url: string;
  prerelease: boolean;
  platform: ReleasePlatform;
};

type GitHubRelease = {
  tag_name: string;
  published_at: string | null;
  body: string | null;
  html_url: string;
  draft: boolean;
  prerelease: boolean;
};

export function platformForTag(tag: string): ReleasePlatform {
  const normalizedTag = tag.toLowerCase();
  return normalizedTag.startsWith("android/") ||
    normalizedTag.startsWith("ios/")
    ? "mobile"
    : "desktop";
}

function isFullChangelog(line: string) {
  return line.trimStart().startsWith("Full Changelog");
}

function plainText(markdown: string) {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_~`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Mirror Meron's in-app changelog parser: prefer list items, flatten them to
 * plain text, and omit GitHub's generated "Full Changelog" footer. If a
 * release has no list, fall back to its prose paragraphs.
 */
export function parseReleaseNotes(markdown: string): string[] {
  const notes = markdown
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*(?:[-*+]|\d+[.)])\s+(.+)$/)?.[1])
    .filter((line): line is string => Boolean(line))
    .map(plainText)
    .filter((line) => line.length > 0 && !isFullChangelog(line));

  if (notes.length > 0) {
    return notes;
  }

  return markdown
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(
      (paragraph) =>
        paragraph.length > 0 &&
        !paragraph.startsWith("#") &&
        !paragraph.startsWith("|"),
    )
    .map(plainText)
    .filter((line) => line.length > 0 && !isFullChangelog(line));
}

/**
 * Fetch releases straight from GitHub. Runs both at build time (Node, with an
 * optional token) and in the browser (unauthenticated), so the changelog page
 * can refresh itself without a redeploy.
 */
export async function fetchChangelogReleases({
  maxPages = Infinity,
  signal,
}: { maxPages?: number; signal?: AbortSignal } = {}): Promise<
  ChangelogRelease[]
> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // `User-Agent` is a forbidden header in browsers, and GitHub only requires it
  // for server-side callers.
  if (typeof window === "undefined") {
    headers["User-Agent"] = "meron.im";

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
  }

  const releases: GitHubRelease[] = [];

  for (let page = 1; page <= maxPages; page += 1) {
    const response = await fetch(
      `${RELEASES_API}?per_page=${RELEASES_PER_PAGE}&page=${page}`,
      { headers, signal },
    );

    if (!response.ok) {
      throw new Error(
        `Unable to load Meron releases from GitHub (${response.status} ${response.statusText}).`,
      );
    }

    const pageReleases = (await response.json()) as GitHubRelease[];
    releases.push(...pageReleases);

    if (pageReleases.length < RELEASES_PER_PAGE) {
      break;
    }
  }

  return releases
    .filter(
      (release): release is GitHubRelease & { published_at: string } =>
        !release.draft && Boolean(release.published_at),
    )
    .map((release) => ({
      tag: release.tag_name,
      publishedAt: release.published_at,
      notes: parseReleaseNotes(release.body || ""),
      url: release.html_url,
      prerelease: release.prerelease,
      platform: platformForTag(release.tag_name),
    }))
    .sort(
      (left, right) =>
        Date.parse(right.publishedAt) - Date.parse(left.publishedAt),
    );
}

/**
 * Build-time snapshot shipped with the static export. It is only a fallback:
 * the page refetches from GitHub on the client. A GitHub outage or rate limit
 * therefore must not fail the build.
 */
export async function getChangelogReleases(): Promise<ChangelogRelease[]> {
  try {
    return await fetchChangelogReleases();
  } catch (error) {
    console.warn("Falling back to an empty changelog snapshot:", error);
    return [];
  }
}
