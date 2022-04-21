const theme = {
   color: {
      orange: "#fab84f",
      lightGray: "#f9f9f9",
      gray: "#b8b8b8",
      sherpaBlue: "#004f4d",
      shark: "#1f2024",
      scarpaFlow: "#4b4952",
      mobster: "#79717a",
      dustyGray: "#a68f97",
      mainColor: "#e1326a",
   },
   gradient: {
      main: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); ",
   },
   shadow: {
      normal: "8px 8px 12px -12px rgba(97, 97, 97, 0.5)",
   },
   mixins: {
      xs: "@media (max-width: 400px)",
      sm: "@media (max-width: 576px)",
      md: "@media (max-width: 768px)",
      lg: "@media (max-width: 992px)",
      xl: "@media (max-width: 1200px)",
      xxl: "@media (max-width: 1400px)",
   },
   fonts: {
      poppins: "'Poppins', sans-serif",
      dancingScript: "'Dancing Script', cursive",
   },
};

export default theme;
