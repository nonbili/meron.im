import Image from "next/image";
import { Locale, getTranslations } from "@/lib/i18n";

export function FeatureBento({ locale = "en" }: { locale?: Locale }) {
  const { t } = getTranslations(locale);
  const features: Array<{
    key: string;
    src: string;
    darkSrc?: string;
  }> = [
    {
      key: "contacts",
      src: "/screenshots/contacts.webp",
      darkSrc: "/screenshots/contacts-dark.webp",
    },
    // The gallery opens as a dark lightbox in every theme, so one image serves both.
    { key: "gallery", src: "/screenshots/media-gallery.webp" },
    {
      key: "localFolders",
      src: "/screenshots/local-folders.webp",
      darkSrc: "/screenshots/local-folders-dark.webp",
    },
    {
      key: "composer",
      src: "/screenshots/compose.webp",
      darkSrc: "/screenshots/compose-dark.webp",
    },
  ];

  return (
    <section className="border-y border-border/70 bg-background-subtle/50">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {t("bento.eyebrow")}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("bento.title")}
          </h2>
          <p className="mt-3 text-pretty text-base text-muted sm:text-[17px]">
            {t("bento.subtitle")}
          </p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-12">
          {features.map(({ key, src, darkSrc }) => (
            <div key={key} className="screenshot-card flex flex-col">
              <div
                data-lightbox=""
                className="aspect-[16/10] overflow-hidden rounded-xl border border-border bg-card"
              >
                <Image
                  src={src}
                  alt={t(`bento.${key}.alt`)}
                  width={1280}
                  height={820}
                  loading="lazy"
                  className={
                    darkSrc
                      ? "h-full w-full object-cover object-top transition-transform duration-300 hover:scale-[1.02] block dark:hidden"
                      : "h-full w-full object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
                  }
                />
                {darkSrc && (
                  <Image
                    src={darkSrc}
                    alt={t(`bento.${key}.alt`)}
                    width={1280}
                    height={820}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-[1.02] hidden dark:block"
                  />
                )}
              </div>
              <h3 className="screenshot-card__title mt-5 text-lg font-semibold tracking-tight text-foreground">
                {t(`bento.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(`bento.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
