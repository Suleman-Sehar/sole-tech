const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        "background-secondary": "#111827",
        brand: { cyan: "#00D4FF", blue: "#008CFF", "dark-blue": "#0047FF" },
      },
      fontFamily: { heading: ["Space Grotesk", "sans-serif"], body: ["Inter", "sans-serif"] },
      keyframes: {
        "robot-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "robot-float": "robot-float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;