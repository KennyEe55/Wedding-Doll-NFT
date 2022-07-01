const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env"});

async function main() {
    const metadataURL = "ipfs://QmTKX6LgiyKW2ZhVz7HMx6FgpLFZuA2mNG9Sv3JU7W1aqq/";

    const weddingNFTContract = await ethers.getContractFactory("WeddingNFT");
    const deployWeddingNFTContract = await weddingNFTContract.deploy(metadataURL);

    await deployWeddingNFTContract.deployed();

    console.log("Wedding NFT Contract Address:", deployWeddingNFTContract.address);
}

main()
.then(()=> process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});