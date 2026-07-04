import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SiteBackground } from "@/components/SiteBackground";
import { ChatWidget } from "@/components/ChatWidget";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

export const metadata = {
  title: {
    default: "Sole-Tech | AI Solutions That Transform Businesses",
    template: "%s | Sole-Tech",
  },
  description: "Building Intelligent AI Solutions That Transform Businesses",
  metadataBase: new URL("https://sole-tech.ai"),
  icons: {
    icon: "/icons.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sole-tech.ai",
    siteName: "Sole-Tech",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sole-Tech - AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sole-tech-ai",
    creator: "@sole-tech-ai",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sole-Tech",
              url: "https://sole-tech.ai",
              logo: "https://sole-tech.ai/logo.png",
              description: "Building Intelligent AI Solutions That Transform Businesses",
              address: {
                "@type": "PostalAddress",
                addressLocality: "San Francisco",
                addressRegion: "CA",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@sole-tech.ai",
                contactType: "customer service",
              },
              sameAs: [
                "https://linkedin.com/company/sole-tech",
                "https://twitter.com/sole-tech-ai",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.className} bg-background text-white antialiased`}>
        <SiteBackground />
        <Navbar />
        <main className="pt-16 md:pt-20">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}