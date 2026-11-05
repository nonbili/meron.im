import { Inbox, Images, Palette, Lock, Github, Infinity } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Feature } from "@/components/Feature";
import { Screenshot } from "@/components/Screenshot";
import { ThemeSimulator } from "@/components/ThemeSimulator";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";
import { GITHUB_URL } from "@/lib/site";
import { Locale, getTranslations, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


export function HomePage({ locale }: { locale: Locale }) {
  const { t } = getTranslations(locale);

  return (
    <>
      <Nav locale={locale} />
      <main>
        <Hero locale={locale} />

        <section id="features" className="mx-auto max-w-6xl space-y-24 px-5 py-24">
          <Feature
            icon={Inbox}
            eyebrow={t("features.inbox.eyebrow")}
            title={t("features.inbox.title")}
            body={t("features.inbox.body")}
            src="/screenshots/unified-inbox.png"
            alt={t("features.inbox.alt")}
          />
          <Feature
            icon={Images}
            eyebrow={t("features.gallery.eyebrow")}
            title={t("features.gallery.title")}
            body={t("features.gallery.body")}
            src="/screenshots/media-gallery.png"
            alt={t("features.gallery.alt")}
            reverse
          />
        </section>

        <section
          id="themes"
          className="border-y border-border/80 bg-gradient-to-b from-background-subtle to-background"
        >
          <div className="mx-auto max-w-6xl px-5 py-24">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted">
                <Palette size={14} className="stroke-[2.5]" /> {t("themes.eyebrow")}
              </div>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("themes.title")}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-muted">
                {t("themes.body")}
              </p>
            </div>
            <div className="mx-auto max-w-4xl">
              <ThemeSimulator locale={locale} />
            </div>
          </div>
        </section>

        <section id="open-source" className="mx-auto max-w-6xl px-5 py-24">
          <div className="feature-scroll-reveal grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted">
                <Lock size={14} className="stroke-[2.5]" /> {t("openSource.eyebrow")}
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("openSource.title")}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-muted">
                {t("openSource.body")}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {[
                  { icon: Github, label: t("openSource.badgeOpenSource") },
                  { icon: Lock, label: t("openSource.badgePrivate") },
                  { icon: Infinity, label: t("openSource.badgeFree") },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 text-sm text-muted"
                  >
                    <Icon size={14} className="text-accent" /> {label}
                  </span>
                ))}
              </div>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-background-subtle hover:border-foreground/20 active:scale-[0.99] transition-all duration-200"
              >
                <Github size={18} /> {t("openSource.viewSource")}
              </a>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-accent/5 to-accent/10 opacity-0 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
              <div className="transition-all duration-500 ease-out group-hover:scale-[1.015] group-hover:-translate-y-1">
                <Screenshot
                  src="/screenshots/media-grid.png"
                  alt={t("openSource.screenshotAlt")}
                />
              </div>
            </div>
          </div>
        </section>

        <Download locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}

export default async function Home(
  props: { params: Promise<{ locale: string }> }
) {
  const params = await props.params;
  return <HomePage locale={params.locale as Locale} />;
}
