//This script is used to deploy MUT contract. MUT address is printed on termminal after deployment.

//To run this on script execute the following commmand on terminal: npx hardhat run scripts/deploy.js --network swisstronik
const hre = require("hardhat");

async function main() {
  //deploy contract without arguments for constructor
  const contract = await hre.ethers.deployContract("MUT", []);
  await contract.waitForDeployment();
  //print contract address
  console.log(`MUT contract successfully deployed to ${contract.target}`);
}

//DEFAULT BY HARDHAT:
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
