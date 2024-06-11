/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkTeal: "#1C4044",
        teal: "#388087",
        darkSkyBlue: "#79B0B7",
        skyBlue: "#BADFE7",
        skyGrayBlue: "#DAE8EB",
        mintGreen: "#C2EDCE",
        offWhite: "#F6F6F2",
      },
      height: {
        108: "600px",
      },
    },
  },
  plugins: [],
};
