import { Screenshot } from "./Screenshot";

export function Feature({
  eyebrow,
  title,
  body,
  points,
  src,
  darkSrc,
  alt,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  points?: string[];
  src: string;
  darkSrc?: string;
  alt: string;
  reverse?: boolean;
}) {
  return (
    <div className="feature-scroll-reveal grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className={`min-w-0 lg:col-span-5 ${reverse ? "lg:order-2" : ""}`}>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
        <h3 className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-[34px] lg:leading-[1.15]">
          {title}
        </h3>
        <p className="mt-4 text-pretty text-[16px] leading-relaxed text-muted sm:text-[17px]">
          {body}
        </p>
        {points && points.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90"
              >
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={`min-w-0 lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}>
        <Screenshot src={src} darkSrc={darkSrc} alt={alt} width={1280} height={820} />
      </div>
    </div>
  );
}
