/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        usergreen: '#44AE26',
        usergreen_hover: '#36961b',
        userblue: '#003E49',

        text_: "#131414", 
        main_text:"#102f94",
        deep_primary_text:"#002ead",

        secondary_text:"#0eb0a1",
        link_text:"#aa10b5",

        secondary_btn: "#14ccbb",
        secondary_btn_hover : "#0eb0a1",

        secondary: "#5C6BC0",
        secondary_hover: "#5C6BD0", 


        background: "#f7f8fa", 

        textPrimary: "#131313", 

        textSecondary: "#0f0f0f", 

        
        cardBg: "#f2f4f5", 
        card_bg_hover: "#d6f0ff",

        cardBorder: "#D1D5DB",







        red_text: "#f44336",
        red_bg: 'rgba(244, 67, 54, 0.15)',
        red_bg_hover: 'rgba(244, 67, 54, 0.25)',

        green_text: "#4caf50",
        green_bg: 'rgba(10,210,110,.1)',
        green_bg_hover: 'rgba(10,210,110,.2)',

        yellow_text: "#ffeb3b",
        yellow_bg: 'rgba(255,235,59,.1)',
        yellow_bg_hover: 'rgba(255,235,59,.2)',

        cyan_text: "#00bcd4",
        cyan_bg: 'rgba(0,188,212,.1)',
        cyan_bg_hover: 'rgba(0,188,212,.2)',

        purple_text: "#9c27b0",
        purple_bg: 'rgba(156,39,176,.1)',
        purple_bg_hover: 'rgba(156,39,176,.2)',

        orange_text: "#ff9800",
        orange_bg: 'rgba(255,152,0,.1)',
        orange_bg_hover: 'rgba(255,152,0,.2)',

        pink_text: "#e91e63",
        pink_bg: 'rgba(233,30,99,.1)',
        pink_bg_hover: 'rgba(233,30,99,.2)',

        indigo_text: "#3f51b5",
        indigo_bg: 'rgba(63,81,181,.1)',
        indigo_bg_hover: 'rgba(63,81,181,.2)',

        blue_text: "#2196f3",
        blue_bg: 'rgba(33,150,243,.1)',
        blue_bg_hover: 'rgba(33,150,243,.2)',

        error_color: "#EF4444",
        info_clor: "#3B82F6",
        success_color: "#22C55E",
        warning_color: "#F97316",
      }
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      opensans: ["Open Sans", "sans-serif"],
    },
  },
  plugins: [],
}

