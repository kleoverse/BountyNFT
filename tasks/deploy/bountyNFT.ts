import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { BountyNFT, BountyNFT__factory } from "../../typechain";

task("deploy:BountyNFT").setAction(async function (
  taskArguments: TaskArguments,
  { ethers }
) {
  const BountyNFTFactory: BountyNFT__factory = <BountyNFT__factory>(
    await ethers.getContractFactory("BountyNFT")
  );
  const bountyNFT: BountyNFT = <BountyNFT>await BountyNFTFactory.deploy();

  await bountyNFT.deployed();

  console.log("BountyNFT deployed to:", bountyNFT.address);
});
