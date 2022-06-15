import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";
import { Signers } from "../types";
import { shouldBehaveLikeBountyNFT } from "./BountyNFT.behavior";

describe("Unit Tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.nonAdmin = signers[1];
  });

  describe("BountyNFT", function () {
    beforeEach(async function () {
      this.BountyNFTFactory = await ethers.getContractFactory("BountyNFT");
      this.bountyNFT = await this.BountyNFTFactory.deploy();
      await this.bountyNFT.deployed();
    });

    shouldBehaveLikeBountyNFT();
  });
});
