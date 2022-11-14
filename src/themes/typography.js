const typo = {
  fontFamily: ["Open Sans", "Roboto"].join(","),
  h1: {
    fontSize: "2.25rem",
  },
  h2: {
    fontSize: "1.5rem",
  },
  h3: {
    fontSize: "1.125rem",
  },
  h4: {
    fontSize: "1.1rem",
  },
  h5: {
    fontSize: "1.05rem",
  },
  h6: {
    fontSize: "1rem",
  },
  p: {
    fontSize: "0.9rem",
    '@media (max-width:620px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width:960px) and (orientation: landscape)': {
      fontSize: '0.8rem',
    },
  },
  htmlFontSize: 15,
};

export default typo;
