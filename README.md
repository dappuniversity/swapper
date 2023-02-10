# Swapper

## Technology Stack & Tools

- Solidity (Writing Smart Contracts & Tests)
- Javascript (React & Testing)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Infura.io](https://www.infura.io/) (Blockchain Connection)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/). Recommended to use the LTS version.
- Create an account or login to [Infura.io](https://www.infura.io/).

## Extra Resources
- [How to fork](https://hardhat.org/hardhat-network/docs/reference#hardhat_reset)
- [How to impersonate an account](https://hardhat.org/hardhat-network/docs/reference#hardhat_impersonateaccount)

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
`$ npm install`

### 3. Setup .env
Before running any scripts, you'll want to create a .env file with the following values (see .env.example):

- **INFURA_API_KEY=""**

You'll need to create an account on [Infura.io](https://www.infura.io/), and create an API key.

### 3. Run tests
`$ npx hardhat test`