module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        // Custom aspect ratio for DIN A4 paper
        dina4: "1 / 1.41421",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
