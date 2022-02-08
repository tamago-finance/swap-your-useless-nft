import styled from "styled-components";
import { Container } from "reactstrap"

/******************
 Styled-components
 ******************/
const Wrapper = styled(Container)`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media only screen and (max-width: 600px) {
    justify-content: center;
    text-align: center;
  }

  a {
    color: inherit;
    text-decoration: initial;

    :hover {
      text-decoration: underline;
    }
  }
`;

/*****
 Code
 *****/
const Footer = () => {
  return (
    <Wrapper>
      <div>
        Copyright © 2021{" "}
        <a
          href="https://tamago.finance"
          target="_blank"
          style={{ color: "#ffc107" }}
        >
          Tamago Finance
        </a>
        <span> All Right Reserved</span>
      </div>
      <div>
        <a href="https://twitter.com/TamagoFinance" target="_blank">Twitter</a>
        <span> | </span>
        <a href="">Telegram</a>
        <span> | </span>
        <a href="">Discord</a>
      </div>
    </Wrapper>
  );
};

export default Footer;
