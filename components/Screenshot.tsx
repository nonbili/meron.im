import Image from "next/image";

export function Screenshot({
  src,
  alt,
  width = 1200,
  height = 800,
  priority = false,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <div
      data-lightbox=""
      className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-black/[0.06] dark:shadow-black/45 transition-all duration-300"
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="h-auto w-full"
      />
      {/* Subtle screen reflection shine overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] dark:via-white/[0.01] dark:to-white/[0.03]" />
    </div>
  );
}

