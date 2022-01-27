import { Button } from "reactstrap";
import { useState } from "react";
import styled from "styled-components";
import logoimg from "../images/favicon.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Nav>
      <Logo>
        <a href="/">
          <img src={logoimg} alt="tamago" />
        </a>
        <span> Trash Your NFT</span>
      </Logo>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu isOpen={isOpen}>
        <ConnectButton color="warning" size="lg" outline>
          connect wallet
        </ConnectButton>
      </Menu>
    </Nav>
  );
};

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Logo = styled.div`
  padding: 1rem 0;
  font-size: 1.7rem;
  font-weight: 800;
  color: #ecdbba;

  img {
    width: 50px;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background: #ecdbba;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.5s ease-in;
  }
`;

const ConnectButton = styled(Button)`
  margin-top: 20px;
`;

export default Header;
