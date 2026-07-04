"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { SectionHeading } from "@/components/SectionHeading";
import { Linkedin, Github, Twitter, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const serviceOptions = [
  "Agentic AI Development",
  "AI Automation",
  "Machine Learning",
  "NLP Solutions",
  "Web & Software Development",
  "AI Consulting",
  "Other",
];

const budgetOptions = ["<$10k", "$10k–$50k", "$50k–$150k", "$150k+", "Not sure yet"];

const contactSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  company: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Security note: Using localStorage for JWT storage. For production, prefer httpOnly cookies
// to prevent XSS attacks. This implementation uses localStorage for simplicity in development.

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Pre-select service from query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    if (serviceParam) {
      const serviceMap: Record<string, string> = {
        "agentic-ai": "Agentic AI Development",
        "automation": "AI Automation",
        "ml": "Machine Learning",
        "nlp": "NLP Solutions",
        "web": "Web & Software Development",
        "consulting": "AI Consulting",
      };
      const matchedService = serviceMap[serviceParam];
      if (matchedService) {
        setValue("service", matchedService);
      }
    }
  }, [setValue]);

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check - silently reject if filled
    if (data.website && data.website.length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/contact`,
        {
          full_name: data.name,
          company_name: data.company,
          email: data.email,
          phone_number: data.phone,
          service_required: data.service,
          budget_range: data.budget,
          message: data.message,
        }
      );
      setSubmitted(true);
    } catch (error) {
      setSubmitError("Unable to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="bg-[#0F172A] min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-12 text-center max-w-2xl mx-auto">
              <CheckCircle size={64} className="text-[#00D4FF] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4 font-heading">
                Thanks — we'll be in touch!
              </h2>
              <p className="text-lg text-gray-300 font-body">
                We'll respond within 1 business day.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="py-20 md:py-32 bg-[#111827]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Contact"
            title="Get In Touch"
            subtitle="Tell us about your project and we'll respond within 1 business day"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              className="lg:col-span-2"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <GlassCard className="p-8">
                {submitError && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 font-body">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot field - hidden from users */}
                  <div className="hidden">
                    <label htmlFor="website">Website (leave empty)</label>
                    <input {...register("website")} id="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 font-body">
                        Full Name *
                      </label>
                      <input
                        {...register("name")}
                        id="name"
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00D4FF] font-body"
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2 font-body">
                        Company
                      </label>
                      <input
                        {...register("company")}
                        id="company"
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00D4FF] font-body"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-body">
                        Email *
                      </label>
                      <input
                        {...register("email")}
                        id="email"
                        type="email"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00D4FF] font-body"
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-400">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2 font-body">
                        Phone
                      </label>
                      <input
                        {...register("phone")}
                        id="phone"
                        type="tel"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00D4FF] font-body"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2 font-body">
                        Service Required *
                      </label>
                      <select
                        {...register("service")}
                        id="service"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00D4FF] font-body"
                        aria-invalid={errors.service ? "true" : "false"}
                        aria-describedby={errors.service ? "service-error" : undefined}
                      >
                        <option value="" className="bg-[#0F172A]">Select a service</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0F172A]">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p id="service-error" className="mt-1 text-sm text-red-400">
                          {errors.service.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2 font-body">
                        Budget Range *
                      </label>
                      <select
                        {...register("budget")}
                        id="budget"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00D4FF] font-body"
                        aria-invalid={errors.budget ? "true" : "false"}
                        aria-describedby={errors.budget ? "budget-error" : undefined}
                      >
                        <option value="" className="bg-[#0F172A]">Select budget</option>
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0F172A]">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.budget && (
                        <p id="budget-error" className="mt-1 text-sm text-red-400">
                          {errors.budget.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 font-body">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00D4FF] font-body resize-none"
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-sm text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <GradientButton type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </GradientButton>
                </form>
              </GlassCard>
            </motion.div>

            <motion.div
              className="lg:col-span-1"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <GlassCard className="p-8 h-full">
                <h3 className="text-xl font-bold text-white mb-6 font-heading">Contact Information</h3>

                <div className="space-y-6 mb-8">
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 text-[#00D4FF] mr-3 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400 font-body">Email</p>
                        <a href="mailto:solemanseher@gmail.com" className="text-white font-body hover:text-[#00D4FF]">
                          solemanseher@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="w-5 h-5 text-[#00D4FF] mr-3 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400 font-body">Phone</p>
                        <a href="tel:+923322580130" className="text-white font-body hover:text-[#00D4FF]">
                          +92 332 2580130
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-[#00D4FF] mr-3 mt-1" />
                      <div>
                        <p className="text-sm text-gray-400 font-body">Location</p>
                        <p className="text-white font-body">Sharah-e-Faisal, Karachi, Pakistan</p>
                      </div>
                    </div>
                </div>

                {/* TODO: Replace coordinates with actual business address */}
                <div className="w-full h-48 mb-6 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14473.792!2d67.0699!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e7f74df4947%3A0x7f0e024b2c765a6d!2sSharae%20Faisal%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sole-Tech office location map"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-3 font-body">Follow Us</p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-[#00D4FF] transition-colors" aria-label="LinkedIn">
                      <Linkedin size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#00D4FF] transition-colors" aria-label="GitHub">
                      <Github size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#00D4FF] transition-colors" aria-label="Twitter">
                      <Twitter size={24} />
                    </a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}