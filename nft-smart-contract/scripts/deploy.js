const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env"});

async function main() {
    const metadataURL = "ipfs://Qme82HX4qZLFgFtUHNu4a1hHT2aj8xcdZ2HXixfasZr6Y1/";

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