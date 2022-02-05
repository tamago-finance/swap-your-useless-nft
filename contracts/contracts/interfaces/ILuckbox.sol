//SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

interface ILuckbox {
  function name() external pure returns (string memory);

  function symbol() external pure returns (string memory);

  function ticketPrice() external pure returns (uint256);

  function MAX_SLOT() external pure returns (uint256);

  function draw() external payable;

  function list(uint8)
    external
    pure
    returns (
      address,
      uint256,
      bool,
      bool,
      uint256,
      bool,
      address
    );
}
