import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Style Guide | Sole-Tech",
  description: "Component library preview for Sole-Tech design system",
};

export default function StyleGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}