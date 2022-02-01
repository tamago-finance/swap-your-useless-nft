import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Alert,
} from "reactstrap";
import styled from "styled-components";

/******************
 Styled-components
 ******************/
const LabelBox = styled.div`
  width: 320px;
  padding: 10px;
  border: 5px solid gray;
  margin: 0;
`;

/*****
 Code
 *****/
function ClaimModal({ toggleClaimModal, claimVisible }) {
  return (
    <>
      <Modal centered isOpen={claimVisible} toggle={toggleClaimModal}>
        <ModalHeader style={{ color: "#000" }} toggle={toggleClaimModal}>
          Trash Your NFT
        </ModalHeader>
        <ModalBody style={{ color: "#000" }}>
          <div>
            <label>Asset Address</label>
            <Input
              valid={false}
              invalid={true}
              readOnly
              placeholder="x3dsadsakijis32i9s"
            />
          </div>
          <div>
            <label>Token Id</label>
            <Input valid />
          </div>
          <div style={{ marginTop: "15px" }}>
            <div>
              <Alert style={{ textAlign: "center" }} color="success">
                Congrats! You recieved $1 NFT
              </Alert>
            </div>
          </div>
        </ModalBody>
        <ModalFooter style={{ justifyContent: "center" }}>
          <Button
            style={{ width: "30%" }}
            color="primary"
            onClick={function noRefCheck() {}}
          >
            Approve
          </Button>{" "}
          <Button
            style={{ color: "white", width: "30%" }}
            color="warning"
            onClick={function noRefCheck() {}}
          >
            Trash
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ClaimModal;
