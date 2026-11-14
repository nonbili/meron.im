import { ArrowUpRight } from "lucide-react";
import { GITHUB_URL } from "@/lib/site";
import { Locale, getTranslations } from "@/lib/i18n";
import { Screenshot } from "./Screenshot";

export function SecuritySection({ locale = "en" }: { locale?: Locale }) {
  const { t } = getTranslations(locale);

  return (
    <section id="security" className="mx-auto max-w-6xl px-5 py-24">
      <div id="open-source" className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {t("security.eyebrow")}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("security.title")}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-[17px]">
            {t("security.body")}
          </p>
          <dl className="mt-7 space-y-5 border-t border-border pt-6">
            {[1, 2, 3].map((pillar) => (
              <div key={pillar}>
                <dt className="text-sm font-semibold text-foreground">
                  {t(`security.card${pillar}Title`)}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">
                  {t(`security.card${pillar}Body`)}
                </dd>
              </div>
            ))}
          </dl>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 hover:underline"
          >
            {t("openSource.viewSource")}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <Screenshot
            src="/screenshots/openpgp.png"
            darkSrc="/screenshots/openpgp-dark.png"
            alt={t("security.alt")}
            width={1280}
            height={820}
          />
        </div>
      </div>
    </section>
  );
}
