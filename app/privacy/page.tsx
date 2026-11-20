import type { Metadata } from "next";
import {
  PrivacyPolicyContent,
  PrivacyPolicyLayout,
} from "@/components/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy: Meron",
  description:
    "How Meron accesses, uses, stores, and shares Gmail and Google Calendar data, and how you can delete local copies and revoke access.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PrivacyPolicyLayout locale="en">
      <PrivacyPolicyContent locale="en" />
    </PrivacyPolicyLayout>
  );
}
