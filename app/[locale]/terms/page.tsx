import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GITHUB_URL, CONTACT_EMAIL } from "@/lib/site";
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
    title: `${t("terms.title")}: Meron`,
    description: "Terms of Service for Meron. Read our conditions of use, software license details, and disclaimer policies.",
  };
}

export default async function TermsOfService(
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
              {t("terms.title")}
            </h1>
            <p className="mt-4 text-sm text-muted">
              {t("terms.lastUpdated")}
            </p>
          </header>

          <div className="space-y-10 text-[16px] leading-relaxed text-muted/90">
            <section className="space-y-4">
              <p>
                Welcome to <strong>Meron</strong>. These Terms of Service ("Terms") govern your download,
                installation, and use of the Meron desktop application ("Software") and our website at{" "}
                <a href="https://meron.im" className="text-accent hover:underline">
                  meron.im
                </a>{" "}
                ("Website"), provided by Nonbili Inc. ("we", "us", or "our").
              </p>
              <p>
                By using Meron, you agree to be bound by these Terms. If you do not agree, please do not
                download, install, or use the Software.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                1. Software License
              </h2>
              <p>
                The Meron desktop application is open-source software distributed under the{" "}
                <a
                  href={`${GITHUB_URL}/blob/main/LICENSE`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline"
                >
                  GNU Affero General Public License version 3 (AGPL-3.0)
                </a>
                . You are free to view, modify, and redistribute the source code in accordance with the
                terms of that license.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                2. Nature of Software (Local-First)
              </h2>
              <p>
                Meron is a local-first application. You acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your emails, account configurations, and credentials are saved locally on your computer.</li>
                <li>We do not host your email data or run server-side services that process or backup your email data.</li>
                <li>You are solely responsible for securing your own device, maintaining your credentials, and backing up your local files.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                3. Third-Party Integrations and OAuth
              </h2>
              <p>
                Meron integrates with third-party email providers (such as Google / Gmail) via API/OAuth mechanisms
                to display and manage your mail.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Your use of third-party email services is governed by the terms of service and privacy policies
                  of those respective providers (e.g., Google Terms of Service).
                </li>
                <li>
                  We do not control, modify, or assume responsibility for the uptime, availability, or policies
                  of third-party email services.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                4. Prohibited Uses
              </h2>
              <p>
                You agree not to use the Software or Website to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any local, state, national, or international laws or regulations.</li>
                <li>Transmit any material that is abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, or otherwise objectionable.</li>
                <li>Infringe upon the intellectual property rights of others.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                5. Disclaimer of Warranties
              </h2>
              <p className="italic">
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
                BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS, COPYRIGHT HOLDERS, OR NONBILI INC. BE LIABLE
                FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE,
                ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                6. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, in no event shall Nonbili Inc. or its suppliers
                be liable for any special, incidental, indirect, or consequential damages whatsoever (including,
                but not limited to, damages for loss of profits, loss of data, business interruption, or personal injury)
                arising out of or in any way related to the use of or inability to use the Software.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                7. Governing Law
              </h2>
              <p>
                These Terms and your use of Meron shall be governed by and construed in accordance with the laws
                of the State of Delaware, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="space-y-4 border-t border-border/60 pt-8">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                8. Contact Information
              </h2>
              <p>
                If you have any questions or feedback regarding these Terms, please contact us at:
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
