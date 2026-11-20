import { Fragment, type ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { defaultLocale, getTranslations, type Locale } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/site";

const linkClass = "text-accent hover:underline";
const headingClass = "text-xl font-bold tracking-tight text-foreground";

function renderInterpolated(
  template: string,
  vars: Record<string, ReactNode>,
): ReactNode[] {
  return template.split(/(\{[a-zA-Z0-9_]+\})/g).map((part, index) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      const key = part.slice(1, -1);
      if (key in vars) {
        return <Fragment key={index}>{vars[key]}</Fragment>;
      }
    }
    return part;
  });
}

export function PrivacyPolicyLayout({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const { t } = getTranslations(locale);

  return (
    <>
      <Nav locale={locale} />
      <main className="relative min-h-screen bg-background text-foreground">
        <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_60%)] opacity-70" />
        <article className="mx-auto max-w-3xl px-5 py-20 md:py-28">
          <header className="mb-12 border-b border-border/60 pb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {t("privacy.title")}
            </h1>
            <p className="mt-4 text-sm text-muted">
              {locale === "en" ? (
                <>Last updated <time dateTime="2026-11-20">November 20, 2026</time></>
              ) : (
                t("privacy.lastUpdated")
              )}
            </p>
          </header>
          <div className="space-y-10 text-[16px] leading-relaxed text-muted/90">
            {children}
          </div>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}

export function PrivacyPolicyContent({ locale = defaultLocale }: { locale?: Locale }) {
  const { t } = getTranslations(locale);

  return (
    <>
      <p>{t("privacy.intro")}</p>

      <section className="space-y-4">
        <h2 className={headingClass}>{t("privacy.googleData.title")}</h2>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <strong className="text-foreground">
              {t("privacy.googleData.accountTitle")}
            </strong>{" "}
            {t("privacy.googleData.accountBody")}
          </li>
          <li>
            <strong className="text-foreground">
              {t("privacy.googleData.gmailTitle")}
            </strong>{" "}
            {renderInterpolated(t("privacy.googleData.gmailBody"), {
              scope: <code className="break-all">https://mail.google.com/</code>,
            })}
          </li>
          <li>
            <strong className="text-foreground">
              {t("privacy.googleData.calendarTitle")}
            </strong>{" "}
            {renderInterpolated(t("privacy.googleData.calendarBody"), {
              scope: (
                <code className="break-all">
                  https://www.googleapis.com/auth/calendar
                </code>
              ),
            })}
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className={headingClass}>{t("privacy.storage.title")}</h2>
        <p>{t("privacy.storage.body")}</p>
      </section>

      <section className="space-y-4">
        <h2 className={headingClass}>{t("privacy.recipients.title")}</h2>
        <ul className="list-disc space-y-3 pl-6">
          <li>{t("privacy.recipients.item1")}</li>
          <li>{t("privacy.recipients.item2")}</li>
          <li>{t("privacy.recipients.item3")}</li>
          <li>{t("privacy.recipients.item4")}</li>
        </ul>
        <p>{t("privacy.recipients.outro")}</p>
      </section>

      <section className="space-y-4 rounded-2xl border border-accent/10 bg-accent/5 p-6">
        <h2 className={headingClass}>{t("privacy.limitedUse.title")}</h2>
        <p className="text-foreground/90">
          {renderInterpolated(t("privacy.limitedUse.body"), {
            policyLink: (
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                className={linkClass}
              >
                {t("privacy.limitedUse.policyLink")}
              </a>
            ),
            limitedUse: <strong>{t("privacy.limitedUse.limitedUseTerm")}</strong>,
          })}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className={headingClass}>{t("privacy.retention.title")}</h2>
        <p>{t("privacy.retention.body1")}</p>
        <p>
          {renderInterpolated(t("privacy.retention.body2"), {
            permissionsLink: (
              <a
                href="https://myaccount.google.com/permissions"
                className={linkClass}
              >
                {t("privacy.retention.permissionsLink")}
              </a>
            ),
          })}
        </p>
      </section>

      <section className="space-y-4 border-t border-border/60 pt-8">
        <h2 className={headingClass}>{t("privacy.changes.title")}</h2>
        <p>{t("privacy.changes.body1")}</p>
        <p>
          {renderInterpolated(t("privacy.changes.body2"), {
            emailLink: (
              <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                {CONTACT_EMAIL}
              </a>
            ),
          })}
        </p>
      </section>
    </>
  );
}
