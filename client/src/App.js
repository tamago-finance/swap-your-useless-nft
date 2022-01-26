/* Dependency import*/
import styled, { createGlobalStyle } from "styled-components";

/* Compenents import*/
import Header from "./components/header.js";
import Jumbotron from "./components/jumbotron";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'VT323', monospace;
    color: white;
    background-color: #212529;
    
    /* Full height */
    height: 100vh;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Jumbotron />
    </>
  );
}

export default App;
