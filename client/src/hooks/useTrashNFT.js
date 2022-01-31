import { useMemo, useEffect, useState, useCallback } from "react"
import { ethers } from "ethers"
import TRASH_NFT_ABI from "../abi/TrashYourNFT.json"

export const useTrashNFT = (address, account, library, tick) => {
  const trashNFTContract = useMemo(() => {
    if (!account || !address || !library || !ethers.utils.isAddress(address)) {
      return
    }
    return new ethers.Contract(address, TRASH_NFT_ABI, library.getSigner())
  }, [account, address, library])

  const isNFTAddressAllowance = useCallback(
    async (nftAddress) => {
      try {
        const result = await trashNFTContract.nftAllowance(nftAddress)
        return result
      } catch (e) {
        console.log(e)
        return false
      }
    },
    [trashNFTContract, account]
  )

  const trash = useCallback(
    async (nftAddress, tokenId, is1155) => {
      try {
        return await trashNFTContract.trash(nftAddress, tokenId, is1155)
      } catch (e) {
        return Promise.reject(e.message)
      }
    },
    [luckBoxContract, account]
  )

  useEffect(() => {}, [account, trashNFTContract, tick])

  return {
    isNFTAddressAllowance,
    trash,
  }
}
