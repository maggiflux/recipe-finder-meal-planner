/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#53624D",
        primary: "#62202E",
        secondary: "#53624D",
        tertiary: "#C9D9A8",
        neutral: "#FFFDF5",
        accent: "#BFAD0D",
        text: "#2B2B2B",
        muted: "#8B8B8B",
        greenLight: "#CED6BC",
      },
      boxShadow: {
        softShadow: "0px 4px 10px rgba(83, 98, 77, 0.18)",
      },
      fontFamily: {
        titleBold: ["Fraunces-Bold"],
        titleBoldItalic: ["Fraunces-BoldItalic"],
        titleSemiBold: ["Fraunces-SemiBold"],
        titleSemiBoldItalic: ["Fraunces-SemiBoldItalic"],
        titleRegular: ["Fraunces-Regular"],
        titleRegularItalic: ["Fraunces-RegularItalic"],
        titleLight: ["Fraunces-Light"],
        titleLightItalic: ["Fraunces-LightItalic"],
        sans: ["Rubik-Medium"],
        sansLight: ["Rubik-Light"],
        sansBlack: ["Rubik-Black"],
      },
      fontSize: {
        title: ["50px", { lineHeight: "65px" }],
        subtitle: ["28px", { lineHeight: "38px" }],
        minititle: ["20px", { lineHeight: "25px" }],
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
  safelist: [
    // backgrounds
    "bg-background",
    "bg-primary",
    "bg-secondary",
    "bg-tertiary",
    "bg-neutral",
    "bg-accent",
    "bg-greenLight",

    // text colors
    "text-primary",
    "text-secondary",
    "text-neutral",
    "text-text",
    "text-muted",

    // fonts
    "font-titleBold",
    "font-titleBoldItalic",
    "font-titleSemiBold",
    "font-titleSemiBoldItalic",
    "font-titleRegular",
    "font-titleRegularItalic",
    "font-titleLight",
    "font-titleLightItalic",
    "font-sans",
    "font-sansLight",
    "font-sansBlack",

    // font sizes
    "text-title",
    "text-subtitle",
    "text-minititle",
    "text-body",
    "text-small",

    // borders
    "border",
    "border-2",
    "border-primary",
    "border-transparent",

    // radius & shadow
    "rounded-md",
    "rounded-xl",
    "rounded-2xl",
    "rounded-full",
    "shadow-softShadow",
  ],
};
