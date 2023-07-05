const { ethers, run } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("deploying");
  const deployed = await SimpleStorageFactory.deploy();
  // await deployed.
  console.log(await deployed.getAddress());
  console.log(deployed);
  console.log("verifying now");
  await deployed.deploymentTransaction().wait(6);
  await verify(await deployed.getAddress(), []);

  const favnum = await deployed.retrieve();
  console.log(`Current Favourite Number is ${favnum}`);

  const newtx = await deployed.store(7);
  await newtx.wait(1);
  const newnum = await deployed.retrieve();
  console.log(`Now Favourite Number is ${newnum}`);
}

async function verify(contractAddress, args) {
  console.log("verifying");
  await run("verify: verify", {
    address: contractAddress,
    constructorArguments: args,
  });
  console.log("verified");
}

main();
