import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = {
  title: "Privacy Policy | Sole-Tech",
  description: "Our privacy policy outlining how we collect, use, and protect your data.",
};

export default function Privacy() {
  return (
    <main>
      <section className="py-20 md:py-32 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Legal"
            title="Privacy Policy"
            subtitle="How we handle your data and privacy"
            centered
          />

          <GlassCard className="p-8 md:p-12 mt-8 max-w-4xl mx-auto">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 font-body mb-4">
                Last updated: {new Date().getFullYear()}
              </p>
              <p className="text-gray-300 font-body mb-4">
                Sole-Tech is committed to protecting your privacy. This policy
                describes what information we collect, how we use it, and your
                choices regarding your data.
              </p>
              <h3 className="text-white font-heading mt-6 mb-3">Information We Collect</h3>
              <p className="text-gray-300 font-body mb-4">
                We collect information you provide directly to us through our
                contact forms, including your name, email, company, and any
                messages you send us.
              </p>
              <h3 className="text-white font-heading mt-6 mb-3">How We Use Your Information</h3>
              <p className="text-gray-300 font-body mb-4">
                We use your information to respond to your inquiries, send you
                updates about our services, and improve our website experience.
              </p>
              <h3 className="text-white font-heading mt-6 mb-3">Data Security</h3>
              <p className="text-gray-300 font-body mb-4">
                We implement appropriate security measures to protect your personal
                information against unauthorized access, alteration, or destruction.
              </p>
              <h3 className="text-white font-heading mt-6 mb-3">Contact Us</h3>
              <p className="text-gray-300 font-body">
                If you have questions about this privacy policy, please contact us
                at hello@sole-tech.ai.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}