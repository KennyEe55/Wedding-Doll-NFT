const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env"});

async function main() {
    const metadataURL = "ipfs://QmNUp5KhhA9VinFqnLT7sMsq2319gaMYjBZAn2fh7Csdwt/";

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