import React, { useState, useEffect, useCallback, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Connectors } from "../../connectors";
import useEagerConnect from "../hooks/useEagerConnect";
import useInactiveListener from "../hooks/useInactiveListener";

/******************
 Styled-components
 ******************/
const Connector = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  color: #000;

  font-size: 20px;

  :hover {
    cursor: pointer;
    color: white;
    background-color: #6d6b76;
  }

  display: flex;
  flex-direction: row;

  img {
    width: 32px;
    height: 32px;
  }

  div {
    flex: 70%;
    display: flex;
    align-items: center;

    :first-child {
      flex: 0.2;
    }
    :last-child {
      flex: 10%;
    }
  }
`;

/*****
 Code
 *****/
function ConnecWalletModal({ toggleConnectWallet, connectWalletVisible }) {
  const context = useWeb3React();

  const { account, activate, deactivate, error, chainId } = context;
  console.log(account);

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    if (error && error.name === "UnsupportedChainIdError") {
      //   toastr.warning("Unsupported Network", "Please switch to Polygon Mainnet")
      // alert("Please switch to Polygon Mainnet")

      toast.warn("Mainnet or Polygon Only!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [error]);
  return (
    <Modal isOpen={connectWalletVisible} toggle={toggleConnectWallet}>
      <ModalHeader style={{ color: "#000" }} toggle={toggleConnectWallet}>
        Choose Wallet Provider
      </ModalHeader>
      <ModalBody>
        {Connectors.map((item, index) => {
          const { connector, name, img } = item;
          return (
            <Connector
              key={index}
              onClick={() => {
                toggleConnectWallet();
                activate(connector);
              }}
            >
              <div>
                <img src={img} alt={`wallet-icon-${index}`} />
              </div>
              <div>{name}</div>
            </Connector>
          );
        })}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleConnectWallet}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ConnecWalletModal;
