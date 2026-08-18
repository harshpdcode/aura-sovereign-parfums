/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0B0B0B",
          50: "#262626",
          100: "#1C1C1C",
          200: "#161616",
          300: "#121212",
          400: "#0E0E0E",
          500: "#0B0B0B",
          900: "#050505",
        },
        charcoal: {
          DEFAULT: "#181716",
          light: "#232220",
          dark: "#121110",
        },
        gold: {
          DEFAULT: "#C6A15B",
          light: "#DFC38A",
          dark: "#9E7B35",
          muted: "#8C6A3D",
          shimmer: "#F3E5AB",
        },
        ivory: {
          DEFAULT: "#F5F1E8",
          light: "#FAF9F6",
          muted: "#E6DFD1",
        },
        smoke: {
          DEFAULT: "#A8A49D",
          light: "#C2BEB7",
          dark: "#77736D",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cinzel", "Playfair Display", "Georgia", "serif"],
        playfair: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 30%, rgba(198, 161, 91, 0.15), transparent 70%)',
        'gold-gradient': 'linear-gradient(135deg, #DFC38A 0%, #C6A15B 50%, #8C6A3D 100%)',
        'dark-gradient': 'linear-gradient(180deg, #181716 0%, #0B0B0B 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
    },
  },
  plugins: [],
}
