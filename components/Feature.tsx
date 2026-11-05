import type { LucideIcon } from "lucide-react";
import { Screenshot } from "./Screenshot";

export function Feature({
  icon: Icon,
  eyebrow,
  title,
  body,
  src,
  alt,
  reverse = false,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  src: string;
  alt: string;
  reverse?: boolean;
}) {
  return (
    <div className="feature-scroll-reveal grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className={reverse ? "md:order-2" : ""}>
        <div className="flex items-center gap-2 text-sm font-medium text-muted">
          <Icon size={14} className="stroke-[2.5]" />
          {eyebrow}
        </div>
        <h3 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h3>
        <p className="mt-4 text-[17px] leading-relaxed text-muted">{body}</p>
      </div>
      <div className={`${reverse ? "md:order-1" : ""} group relative`}>
        {/* Glow backdrop on hover */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-accent/5 to-accent/10 opacity-0 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
        <div className="transition-all duration-500 ease-out group-hover:scale-[1.015] group-hover:-translate-y-1">
          <Screenshot src={src} alt={alt} />
        </div>
      </div>
    </div>
  );
}

