const { expect } = require("chai")
require("dotenv").config()

const IERC20 = require('@openzeppelin/contracts/build/contracts/ERC20.json')

const toEther = (n) => {
  return Number(ethers.utils.formatUnits(n.toString(), 'ether')).toFixed(2)
}

describe("Swap", function () {
  describe("Goerli Fork Swap", () => {

    beforeEach(async () => {
      // TODO: fill me in
    })

    it("Successfully Swaps", async () => {
      // TODO: fill me in
    })
  })

  describe("Mainnet Fork Swap", () => {

    beforeEach(async () => {
      // TODO: fill me in
    })

    it("Successfully Swaps", async () => {
      // TODO: fill me in
    })
  })
})
