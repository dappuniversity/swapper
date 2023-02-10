const hre = require("hardhat");

async function main() {
  const SWAP_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564"

  const Swapper = await ethers.getContractFactory("Swapper")
  const swapper = await Swapper.deploy(SWAP_ROUTER)

  console.log(`Deployed Swapper Contract at: ${swapper.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
