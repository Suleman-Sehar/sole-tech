import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = {
  title: "Terms & Conditions | Sole-Tech",
  description: "Terms and conditions for using Sole-Tech services and website.",
};

export default function Terms() {
  return (
    <main>
      <section className="py-20 md:py-32 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Legal"
            title="Terms & Conditions"
            subtitle="Terms governing our services and website use"
            centered
          />

          <GlassCard className="p-8 md:p-12 mt-8 max-w-4xl mx-auto">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 font-body mb-4">
                Last updated: {new Date().getFullYear()}
              </p>
              <p className="text-gray-300 font-body mb-4">
                By accessing our website or using our services, you agree to these
                terms and conditions.
              </p>
              <h3 className="text-white font-heading mt-6 mb-3">Services</h3>
              <p className="text-gray-300 font-body mb-4">
                We provide AI development and consulting services as described on our
                website. All services are subject to availability and our
                discretion.
              </p>
              <h3 className="text-white font-heading mt-6 mb-3">Intellectual Property</h3>
              <p className="text-gray-300 font-body mb-4">
                All content on this website is the property of Sole-Tech and
                protected by copyright and other intellectual property laws.
              </p>
              <h3 className="text-white font-heading mt-6 mb-3">Limitation of Liability</h3>
              <p className="text-gray-300 font-body mb-4">
                Our liability for any claims arising from your use of our services
                is limited to the amount paid for those services.
              </p>
              <h3 className="text-white font-heading mt-6 mb-3">Contact</h3>
              <p className="text-gray-300 font-body">
                For questions about these terms, contact hello@sole-tech.ai.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}