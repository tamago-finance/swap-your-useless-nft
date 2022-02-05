import { Button } from "reactstrap";
import { useState } from "react";
import styled from "styled-components";
import logoimg from "../images/favicon.png";
import { useWeb3React } from "@web3-react/core";
import { shortAddress } from "./helper";

import ConnecWalletModal from "./modals/ConnecWalletModal";

/******************
 Styled-components
 ******************/
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

const Address = styled(ConnectButton)`
  cursor: default;
`;
const Network = styled(Address)`
  margin-right: 5px;
  background-color: #6d6b76;
  width: 120px;
`;

/*****
 Code
 *****/
const Header = () => {
  const { account, deactivate, library, chainId } = useWeb3React();

  const [isOpen, setIsOpen] = useState(false);

  const [connectWalletVisible, setconnectWalletVisible] = useState(false);
  const toggleConnectWallet = () => {
    setconnectWalletVisible(!connectWalletVisible);
  };

  return (
    <Nav>
      <ConnecWalletModal
        toggleConnectWallet={toggleConnectWallet}
        connectWalletVisible={connectWalletVisible}
      />
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
        <div>
          {account ? (
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {(chainId === 1 || chainId === 137) && (
                <Network>
                  {chainId === 1 && "Mainnet"}
                  {chainId === 137 && "Polygon"}
                </Network>
              )}
              <Address>{shortAddress(account, 4, -3)}</Address>
            </div>
          ) : (
            <ConnectButton
              onClick={toggleConnectWallet}
              color="warning"
              size="lg"
              outline
              onClick={toggleConnectWallet}
            >
              connect wallet
            </ConnectButton>
          )}
        </div>
      </Menu>
    </Nav>
  );
};

export default Header;
