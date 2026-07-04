import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = {
  title: "Blog | Sole-Tech",
  description: "Insights, tutorials, and thoughts on AI development and machine learning.",
};

export default function Blog() {
  return (
    <main>
      <section className="py-20 md:py-32 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Blog"
            title="Coming Soon"
            subtitle="Our blog is under construction. Check back soon for AI insights and tutorials."
            centered
          />
          <div className="flex justify-center mt-12">
            <GlassCard className="p-12 text-center max-w-2xl">
              <p className="text-lg text-gray-300 font-body">
                We're working on bringing you valuable content about AI development,
                machine learning, and digital transformation. Stay tuned!
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
    </main>
  );
}