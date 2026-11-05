import type { Metadata } from "next";
import { Suspense } from "react";
import { ChangelogList } from "@/components/ChangelogList";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { getChangelogReleases } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog: Meron",
  description:
    "See what is new in Meron for desktop and mobile, including the latest features, improvements, and fixes.",
  alternates: {
    canonical: "/changelog",
  },
};

export default async function ChangelogPage() {
  const releases = await getChangelogReleases();

  return (
    <>
      <Nav locale="en" showLanguageSwitcher={false} />
      <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 -z-20 bg-grid opacity-50" />

        <section className="mx-auto max-w-4xl px-5 py-20 md:py-28">
          <header className="mx-auto mb-10 max-w-2xl text-center">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
              Changelog
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-[17px] leading-relaxed text-muted">
              New features, improvements, and fixes across Meron
              desktop and mobile.
            </p>
          </header>

          <Suspense
            fallback={
              <div className="py-16 text-center text-sm text-muted">
                Loading releases…
              </div>
            }
          >
            <ChangelogList releases={releases} />
          </Suspense>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
