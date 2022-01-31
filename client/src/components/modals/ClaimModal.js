import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "reactstrap";

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
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={function noRefCheck() {}}>
            Approve
          </Button>{" "}
          <Button
            style={{ color: "white" }}
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
