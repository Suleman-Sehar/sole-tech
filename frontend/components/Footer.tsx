"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Github, Twitter } from "lucide-react";

const footerLinks = {
  Company: [
    { href: "/about", label: "About" },
    { href: "/leadership", label: "Leadership" },
  ],
  Services: [
    { href: "/services", label: "Agentic AI Development" },
    { href: "/services", label: "AI Automation" },
    { href: "/services", label: "Machine Learning" },
    { href: "/services", label: "NLP Solutions" },
  ],
  Portfolio: [
    { href: "/portfolio", label: "View Our Work" },
  ],
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ],
};

const socialLinks = [
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Github, label: "GitHub" },
  { href: "#", icon: Twitter, label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4 font-heading">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-brand-cyan transition-colors duration-200 text-sm font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/logo-dark-bg.png"
              alt="Sole-Tech"
              width={140}
              height={42}
              className="h-10 w-auto opacity-90"
            />
            <p className="text-gray-500 text-sm ml-4 font-body">
              &copy; {new Date().getFullYear()} Sole-Tech. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="text-gray-400 hover:text-brand-cyan transition-colors duration-200"
                whileHover={{ scale: 1.2, color: "#00D4FF" }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}