const { expect } = require("chai")
require("dotenv").config()

const IERC20 = require('@openzeppelin/contracts/build/contracts/ERC20.json')

const toEther = (n) => {
  return Number(ethers.utils.formatUnits(n.toString(), 'ether')).toFixed(2)
}

describe("Swap", function () {
  describe("Goerli Fork Swap", () => {

    // --- Create Token Contract Instances ---
    const UNI_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
    const WETH_ADDRESS = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"

    const UNI = new ethers.Contract(UNI_ADDRESS, IERC20.abi)
    const WETH = new ethers.Contract(WETH_ADDRESS, IERC20.abi)

    // --- Setup Swap Details ---
    const PATH = [UNI_ADDRESS, WETH_ADDRESS] // <-- Swapping UNI for WETH
    const FEE = 3000 // 0.3% --> https://info.uniswap.org/#/pools
    const AMOUNT = ethers.utils.parseUnits('1000000', 'ether') // <-- 1,000,000 UNI

    let account
    let swapper

    beforeEach(async () => {

      // --- Fork Network ---
      // --> https://hardhat.org/hardhat-network/docs/reference#hardhat_reset

      await network.provider.request({
        method: "hardhat_reset",
        params: [
          {
            forking: {
              jsonRpcUrl: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
              blockNumber: 8446620,
            },
          },
        ],
      })

      // --- Unlock Account ---
      // --> https://hardhat.org/hardhat-network/docs/reference#hardhat_impersonateaccount

      // You can view the top holders of a specific token by looking at the token on Etherscan.
      // It's important to pick an account that has both the token and ETH to pay for gas fees (even locally).
      // --> https://goerli.etherscan.io/token/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984#balances

      const UNLOCKED_ACCOUNT = "0x41653c7d61609D856f29355E404F310Ec4142Cfb"

      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [UNLOCKED_ACCOUNT],
      })

      account = await hre.ethers.getSigner(UNLOCKED_ACCOUNT)

      // --- Deploy Swapper ---

      const SWAP_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564"

      const Swapper = await ethers.getContractFactory("Swapper")
      swapper = await Swapper.deploy(SWAP_ROUTER)

    })

    it("Successfully Swaps", async () => {
      const uniBalanceBefore = await UNI.connect(account).balanceOf(account.address)
      const wethBalanceBefore = await WETH.connect(account).balanceOf(account.address)

      console.log(`\nUNI Balance Before: ${toEther(uniBalanceBefore)}`)
      console.log(`WETH Balance Before: ${toEther(wethBalanceBefore)}\n`)

      await UNI.connect(account).approve(swapper.address, AMOUNT)
      await swapper.connect(account).swap(PATH, FEE, AMOUNT)

      const uniBalanceAfter = await UNI.connect(account).balanceOf(account.address)
      const wethBalanceAfter = await WETH.connect(account).balanceOf(account.address)

      console.log(`UNI Balance After: ${toEther(uniBalanceAfter)}`)
      console.log(`WETH Balance After: ${toEther(wethBalanceAfter)}\n`)

      expect(uniBalanceAfter).to.be.lessThan(uniBalanceBefore)
      expect(wethBalanceAfter).to.be.greaterThan(wethBalanceBefore)
    })
  })

  describe("Mainnet Fork Swap", () => {

    // --- Create Token Contract Instances ---
    const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

    const DAI = new ethers.Contract(DAI_ADDRESS, IERC20.abi)
    const WETH = new ethers.Contract(WETH_ADDRESS, IERC20.abi)

    // --- Setup Swap Details ---
    const PATH = [DAI_ADDRESS, WETH_ADDRESS] // <-- Swapping DAI for WETH
    const FEE = 3000 // 0.3% --> https://info.uniswap.org/#/pools
    const AMOUNT = ethers.utils.parseUnits('1000000', 'ether') // <-- 1,000,000 DAI

    let account
    let swapper

    beforeEach(async () => {

      // --- Fork Network ---
      // --> https://hardhat.org/hardhat-network/docs/reference#hardhat_reset

      await network.provider.request({
        method: "hardhat_reset",
        params: [
          {
            forking: {
              jsonRpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
              blockNumber: 16572390,
            },
          },
        ],
      })

      // --- Unlock Account ---
      // --> https://hardhat.org/hardhat-network/docs/reference#hardhat_impersonateaccount

      // You can view the top holders of a specific token by looking at the token on Etherscan.
      // It's important to pick an account that has both the token and ETH to pay for gas fees (even locally).
      // --> https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f#balances

      const UNLOCKED_ACCOUNT = "0xb527a981e1d415AF696936B3174f2d7aC8D11369"

      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [UNLOCKED_ACCOUNT],
      })

      account = await hre.ethers.getSigner(UNLOCKED_ACCOUNT)

      // --- Deploy Swapper --- 

      const SWAP_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564"

      const Swapper = await ethers.getContractFactory("Swapper")
      swapper = await Swapper.deploy(SWAP_ROUTER)

    })

    it("Successfully Swaps", async () => {
      const daiBalanceBefore = await DAI.connect(account).balanceOf(account.address)
      const wethBalanceBefore = await WETH.connect(account).balanceOf(account.address)

      console.log(`\nDAI Balance Before: ${toEther(daiBalanceBefore)}`)
      console.log(`WETH Balance Before: ${toEther(wethBalanceBefore)}\n`)

      await DAI.connect(account).approve(swapper.address, AMOUNT)
      await swapper.connect(account).swap(PATH, FEE, AMOUNT)

      const daiBalanceAfter = await DAI.connect(account).balanceOf(account.address)
      const wethBalanceAfter = await WETH.connect(account).balanceOf(account.address)

      console.log(`DAI Balance After: ${toEther(daiBalanceAfter)}`)
      console.log(`WETH Balance After: ${toEther(wethBalanceAfter)}\n`)

      expect(daiBalanceAfter).to.be.lessThan(daiBalanceBefore)
      expect(wethBalanceAfter).to.be.greaterThan(wethBalanceBefore)
    })
  })
})
