require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      // You can also specify to always fork when executing `npx hardhat node` or `npx hardhat test`
      // --> https://hardhat.org/hardhat-network/docs/guides/forking-other-networks#mainnet-forking

      // forking: {
      //   url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      // }
    }
  }
}
