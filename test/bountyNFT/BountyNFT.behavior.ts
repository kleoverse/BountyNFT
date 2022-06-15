import { expect } from "chai";

export function shouldBehaveLikeBountyNFT(): void {
  describe("Minting", function () {
    it("non admin should not be able to mint a BountyNFT", async function () {
      await expect(
        this.bountyNFT
          .connect(this.signers.nonAdmin)
          .createBountyNFT(this.signers.admin.address, "dummyIpfsHash")
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("admin should be able to mint a BountyNFT", async function () {
      await this.bountyNFT.createBountyNFT(
        this.signers.admin.address,
        "dummyIpfsHash"
      );
      expect(await this.bountyNFT.tokenURI(1)).to.equal("dummyIpfsHash");
    });
  });

  describe("Transfer", function () {
    it("should not be able to transfer the BountyNFT", async function () {
      await this.bountyNFT.createBountyNFT(
        this.signers.admin.address,
        "dummyIpfsHash"
      );
      await expect(
        this.bountyNFT.transferFrom(
          this.signers.admin.address,
          this.signers.nonAdmin.address,
          1
        )
      ).to.be.revertedWith("BountyNFT: non transferrable token");
      expect(await this.bountyNFT.ownerOf(1)).to.not.equal(
        this.signers.nonAdmin.address
      );
    });
  });

  describe("Burning", function () {
    it("non owner should not be able to burn the BountyNFT", async function () {
      await this.bountyNFT.createBountyNFT(
        this.signers.nonAdmin.address,
        "dummyIpfsHash"
      );
      await expect(this.bountyNFT.burn(1)).to.be.revertedWith(
        "ERC721: caller is not approved or owner"
      );
    });

    it("owner should be able to burn the BountyNFT", async function () {
      await this.bountyNFT.createBountyNFT(
        this.signers.nonAdmin.address,
        "dummyIpfsHash"
      );
      await this.bountyNFT.connect(this.signers.nonAdmin).burn(1);
      await expect(this.bountyNFT.ownerOf(1)).to.be.revertedWith(
        "ERC721: owner query for nonexistent token"
      );
    });
  });
}
