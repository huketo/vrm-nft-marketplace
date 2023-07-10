import { ethers } from "hardhat";
import { writeFileSync } from "fs";

async function main() {
  const VrmNFTMarket = await ethers.getContractFactory("VrmNFTMarketplace");
  const vrmNFTMarket = await VrmNFTMarket.deploy();

  await vrmNFTMarket.deployed();

  const data = {
    address: vrmNFTMarket.address,
    abi: JSON.parse(vrmNFTMarket.interface.format("json") as string),
  };

  // This writes the ABI and address to the frontend
  writeFileSync(
    "frontend/public/contracts/VrmNFTMarketplace.json",
    JSON.stringify(data, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
