const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("SimpleStorage", function () {
  let SimpleStorageFactory, deployed;
  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    deployed = await SimpleStorageFactory.deploy();
  });
  it("Should start with a 0", async function () {
    const curnum = await deployed.retrieve();
    const expect = 0;
    assert.equal(curnum.toString(), expect);
  });

  it("Should update the value", async function () {
    const expected = 7;
    const tx = await deployed.store(7);
    await tx.wait(1);
    const num = await deployed.retrieve();
    assert.equal(num.toString(), expected);
  });
});
