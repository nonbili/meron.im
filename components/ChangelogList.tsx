"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Github, Laptop, Smartphone } from "lucide-react";
import {
  fetchChangelogReleases,
  type ChangelogRelease,
  type ReleasePlatform,
} from "@/lib/changelog";

// Unauthenticated GitHub requests are rate limited, so the browser only pulls
// the most recent pages; the build-time snapshot covers the rest if this fails.
const CLIENT_MAX_PAGES = 3;

type ChangelogFilter = "all" | ReleasePlatform;

const filters: {
  value: ChangelogFilter;
  label: string;
  href: string;
}[] = [
  { value: "all", label: "All", href: "/changelog" },
  {
    value: "desktop",
    label: "Desktop",
    href: "/changelog?platform=desktop",
  },
  {
    value: "mobile",
    label: "Mobile",
    href: "/changelog?platform=mobile",
  },
];

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

function releaseDate(value: string) {
  return dateFormatter.format(new Date(value));
}

function releaseVersion(release: ChangelogRelease) {
  return release.tag.replace(/^(?:android|ios)\//i, "");
}

/**
 * The browser only pages back so far, so keep any older snapshot releases the
 * live response did not include.
 */
function mergeReleases(
  live: ChangelogRelease[],
  snapshot: ChangelogRelease[],
) {
  const liveTags = new Set(live.map((release) => release.tag));

  return [
    ...live,
    ...snapshot.filter((release) => !liveTags.has(release.tag)),
  ].sort(
    (left, right) =>
      Date.parse(right.publishedAt) - Date.parse(left.publishedAt),
  );
}

function PlatformBadge({ platform }: { platform: ReleasePlatform }) {
  const Icon = platform === "mobile" ? Smartphone : Laptop;
  const label = platform === "mobile" ? "Mobile" : "Desktop";

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background-subtle px-2.5 py-1 text-xs font-semibold text-foreground">
      <Icon size={13} aria-hidden="true" />
      {label}
    </span>
  );
}

export function ChangelogList({
  releases: fallbackReleases,
}: {
  releases: ChangelogRelease[];
}) {
  const [releases, setReleases] = useState(fallbackReleases);
  const searchParams = useSearchParams();

  // Refresh from GitHub on mount so new releases show up without a redeploy.
  // On any failure we simply keep the snapshot baked into the deployed build.
  useEffect(() => {
    const controller = new AbortController();

    fetchChangelogReleases({
      maxPages: CLIENT_MAX_PAGES,
      signal: controller.signal,
    })
      .then((live) => {
        if (live.length > 0) {
          setReleases(mergeReleases(live, fallbackReleases));
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          console.warn("Keeping the prebuilt changelog:", error);
        }
      });

    return () => controller.abort();
  }, []);

  const requestedPlatform = searchParams.get("platform");
  const activeFilter: ChangelogFilter =
    requestedPlatform === "desktop" || requestedPlatform === "mobile"
      ? requestedPlatform
      : "all";
  const visibleReleases =
    activeFilter === "all"
      ? releases
      : releases.filter((release) => release.platform === activeFilter);

  return (
    <>
      <nav
        aria-label="Filter changelog by platform"
        className="mb-12 flex justify-center"
      >
        <div className="inline-flex rounded-xl border border-border bg-background-subtle/80 p-1 shadow-sm">
          {filters.map((filter) => {
            const active = filter.value === activeFilter;
            return (
              <Link
                key={filter.value}
                href={filter.href}
                aria-current={active ? "page" : undefined}
                scroll={false}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                  active
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {filter.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {visibleReleases.length > 0 ? (
        <div className="relative space-y-8 before:absolute before:bottom-0 before:left-[7px] before:top-3 before:w-px before:bg-border sm:before:left-[9px]">
          {visibleReleases.map((release) => (
            <article
              key={release.tag}
              className="relative pl-8 sm:pl-10"
            >
              <span className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-[3px] border-background bg-accent shadow-[0_0_0_1px_var(--border)] sm:h-[19px] sm:w-[19px]" />
              <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm">
                <header className="border-b border-border/70 bg-background-subtle/50 px-5 py-5 sm:px-7">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
                      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                        {releaseVersion(release)}
                      </h2>
                      <PlatformBadge platform={release.platform} />
                      <time
                        dateTime={release.publishedAt}
                        className="whitespace-nowrap text-sm text-muted"
                      >
                        {releaseDate(release.publishedAt)}
                      </time>
                      {release.prerelease && (
                        <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                          Prerelease
                        </span>
                      )}
                    </div>
                    <a
                      href={release.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${releaseVersion(release)} release on GitHub`}
                      title="View release on GitHub"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-foreground/20 hover:bg-background hover:text-foreground"
                    >
                      <Github size={17} aria-hidden="true" />
                    </a>
                  </div>
                </header>

                <div className="px-5 py-6 sm:px-7">
                  {release.notes.length > 0 ? (
                    <ul className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-muted">
                      {release.notes.map((note, index) => (
                        <li key={`${release.tag}-${index}`}>{note}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted">
                      No release notes were provided for this version.
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <p className="font-semibold text-foreground">No releases found</p>
          <p className="mt-2 text-sm text-muted">
            There are no releases for this platform yet.
          </p>
        </div>
      )}
    </>
  );
}
