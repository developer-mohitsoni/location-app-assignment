/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Google Inter font
      },
      colors: {
        primary: "#2563eb", // Blue-600
        primaryDark: "#1d4ed8",
        secondary: "#f3f4f6", // Gray-100
        danger: "#ef4444",
        success: "#10b981",
      },
    },
  },
  plugins: [],
}