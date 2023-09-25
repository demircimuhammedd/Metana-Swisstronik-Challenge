///This script is to interact with MUT smart contract using the contract address provided
///and send a call to get MUT total supply. Total supply or "on" will be printed on the terminal after successful call.

//To run this on script execute the following commmand on terminal: npx hardhat run scripts/getTotalSupply.js --network swisstronik

const hre = require("hardhat");
const {
  encryptDataField,
  decryptNodeResponse,
} = require("@swisstronik/swisstronik.js");

const sendShieldedQuery = async (provider, destination, data) => {
  const rpclink = hre.network.config.url;
  const [encryptedData, usedEncryptedKey] = await encryptDataField(
    rpclink,
    data
  );
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });
  return await decryptNodeResponse(rpclink, response, usedEncryptedKey);
};

async function main() {
  // Address of the deployed contract
  const contractAddress = "0xc3157c82C5caEf903e81AC422cf765C1B51c5c41";
  // Get the signer
  const [signer] = await hre.ethers.getSigners();
  // Construct a contract instance
  const contractFactory = await hre.ethers.getContractFactory("MUT");
  const contract = contractFactory.attach(contractAddress);
  // Send a shielded quer to get MUT total supply
  const functionName = "totalSupply";
  const responseMessage = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contract.interface.encodeFunctionData(functionName)
  );
  //Decode result and print total supply
  console.log(
    "Decoded response:",
    contract.interface.decodeFunctionResult(functionName, responseMessage)[0]
  );
}

//DEFAULT BY HARDHAT:
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
