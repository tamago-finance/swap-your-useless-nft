import {
  Navbar,
  NavbarBrand,
  Container,
  NavbarText,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler,
  Button,
} from "reactstrap";

import styled from "styled-components";

import logoimg from "../images/favicon.png";

const Header = () => {
  return (
    <Nav>
      <Logo>
        <a href="/">
          <img src={logoimg} alt="tamago" />
        </a>
        <span> Trash Your NFT</span>
      </Logo>
      <Button color="warning" size="lg" outline>
        connect wallet
      </Button>
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

  img {
    width: 50px;
  }
`;

export default Header;

/**<Container>
        <Navbar color="dark" dark container="md" fixed="top" expand="md" light>
          <NavbarBrand href="/">
            <img src={Logo} alt="tamago" />
          </NavbarBrand>
          <NavbarToggler className="me-2" onClick={function noRefCheck() {}} />
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <Nav href="/">
                  <h2>Trash Your NFT</h2>
                </Nav>
              </NavItem>
            </Nav>
            <NavbarText>
              <Button color="warning" size="lg" outline>
                connect wallet
              </Button>
            </NavbarText>
          </Collapse>
        </Navbar>
      </Container> */
