import type { Metadata } from "next";
import {
  PrivacyPolicyContent,
  PrivacyPolicyLayout,
} from "@/components/PrivacyPolicy";
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
    title: `${t("privacy.title")}: Meron`,
    description: t("privacy.metaDescription"),
  };
}

export default async function PrivacyPolicy(
  props: { params: Promise<{ locale: string }> }
) {
  const params = await props.params;
  const locale = params.locale as Locale;

  return (
    <PrivacyPolicyLayout locale={locale}>
      <PrivacyPolicyContent locale={locale} />
    </PrivacyPolicyLayout>
  );
}
