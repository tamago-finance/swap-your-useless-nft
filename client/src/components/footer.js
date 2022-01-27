import styled from "styled-components";

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
        <a href="">Twitter</a>
        <span> | </span>
        <a href="">Telegram</a>
        <span> | </span>
        <a href="">Discord</a>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media only screen and (max-width: 600px) {
    font-size: 10px;
  }

  a {
    color: inherit;
    text-decoration: initial;

    :hover {
      text-decoration: underline;
    }
  }
`;

export default Footer;
