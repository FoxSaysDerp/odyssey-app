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
   },
   gradient: {
      main: "linear-gradient(45deg, rgba(0,79,77,1) 0%, rgba(31,32,36,1) 25%, rgba(75,73,82,1) 50%, rgba(121,113,122,1) 75%, rgba(166,143,151,1) 100%);",
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
