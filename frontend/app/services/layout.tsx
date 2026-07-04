import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Sole-Tech",
  description: "Comprehensive AI services including Agentic AI, Machine Learning, NLP, Web Development, and AI Consulting to transform your business.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}