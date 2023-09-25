///This script is to interact with MUT smart contract using the contract address provided
///and send a transaction to mint 100 MUT tokens. Transaction hash is returned/printed on the terminal after successful transaction.

//Note: the tokens are minted to contract owner address passed and amount(100) is converted to wei since MUT has 18 decimals

//To run this on script execute the following commmand on terminal: npx hardhat run scripts/mintMut.js --network swisstronik
const hre = require("hardhat");
const {
  encryptDataField,
  decryptNodeResponse,
} = require("@swisstronik/swisstronik.js");

//Sends a shielded transaction to the Swisstronik blockchain.
const sendShieldedTransaction = async (signer, destination, data, value) => {
  // Get the RPC link from the network configuration
  const rpclink = hre.network.config.url;
  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpclink, data);
  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  // Address of the deployed contract
  const contractAddress = "0xc3157c82C5caEf903e81AC422cf765C1B51c5c41";
  // Get the signer
  const [signer] = await hre.ethers.getSigners();
  // Construct a contract instance
  const contractFactory = await hre.ethers.getContractFactory("MUT");
  const contract = contractFactory.attach(contractAddress);
  // Send a shielded transaction to mint 100 MUT tokens
  const ownerAddress = "0x667E408BB46285D68d784249d6e41cfFE24f709A";
  const tokenAmount = hre.ethers.parseUnits("100", "ether");
  const mint100Tokens = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData("mint", [ownerAddress, tokenAmount]),
    0
  );
  await mint100Tokens.wait();
  //Return transaction hash
  console.log("Transaction successful with Hash: ", mint100Tokens.hash);
}

//DEFAULT BY HARDHAT:
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
