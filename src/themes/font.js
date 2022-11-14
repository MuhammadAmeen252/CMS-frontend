import OpenSansRegular from "./fonts/OpenSans-Regular.woff2";

const OpenSans = {
  fontFamily: "Open Sans",
  fontWeight: 400,
  fontStyle:'normal',
  fontDisplay:'swap',
  src: `
     local('Open Sans'),
     local('OpenSans-Regular'),
     url(${OpenSansRegular}) format('woff2')
   `,
   unicodeRange: `U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF`
};
export default OpenSans;
