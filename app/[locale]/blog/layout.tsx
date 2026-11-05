import { ImageLightbox } from "@/components/ImageLightbox";

export default function LocalizedBlogLayout({
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
