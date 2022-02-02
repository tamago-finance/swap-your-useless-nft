import React, { useState, useEffect, useCallback } from "react"
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Alert,
} from "reactstrap"
import styled from "styled-components"
import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { TRASH_NFT } from "../../constants"
import { useTrashNFT } from "../../hooks/useTrashNFT"
import { useERC721 } from "../../hooks/useERC721"
import TRASH_NFT_ABI from "../../abi/TrashYourNFT.json"

/******************
 Styled-components
 ******************/
const LabelBox = styled.div`
  width: 320px;
  padding: 10px;
  border: 5px solid gray;
  margin: 0;
`

/*****
 Code
 *****/
function ClaimModal({ toggleClaimModal, claimVisible }) {
  const { account, library } = useWeb3React()
  const { trash, isNFTAddressAllowance } = useTrashNFT(
    TRASH_NFT,
    account,
    library
  )
  const [loading, setLoading] = useState(false)
  const [assetAddress, setAssetAddress] = useState("")
  const [isNFTAddressAllowed, setIsNFTAddressAllowed] = useState()
  const [tokenId, setTokenId] = useState("")
  const [isAssetApproved, setIsAssetApproved] = useState(false)
  const [isTrashDone, setIsTrashDone] = useState(false)
  const assetAddressContract = useERC721(assetAddress, account, library)

  const onAssetAddressChange = (e) => {
    setAssetAddress(e.target.value)
  }

  const onTokenIdChange = (e) => {
    setTokenId(e.target.value)
  }

  useEffect(() => {
    setIsNFTAddressAllowed(null)
    checkAssetAddressAllowance()
    checkAssetAddressApproved()
  }, [assetAddress])

  const checkAssetAddressAllowance = async () => {
    if (!ethers.utils.isAddress(assetAddress)) return
    const isAllowed = await isNFTAddressAllowance(assetAddress)
    setIsNFTAddressAllowed(isAllowed)
  }

  const checkAssetAddressApproved = async () => {
    if (!assetAddressContract || !ethers.utils.isAddress(assetAddress)) return
    const isApproved = await assetAddressContract.getIsApprovedForAll(TRASH_NFT)
    setIsAssetApproved(isApproved)
  }

  const onApproveAsset = async () => {
    if (!assetAddressContract || !ethers.utils.isAddress(assetAddress)) return
    try {
      setLoading(true)
      await assetAddressContract.setApproveForAll(TRASH_NFT)
      setIsAssetApproved(true)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
      setAssetAddress()
      setTokenId()
    }
  }

  const onTrash = useCallback(async () => {
    try {
      setLoading(true)
      const trashContract = new ethers.Contract(
        TRASH_NFT,
        TRASH_NFT_ABI,
        library.getSigner()
      )
      const estimateGas = await trashContract.estimateGas.trash(
        assetAddress,
        tokenId,
        false
      )
      await trash(assetAddress, tokenId, false, {
        gasLimit: estimateGas.add(100000),
      })
      setIsTrashDone(true)
      // trashContract.on(
      //   "Trash",
      //   (trasher, nftAddress, tokenId, amount, is1155) => {
      //     if (trasher === account) {
      //       setIsTrashDone(true)
      //     }
      //   }
      // )
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }, [account, library, assetAddress, tokenId])

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
              invalid={
                isNFTAddressAllowed === null ? null : !isNFTAddressAllowed
              }
              valid={isNFTAddressAllowed}
              value={assetAddress}
              onChange={onAssetAddressChange}
              placeholder='NFT Address'
            />
          </div>
          <div>
            <label>Token Id</label>
            <Input value={tokenId} onChange={onTokenIdChange} />
          </div>
          {isTrashDone ?? (
            <div style={{ marginTop: "15px" }}>
              <div>
                <Alert style={{ textAlign: "center" }} color='success'>
                  Congrats! You recieved $1 NFT
                </Alert>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter style={{ justifyContent: "center" }}>
          {!isAssetApproved ? (
            <Button
              style={{ width: "100%" }}
              color='primary'
              onClick={onApproveAsset}
              loading={loading}
            >
              Approve
            </Button>
          ) : (
            <Button
              disabled={loading}
              style={{ color: "white", width: "100%" }}
              color='danger'
              onClick={onTrash}
            >
              Trash
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ClaimModal
