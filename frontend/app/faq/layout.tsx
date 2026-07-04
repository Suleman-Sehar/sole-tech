import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Sole-Tech",
  description: "Frequently asked questions about our AI development services.",
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}