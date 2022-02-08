/* Dependency import*/
import { createGlobalStyle } from "styled-components";

/* Compenents import*/
import Header from "./components/header";
import Jumbotron from "./components/jumbotron";
import ClaimPeriod from "./components/claimperiod";
import About from "./components/about";
import Footer from "./components/footer";
import Notification from "./components/notification"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'VT323', monospace;
    color: white;
    background-color: #191919;
    
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
       <Notification/>
      <Jumbotron />
      <ClaimPeriod />
      <About />
      <Footer />
    </>
  );
}

export default App;
