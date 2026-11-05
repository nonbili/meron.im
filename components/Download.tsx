import { Apple, Monitor, Smartphone, Terminal } from "lucide-react";
import { DOWNLOADS, downloadUrl } from "@/lib/site";
import { Locale, getTranslations } from "@/lib/i18n";

export function Download({ locale = "en" }: { locale?: Locale }) {
  const { t } = getTranslations(locale);

  const platforms = [
    { icon: Apple, name: "macOS", note: t("download.macosNote"), builds: DOWNLOADS.macOS },
    { icon: Monitor, name: "Windows", note: t("download.windowsNote"), builds: DOWNLOADS.Windows },
    { icon: Terminal, name: "Linux", note: t("download.linuxNote"), builds: DOWNLOADS.Linux },
    { icon: Smartphone, name: "Mobile", note: t("download.mobileNote"), builds: DOWNLOADS.Mobile },
  ];

  return (
    <section id="download" className="mx-auto max-w-6xl px-5 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-background-subtle to-background/50 px-6 py-16 text-center md:px-16 md:py-20 shadow-xl shadow-black/[0.02] dark:shadow-black/[0.1]">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[80px]" />

        <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {t("download.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-muted">
          {t("download.subtitle")}
        </p>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map(({ icon: Icon, name, note, builds }) => (
            <div
              key={name}
              className="group relative flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/60 backdrop-blur-sm px-6 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-card hover:shadow-xl hover:shadow-accent/5"
            >
              {/* Inner accent ring */}
              <div className="pointer-events-none absolute inset-px rounded-2xl border border-transparent transition-colors group-hover:border-accent/10" />

              <Icon size={32} className="text-foreground transition-transform duration-300 group-hover:scale-110 group-hover:text-accent" />
              <span className="mt-1 font-semibold text-[15px]">{name}</span>
              <span className="text-[13px] text-muted">{note}</span>

              <div className="mt-3 flex w-full flex-col gap-2">
                {builds.map(({ label, file, url }) => (
                  <a
                    key={url ?? file}
                    href={url ?? downloadUrl(file!)}
                    className="rounded-lg border border-border bg-background/60 px-3 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-accent active:scale-[0.98]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

