"use client";

import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <main>{children}</main>
    </div>
  );
}