import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Feature } from "@/components/Feature";
import { FeatureBento } from "@/components/FeatureBento";
import { SecuritySection } from "@/components/SecuritySection";
import { ThemeSimulator } from "@/components/ThemeSimulator";
import { LatestReleases } from "@/components/LatestReleases";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";
import { ImageLightbox } from "@/components/ImageLightbox";
import { Locale, getTranslations, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function HomePage({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);

  return (
    <>
      <Nav locale={locale} />
      <main className="screenshot-gallery overflow-x-clip">
        <Hero locale={locale} />

        {/* The two main ways to work with mail. */}
        <section id="features" className="mx-auto max-w-6xl px-5 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              {t("features.eyebrow")}
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("features.title")}
            </h2>
            <p className="mt-3 text-pretty text-base text-muted sm:text-[17px]">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="mt-20 space-y-28">
            <Feature
              eyebrow={t("features.inbox.eyebrow")}
              title={t("features.inbox.title")}
              body={t("features.inbox.body")}
              points={[
                t("features.inbox.point1"),
                t("features.inbox.point2"),
                t("features.inbox.point3"),
              ]}
              src="/screenshots/blog/meron-0411-tabs-session.png"
              alt={t("features.inbox.alt")}
            />
            <Feature
              eyebrow={t("features.kanban.eyebrow")}
              title={t("features.kanban.title")}
              body={t("features.kanban.body")}
              points={[
                t("features.kanban.point1"),
                t("features.kanban.point2"),
                t("features.kanban.point3"),
              ]}
              src="/screenshots/blog/meron-047-saved-search.png"
              alt={t("features.kanban.alt")}
              reverse
            />
            <Feature
              eyebrow={t("features.rules.eyebrow")}
              title={t("features.rules.title")}
              body={t("features.rules.body")}
              points={[
                t("features.rules.point1"),
                t("features.rules.point2"),
                t("features.rules.point3"),
              ]}
              src="/screenshots/blog/meron-052-sent-rules.png"
              alt={t("features.rules.alt")}
            />
            <Feature
              eyebrow={t("features.calendar.eyebrow")}
              title={t("features.calendar.title")}
              body={t("features.calendar.body")}
              points={[
                t("features.calendar.point1"),
                t("features.calendar.point2"),
                t("features.calendar.point3"),
              ]}
              src="/screenshots/blog/meron-047-invite-card.png"
              alt={t("features.calendar.alt")}
              reverse
            />
          </div>
        </section>

        {/* Everyday Power Features Bento */}
        <FeatureBento locale={locale} />

        {/* Security & Open Source */}
        <SecuritySection locale={locale} />

        {/* Interactive Theme Simulator */}
        <section
          id="themes"
          className="border-y border-border/80 bg-gradient-to-b from-background-subtle to-background"
        >
          <div className="mx-auto max-w-6xl px-5 py-24">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {t("themes.eyebrow")}
              </p>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("themes.title")}
              </h2>
              <p className="mt-4 text-pretty text-[16px] leading-relaxed text-muted sm:text-[17px]">
                {t("themes.body")}
              </p>
            </div>
            <div className="mx-auto max-w-4xl">
              <ThemeSimulator locale={locale} />
            </div>
          </div>
        </section>

        {/* Latest Releases */}
        <LatestReleases locale={locale} />

        {/* Download Hub */}
        <Download locale={locale} />
      </main>
      <Footer locale={locale} />
      <ImageLightbox />
    </>
  );
}

export default async function Home(
  props: { params: Promise<{ locale: string }> }
) {
  const params = await props.params;
  return <HomePage locale={params.locale as Locale} />;
}
