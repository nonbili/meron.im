import Image from "next/image";
import { Locale, getTranslations } from "@/lib/i18n";

export function FeatureBento({ locale = "en" }: { locale?: Locale }) {
  const { t } = getTranslations(locale);
  const features = [
    { key: "contacts", src: "/screenshots/blog/meron-0411-contacts-panel.png", span: "md:col-span-3" },
    { key: "gallery", src: "/screenshots/media-gallery.png", span: "md:col-span-3" },
    { key: "localFolders", src: "/screenshots/blog/meron-048-local-folders.png", span: "md:col-span-2" },
    { key: "eml", src: "/screenshots/blog/meron-050-eml-reader.png", span: "md:col-span-2" },
    { key: "composer", src: "/screenshots/blog/meron-051-signature-toggle.png", span: "md:col-span-2" },
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
        <div className="mt-12 grid gap-10 md:grid-cols-6 md:gap-8">
          {features.map(({ key, src, span }) => (
            <div key={key} className={`screenshot-card flex flex-col ${span}`}>
              <div
                data-lightbox=""
                className="aspect-[16/10] overflow-hidden rounded-xl border border-border bg-card"
              >
                <Image
                  src={src}
                  alt={t(`bento.${key}.alt`)}
                  width={1280}
                  height={820}
                  loading="eager"
                  className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
                />
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
