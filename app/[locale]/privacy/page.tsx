import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CONTACT_EMAIL } from "@/lib/site";
import { Locale, getTranslations, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale as Locale;
  const { t } = getTranslations(locale);
  return {
    title: `${t("privacy.title")}: Meron`,
    description: "Privacy Policy for Meron. Learn how we handle your data, our local-first architecture, and compliance with Google API services.",
  };
}

export default async function PrivacyPolicy(
  props: { params: Promise<{ locale: string }> }
) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const { t } = getTranslations(locale);

  return (
    <>
      <Nav locale={locale} />
      <main className="relative min-h-screen bg-background text-foreground">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_60%)] opacity-70" />

        <article className="mx-auto max-w-3xl px-5 py-20 md:py-28">
          <header className="mb-12 border-b border-border/60 pb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {t("privacy.title")}
            </h1>
            <p className="mt-4 text-sm text-muted">
              {t("privacy.lastUpdated")}
            </p>
          </header>

          <div className="space-y-10 text-[16px] leading-relaxed text-muted/90">
            <section className="space-y-4">
              <p>
                At <strong>Meron</strong> (operated by Nonbili Inc.), we respect your privacy.
                Meron is built as a <strong>local-first</strong> desktop application. This means
                that your emails, account credentials, settings, and personal data are stored
                directly on your own device and are not uploaded to our servers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                1. Information We Collect and Access
              </h2>
              <p>
                Because Meron runs locally on your machine, we do not collect your personal information
                on any central server. The only data processed is on your local device to enable email functions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">Email Credentials and Tokens:</strong> To log into your email accounts (such as Gmail), Meron requests authorization tokens via OAuth or stores your credentials securely using your operating system's native keychain.
                </li>
                <li>
                  <strong className="text-foreground">Email Messages and Metadata:</strong> Meron retrieves, indexes, and displays your emails, contacts, and attachments locally to provide features like a unified inbox, kanban view, and media gallery.
                </li>
                <li>
                  <strong className="text-foreground">Application Preferences:</strong> Theme settings, custom columns, and layout preferences are stored in local configuration files on your device.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                2. How We Use Your Information
              </h2>
              <p>
                All data accessed through third-party integrations (including Google APIs) is processed entirely client-side to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Render your emails in a chat-like conversation layout.</li>
                <li>Organize emails into local Kanban boards.</li>
                <li>Construct local media grids of your attachments.</li>
                <li>Perform high-speed local search queries.</li>
              </ul>
            </section>

            <section className="space-y-4 bg-accent/5 border border-accent/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Google API Services User Data Policy
              </h2>
              <p className="text-foreground/90">
                Meron's use and transfer to any other app of information received from Google APIs
                will adhere to the{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline font-semibold"
                >
                  Google API Services User Data Policy
                </a>
                , including the <strong>Limited Use</strong> requirements.
              </p>
              <p className="text-sm mt-2">
                Specifically, Google user data obtained via Google OAuth is stored solely on your local
                machine and is never transferred to external servers, shared with third parties, or used
                for advertising, marketing, or any other commercial tracking purposes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                3. Sharing and Transfer of Data
              </h2>
              <p>
                We do not sell, trade, or share your data. Because your data is stored locally:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>No email content is transferred to Nonbili Inc. or any third-party server.</li>
                <li>We do not display ads or track your behavior for advertising networks.</li>
                <li>
                  If you submit diagnostic logs or contact us via email, we will only use that information
                  to help resolve your specific technical request.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                4. Data Security and Retention
              </h2>
              <p>
                Your data is as secure as your computer itself. We recommend utilizing full disk encryption
                (such as FileVault on macOS or BitLocker on Windows) to protect your local data files.
                If you delete an email account from Meron, all associated authentication tokens and locally
                cached emails are permanently deleted from your local storage.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                5. Revoking Access
              </h2>
              <p>
                You can revoke Meron's access to your Google Account or other email providers at any time:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>By removing the account from the settings screen inside the Meron application.</li>
                <li>
                  By visiting your{" "}
                  <a
                    href="https://myaccount.google.com/permissions"
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline"
                  >
                    Google Account Security Settings
                  </a>{" "}
                  and removing access for Meron.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                6. Changes to This Privacy Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time to reflect changes in our app's features
                or legal requirements. We will notify you of any changes by posting the new Privacy Policy
                on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="space-y-4 border-t border-border/60 pt-8">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                7. Contact Us
              </h2>
              <p>
                If you have any questions or concerns regarding this Privacy Policy or how your local data
                is handled, please contact us at:
              </p>
              <p className="font-semibold text-foreground">
                Email:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}
