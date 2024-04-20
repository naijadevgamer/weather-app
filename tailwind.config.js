/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#100E1D",
        "secondary-bg": "#1E213A",
        "btn-bg1": "#6E707A",
        "btn-bg1-h": "#55565e", // hover
        "btn-bg2": "#585676",
        "btn-bg2-h": "#424059", // hover
        "btn-bg3": "#3C47E9",
        "btn-bg3-h": "#1825d8", // hover
        "primary-text": "#E7E7EB",
        "primary-text-h": "#cacad3", // hover
        "secondary-text": "#88869D",
        "dark-text": "#110E3C",
        "tertiary-text": "#A09FB1",
        "range-bg": "#ffec65",
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
      gridTemplateColumns: {
        // Body layout
        body: "8fr, 17fr",
        "body-tp": "10fr, 15fr",
        days: "repeat(auto-fit, minmax(13rem, 1fr))",
        highlight: "repeat(auto-fit, minmax(30rem, 1fr))",
        "highlight-p": "repeat(auto-fit, minmax(100%, 1fr))",
      },
      gridTemplateRows: {
        // Body layout
        highlight: "20.4rem, 15.9rem",
        body: "minmax(102.3rem, 1fr)",
        "body-p": "minmax(100vh, max-content), max-content",
      },
      screens: {
        "large-desktop": "1800px", // 1800px
        tl: "1200px", // tablet-landscape
        tp: "900px", // tablet-portrait
        p: "600px", // phone
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
