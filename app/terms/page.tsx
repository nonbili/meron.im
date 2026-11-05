"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { locales, defaultLocale } from "@/lib/i18n";

export default function RootTermsPage() {
  const router = useRouter();

  useEffect(() => {
    const languages = navigator.languages || [navigator.language];
    let matchedLocale = defaultLocale;

    for (const lang of languages) {
      const cleanLang = lang.replace("-", "_");
      
      let matched = locales.find(
        (loc) => loc.toLowerCase() === cleanLang.toLowerCase()
      );
      if (matched) {
        matchedLocale = matched;
        break;
      }
      
      const prefix = cleanLang.split("_")[0];
      matched = locales.find(
        (loc) => loc.toLowerCase() === prefix.toLowerCase()
      );
      if (matched) {
        matchedLocale = matched;
        break;
      }
    }

    router.replace(`/${matchedLocale}/terms`);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  );
}
