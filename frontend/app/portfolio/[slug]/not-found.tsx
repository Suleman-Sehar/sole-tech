import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0F172A]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 font-heading">404</h1>
        <h2 className="text-2xl text-gray-300 mb-6 font-body">Case study not found</h2>
        <Link href="/portfolio" className="text-[#00D4FF] hover:text-[#008CFF] font-body">
          ← Back to portfolio
        </Link>
      </div>
    </main>
  );
}