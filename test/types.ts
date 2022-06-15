import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

export interface Signers {
  admin: SignerWithAddress;
  nonAdmin: SignerWithAddress;
}

declare module "mocha" {
  export interface Context {
    signers: Signers;
  }
}
