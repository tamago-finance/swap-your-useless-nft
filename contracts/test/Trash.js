const { expect } = require("chai")
const { ethers } = require("hardhat")
const { fromEther, toEther } = require("./Helpers")

describe("Trash your NFT", function () {
  let factory

  let luckBox721
  let luckBox1155

  let trashContract721
  let trashContract1155
  let trashErc721
  let trashErc1155

  let erc721
  let erc1155

  let admin
  let alice
  let bob

  let tokenIds
  let stackTokenIds

  beforeEach(async () => {
    ;[admin, alice, bob, dev, treasury] = await ethers.getSigners()

    const Factory = await ethers.getContractFactory("Factory")
    const Trash = await ethers.getContractFactory("TrashYourNFT")
    const LuckBox = await ethers.getContractFactory("LuckBox")

    factory = await Factory.deploy(await dev.getAddress())

    await factory.createLuckbox("Luck box 721", "Luck box 712", toEther("1"))
    await factory.createLuckbox("Luck box 1155", "Luck box 1155", toEther("1"))

    const luckBoxAddr721 = (await factory.boxes(0)).contractAddress
    const luckBoxAddr1155 = (await factory.boxes(1)).contractAddress

    luckBox721 = await LuckBox.attach(luckBoxAddr721)
    luckBox1155 = await LuckBox.attach(luckBoxAddr1155)

    trashContract721 = await Trash.deploy(
      luckBox721.address,
      await treasury.getAddress()
    )

    trashContract1155 = await Trash.deploy(
      luckBox1155.address,
      await treasury.getAddress()
    )
    const MockERC721 = await ethers.getContractFactory("MockERC721")
    const MockERC1155 = await ethers.getContractFactory("MockERC1155")

    erc721 = await MockERC721.deploy("Mock NFT", "MOCK")
    trashErc721 = await MockERC721.deploy("Trash NFT", "Trash")
    trashErc1155 = await MockERC1155.deploy(
      "https://api.cryptokitties.co/kitties/{id}"
    )
    erc1155 = await MockERC1155.deploy(
      "https://api.cryptokitties.co/kitties/{id}"
    )

    tokenIds = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    stackTokenIds = [9, 10, 11, 12]

    // minting ERC-721
    for (let id of tokenIds) {
      await erc721.mint(admin.address, id)
      await erc1155.mint(admin.address, id, 1, "0x00")
      await trashErc721.mint(admin.address, id)
      await trashErc1155.mint(admin.address, id, 1, "0x00")
    }

    for (let id of stackTokenIds) {
      await erc721.mint(admin.address, id)
      await erc1155.mint(admin.address, id, 1, "0x00")
    }

    await erc721.setApprovalForAll(luckBox721.address, true)
    await erc1155.setApprovalForAll(luckBox1155.address, true)

    await trashErc721.transferFrom(
      await admin.getAddress(),
      await alice.getAddress(),
      0
    )

    await trashErc1155.safeTransferFrom(
      await admin.getAddress(),
      await alice.getAddress(),
      0,
      1,
      "0x00"
    )

    await trashErc721
      .connect(alice)
      .setApprovalForAll(trashContract721.address, true)

    await trashErc1155
      .connect(alice)
      .setApprovalForAll(trashContract721.address, true)

    await trashErc721
      .connect(alice)
      .setApprovalForAll(trashContract1155.address, true)

    await trashErc1155
      .connect(alice)
      .setApprovalForAll(trashContract1155.address, true)
  })

  context("when no ticket deposit", () => {
    it("should revert", async () => {
      await trashContract721.setNFTAddressAllowance(trashErc721.address, true)
      await expect(
        trashContract721.connect(alice).trash(trashErc721.address, 0, false)
      ).to.revertedWith("Not enough ticket")
    })
  })

  context("when no has nft on luckbox", () => {
    it("should revert", async () => {
      await trashContract721.setNFTAddressAllowance(trashErc721.address, true)
      await trashContract721.deposit({ value: toEther("100") })
      await trashContract721.connect(alice).trash(trashErc721.address, 0, false)
    })
  })

  context("when not set NFT address allowance", () => {
    it("should revert", async () => {
      await expect(
        trashContract721.connect(alice).trash(trashErc721.address, 0, false)
      ).to.revertedWith("_nftAddress not allowance yet")
    })
  })

  describe("Return from luckbox with erc721", () => {
    beforeEach(async () => {
      for (let id of tokenIds) {
        // use 10% winning chance
        await luckBox721.depositNft(id, 15 * 100, erc721.address, id, false)
        await luckBox1155.depositNft(id, 15 * 100, erc1155.address, id, true)
      }

      // Stack nft to queue
      for (let id of stackTokenIds) {
        // use 10% winning chance
        await luckBox721.stackNft(erc721.address, 15 * 100, id, false)
        await luckBox1155.stackNft(erc1155.address, 15 * 100, id, true)
      }
    })

    context("when deposit ticket and trash with erc721", () => {
      it("Should return nft trash", async function () {
        await trashContract721.setNFTAddressAllowance(trashErc721.address, true)
        await trashContract721.deposit({ value: toEther("100") })

        await trashContract721
          .connect(alice)
          .trash(trashErc721.address, 0, false)

        expect(await erc721.balanceOf(await alice.getAddress())).to.eq("1")
        expect(await trashErc721.balanceOf(await alice.getAddress())).to.eq("0")
        expect(await trashErc721.balanceOf(await treasury.getAddress())).to.eq(
          "1"
        )

        await trashErc721.transferFrom(
          await admin.getAddress(),
          await alice.getAddress(),
          1
        )

        await trashContract721
          .connect(alice)
          .trash(trashErc721.address, 1, false)

        expect(await erc721.balanceOf(await alice.getAddress())).to.eq("2")
        expect(await trashErc721.balanceOf(await alice.getAddress())).to.eq("0")
        expect(await trashErc721.balanceOf(await treasury.getAddress())).to.eq(
          "2"
        )

        // await expect(
        //   trashContract721.connect(alice).trash(trashErc721.address, 1, false),
        //   "expect to emit trash event"
        // )
        //   .to.emit(trashContract721, "Trash")
        //   .withArgs(await alice.getAddress(), erc721.address, 0, 1, false)
      })
    })

    context("when deposit ticket and trash with erc1155", () => {
      it("Should return nft trash", async function () {
        await trashContract721.setNFTAddressAllowance(
          trashErc1155.address,
          true
        )
        await trashContract721.deposit({ value: toEther("100") })

        await trashContract721
          .connect(alice)
          .trash(trashErc1155.address, 0, true)

        expect(await erc721.balanceOf(await alice.getAddress())).to.eq("1")
        expect(await trashErc1155.balanceOf(await alice.getAddress(), 0)).to.eq(
          "0"
        )
        expect(
          await trashErc1155.balanceOf(await treasury.getAddress(), 0)
        ).to.eq("1")

        await trashErc1155.safeTransferFrom(
          await admin.getAddress(),
          await alice.getAddress(),
          1,
          1,
          "0x00"
        )

        await trashContract721
          .connect(alice)
          .trash(trashErc1155.address, 1, true)

        expect(await erc721.balanceOf(await alice.getAddress())).to.eq("2")
        expect(await trashErc1155.balanceOf(await alice.getAddress(), 1)).to.eq(
          "0"
        )
        expect(
          await trashErc1155.balanceOf(await treasury.getAddress(), 0)
        ).to.eq("1")
        expect(
          await trashErc1155.balanceOf(await treasury.getAddress(), 1)
        ).to.eq("1")
      })
    })
  })

  describe("Return from luckbox with erc1155", () => {
    beforeEach(async () => {
      for (let id of tokenIds) {
        // use 10% winning chance
        await luckBox721.depositNft(id, 15 * 100, erc721.address, id, false)
        await luckBox1155.depositNft(id, 15 * 100, erc1155.address, id, true)
      }

      // Stack nft to queue
      for (let id of stackTokenIds) {
        // use 10% winning chance
        await luckBox721.stackNft(erc721.address, 15 * 100, id, false)
        await luckBox1155.stackNft(erc1155.address, 15 * 100, id, true)
      }
    })
    context("when deposit ticket and trash with erc721", () => {
      it("Should return nft trash", async function () {
        let tx, rc, event, tokenId
        await trashContract1155.setNFTAddressAllowance(
          trashErc721.address,
          true
        )
        await trashContract1155.deposit({ value: toEther("100") })

        tx = await trashContract1155
          .connect(alice)
          .trash(trashErc721.address, 0, false)

        rc = await tx.wait()
        event = rc.events.find((event) => event.event === "Trash")
        ;[, , tokenId, ,] = event.args

        expect(
          await erc1155.balanceOf(await alice.getAddress(), tokenId.toString())
        ).to.eq("1")
        expect(await trashErc721.balanceOf(await alice.getAddress())).to.eq("0")
        expect(await trashErc721.balanceOf(await treasury.getAddress())).to.eq(
          "1"
        )

        await trashErc721.transferFrom(
          await admin.getAddress(),
          await alice.getAddress(),
          1
        )

        tx = await trashContract1155
          .connect(alice)
          .trash(trashErc721.address, 1, false)

        rc = await tx.wait()
        event = rc.events.find((event) => event.event === "Trash")
        ;[, , tokenId, ,] = event.args

        expect(
          await erc1155.balanceOf(await alice.getAddress(), tokenId.toString())
        ).to.eq("1")
        expect(await trashErc721.balanceOf(await alice.getAddress())).to.eq("0")
        expect(await trashErc721.balanceOf(await treasury.getAddress())).to.eq(
          "2"
        )
      })
    })

    context("when deposit ticket and trash with erc1155", () => {
      it("Should return nft trash", async function () {
        let tx, rc, event, tokenId
        await trashContract1155.setNFTAddressAllowance(
          trashErc1155.address,
          true
        )
        await trashContract1155.deposit({ value: toEther("100") })

        tx = await trashContract1155
          .connect(alice)
          .trash(trashErc1155.address, 0, true)

        rc = await tx.wait()
        event = rc.events.find((event) => event.event === "Trash")
        ;[, , tokenId, ,] = event.args

        expect(
          await erc1155.balanceOf(await alice.getAddress(), tokenId.toString())
        ).to.eq("1")
        expect(await trashErc1155.balanceOf(await alice.getAddress(), 0)).to.eq(
          "0"
        )
        expect(
          await trashErc1155.balanceOf(await treasury.getAddress(), 0)
        ).to.eq("1")

        await trashErc1155.safeTransferFrom(
          await admin.getAddress(),
          await alice.getAddress(),
          1,
          1,
          "0x00"
        )

        tx = await trashContract1155
          .connect(alice)
          .trash(trashErc1155.address, 1, true)

        rc = await tx.wait()
        event = rc.events.find((event) => event.event === "Trash")
        ;[, , tokenId, ,] = event.args

        expect(
          await erc1155.balanceOf(await alice.getAddress(), tokenId.toString())
        ).to.eq("1")
        expect(await trashErc1155.balanceOf(await alice.getAddress(), 1)).to.eq(
          "0"
        )
        expect(
          await trashErc1155.balanceOf(await treasury.getAddress(), 0)
        ).to.eq("1")
        expect(
          await trashErc1155.balanceOf(await treasury.getAddress(), 1)
        ).to.eq("1")
      })
    })
  })
})
