require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require("hardhat-contract-sizer");
require('hardhat-abi-exporter');
require("hardhat-gas-reporter");
require('solidity-docgen');
require('solidity-coverage');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },  
    blast_sepolia: {
      url: "https://sepolia.blast.io",
      chainId: 168587773,
      accounts: [process.env.PRIVATE_KEY]
    }
   },
   etherscan: {
    apiKey: {
      blast_sepolia: "blast_sepolia", // apiKey is not required, just set a placeholder
    },
    customChains: [
      {
        network: "blast_sepolia",
        chainId: 168587773,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/168587773/etherscan",
          browserURL: "https://testnet.blastscan.io"
        }
      }
    ]
  },
  solidity: {    
    compilers: [
      {
        version: "0.8.23",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
          evmVersion: "shanghai",
        },
      },
    ], 
  },
  abiExporter: {
    path: './abi',
    clear: true,
    flat: false,
    runOnCompile: false,
    except: ['./access', "./interfaces", "./proxy", "./security", "./token", "./utils"]
  },
  docgen:{
    path: './docs',
    clear: true,
    runOnCompile: false,
    pages: 'files',
    exclude: ['access', 'interfaces', "proxy", "security", "token", "utils"],
    theme: 'markdown',
    pageExtension: '.md',
  },
  gasReporter: {
    enabled: false
  }
};
