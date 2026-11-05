import { ImageLightbox } from "@/components/ImageLightbox";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ImageLightbox />
    </>
  );
}
