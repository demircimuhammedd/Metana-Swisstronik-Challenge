require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

//import private key from env
const PRIVATE_KEY = process.env.privateKey;

module.exports = {
  solidity: "0.8.19", //default version from docs
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/", //URL of the RPC node for Swisstronik.
      accounts: [`${PRIVATE_KEY}`], //private key imported starting with "0x"
    },
  },
};
