/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#301433",
        primary: "#341D36",
        primaryLight: "#5F4661",
        primaryExtraLight: "#F5F2F6",
        accent: "#D982E0",
        muted: "#8B7D8C",
        soft: "#B188B5",
        card: "#3A1F3D",
      },
      boxShadow: {
        purpleShadow: "0px 4px 12px rgba(217,130,224,0.25)",
      },
      fontFamily: {
        sans: ["Rubik"],
      },
      fontSize: {
        title: ["28px", { lineHeight: "34px" }],
        subtitle: ["20px", { lineHeight: "26px" }],
        body: ["16px", { lineHeight: "24px" }],
        small: ["13px", { lineHeight: "20px" }],
      },
      state: {
        success: "#4ADE80",
        warning: "#FACC15",
        error: "#F87171",
        info: "#60A5FA",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
