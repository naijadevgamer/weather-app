/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#100E1D",
        "secondary-bg": "#1E213A",
        "btn-bg1": " #6E707A",
        "btn-bg2": "#585676",
        "primary-text": "#E7E7EB",
        "secondary-text": "#88869D",
        "dark-text": "#110E3C",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      fontSize: {
        html: "62.5%",
        desktop: "75%",
        land: "58%",
        port: "53%",
        16: "16px",
      },
      screens: {
        "large-desktop": "1800px", // 1800px
        tl: "1200px", // tablet-landscape
        tp: "900px", // tablet-portrait
        sp: "300px", // small-phone
      },
      keyframes: {
        // Menu bar
        go: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(105%)" },
        },
      },
      animation: {
        // Menu bar animations
        go: "go 0.3s cubic-bezier(1, 0, 0, 1) both",
      },
    },
  },
  plugins: [],
};
