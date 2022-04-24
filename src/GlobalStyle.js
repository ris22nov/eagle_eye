import GlobalStyles from "@mui/material/GlobalStyles";

const GlobalStyle = () => {
  return (
    <GlobalStyles styles={{
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        fontFamily: "Roboto"
      }
    }} />
  );
}

export default GlobalStyle;