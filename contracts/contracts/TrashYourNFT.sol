// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155Holder.sol";

import "./interfaces/ILuckbox.sol";

contract TrashYourNFT is
  ReentrancyGuard,
  Ownable,
  IERC721Receiver,
  ERC1155Holder,
  ERC721Holder
{
  address public luckbox;
  uint256 public trashId;
  address public treasury;

  struct Result {
    uint256 id;
    address owner;
    address nftAddress;
    uint256 tokenId;
    bool is1155;
  }

  struct SlotData {
    address nftAddress;
    uint256 tokenId;
    bool is1155;
    uint256 balance;
  }

  struct PendingReward {
    address nftAddress;
    uint256 tokenId;
    bool is1155;
  }

  mapping(uint256 => Result) public idToResult;
  mapping(address => bool) public nftAllowance;
  mapping(uint256 => SlotData) private idToSlotData;

  PendingReward private pendingReward;

  event Deposit(address indexed owner, uint256 amount);
  event Trash(
    address indexed owner,
    address nftAddress,
    uint256 tokenId,
    uint256 amount,
    bool is1155
  );
  event SetNFTAllowance(address indexed nftAddress, bool isAllowed);

  constructor(address _luckbox, address _treasury) public {
    luckbox = _luckbox;
    treasury = _treasury;
  }

  function deposit() public payable onlyOwner {
    emit Deposit(msg.sender, msg.value);
  }

  function setNFTAddressAllowance(address _nftAddress, bool _isAllowed)
    external
    onlyOwner
  {
    require(_nftAddress != address(0), "_nftAddress must not be address(0)");
    nftAllowance[_nftAddress] = _isAllowed;

    emit SetNFTAllowance(_nftAddress, _isAllowed);
  }

  function trash(
    address _nftAddress,
    uint256 _tokenId,
    bool _is1155
  ) public {
    require(nftAllowance[_nftAddress], "_nftAddress not allowance yet");
    // take the NFT
    if (_is1155) {
      IERC1155(_nftAddress).safeTransferFrom(
        msg.sender,
        treasury,
        _tokenId,
        1,
        "0x00"
      );
    } else {
      IERC721(_nftAddress).safeTransferFrom(msg.sender, treasury, _tokenId);
    }

    uint256 ticketPrice = ILuckbox(luckbox).ticketPrice();

    require(address(this).balance >= ticketPrice, "Not enough ticket");

    _beforeDraw();
    ILuckbox(luckbox).draw{ value: ticketPrice }();
    _afterDraw();

    idToResult[trashId] = Result({
      id: trashId,
      owner: msg.sender,
      nftAddress: pendingReward.nftAddress,
      tokenId: pendingReward.tokenId,
      is1155: pendingReward.is1155
    });
    emit Trash(
      msg.sender,
      idToResult[trashId].nftAddress,
      idToResult[trashId].tokenId,
      1,
      idToResult[trashId].is1155
    );

    trashId++;
    pendingReward.nftAddress = address(0);
    pendingReward.tokenId = 0;
    pendingReward.is1155 = false;
  }

  function _beforeDraw() private {
    uint256 maxSlot = ILuckbox(luckbox).MAX_SLOT();
    for (uint8 i = 0; i < maxSlot; i++) {
      (
        address slotAddress,
        uint256 slotTokenId,
        bool slotIs1155,
        ,
        ,
        ,

      ) = ILuckbox(luckbox).list(i);
      uint256 balance;
      if (slotAddress == address(0)) {
        balance = 0;
      } else if (slotIs1155) {
        balance = IERC1155(slotAddress).balanceOf(address(this), slotTokenId);
      } else {
        balance = IERC721(slotAddress).balanceOf(address(this));
      }
      idToSlotData[i] = SlotData({
        nftAddress: slotAddress,
        tokenId: slotTokenId,
        is1155: slotIs1155,
        balance: balance
      });
    }
  }

  function _afterDraw() internal {
    uint256 maxSlot = ILuckbox(luckbox).MAX_SLOT();
    for (uint256 i = 0; i < maxSlot; i++) {
      SlotData storage slot = idToSlotData[i];
      if (slot.nftAddress == address(0)) continue;
      uint256 currentBalance;
      bool isOwner; // Seperate owner;
      if (slot.is1155) {
        currentBalance = IERC1155(slot.nftAddress).balanceOf(
          address(this),
          slot.tokenId
        );
        isOwner = true;
      } else {
        currentBalance = IERC721(slot.nftAddress).balanceOf(address(this));
        isOwner =
          IERC721(slot.nftAddress).ownerOf(slot.tokenId) == address(this);
      }
      if ((currentBalance > slot.balance) && isOwner) {
        pendingReward.nftAddress = slot.nftAddress;
        pendingReward.tokenId = slot.tokenId;
        pendingReward.is1155 = slot.is1155;
        if (slot.is1155) {
          IERC1155(slot.nftAddress).safeTransferFrom(
            address(this),
            msg.sender,
            slot.tokenId,
            1,
            "0x00"
          );
        } else {
          IERC721(slot.nftAddress).safeTransferFrom(
            address(this),
            msg.sender,
            slot.tokenId
          );
        }
      }

      // Clear slot data
      slot.nftAddress = address(0);
      slot.tokenId = 0;
      slot.is1155 = false;
      slot.balance = 0;
    }
  }

  function _safeTransferETH(address to, uint256 value) internal {
    (bool success, ) = to.call{ value: value }(new bytes(0));
    require(success, "TransferHelper::safeTransferETH: ETH transfer failed");
  }
}
