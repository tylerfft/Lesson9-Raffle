require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const { vars } = require("hardhat/config")

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const SEPOLIA_PRIVATE_KEY_0 = vars.get("SEPOLIA_PRIVATE_KEY_0")
const ETHERSCAN_API_KEY = vars.get("SEPOLIA_ETHERSCAN_API_KEY")
const INFURA_KEY = vars.get("INFURA_KEY")

const COINMARKETCAP_API_KEY = vars.get("COINMARKETCAP_API_KEY") || ""

const REPORT_GAS = process.env.REPORT_GAS || false

module.exports = {
    SEPOLIA_PRIVATE_KEY_0,
    ETHERSCAN_API_KEY,
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // // If you want to do some forking, uncomment this
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        // sepolia: {
        //     url: SEPOLIA_RPC_URL,
        //     accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        //     //   accounts: {
        //     //     mnemonic: MNEMONIC,
        //     //   },
        //     saveDeployments: true,
        //     chainId: 11155111,
        // },
        sepolia: {
            url: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
            accounts: [SEPOLIA_PRIVATE_KEY_0],
            chainId: 11155111,
            blockConfirmations: 6,
        },
    },
    etherscan: {
        // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
        },
        customChains: [],
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    contractSizer: {
        runOnCompile: false,
        only: ["Raffle"],
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
        player: {
            default: 1,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.24",
            },
        ],
    },
    mocha: {
        timeout: 500000, // 500 seconds max for running tests
    },
}
