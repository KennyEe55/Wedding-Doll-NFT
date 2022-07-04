import { Contract, providers, utils } from "ethers";
import React, { useEffect, useState, useRef } from "react";
import Web3Modal from "web3modal";
import { abi, NFT_CONTRACT_ADDRESS } from "./constant";
import './App.css';


export default function Home() {
  const [walletConnected,setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenIdsMinted, setTokenIdsMinted] = useState('0');
  const web3ModalRef = useRef();
  const [price, setPrice] = useState('0');
  
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Mumbai network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const publicMint = async() => {
    try {
      if(price >= 0.001){
      console.log("Angpao for Wedding");
      const signer = await getProviderOrSigner(true);
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      const tx = await nftContract.mint({
        value: utils.parseEther(price),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You have gotten your Wedding NFT!");
    } else {
      window.alert("Please Key in a value above 0.001 ETH")
    }
    } catch (err) {
      console.error(err)  
    }
  };

  const connectWallet = async() => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err)
    }
  };

  const getTokenIdsMinted = async() => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      const _tokenIds = await nftContract.tokenIds();
      console.log("tokenIds", _tokenIds);
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) { 
      console.error(err)
    }
  }

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      //connectWallet();
      getTokenIdsMinted();

      setInterval(async function () {
        await getTokenIdsMinted();
      }, 5 * 1000);
    }
}, [walletConnected]);

const renderButton = () => {
  // If wallet is not connected, return a button which allows them to connect their wallet
  if (!walletConnected) {
    return (
      <button onClick={connectWallet} className="button">
          Connect your wallet
        </button>
    );
  }

  // If we are currently waiting for something, return a loading button
  if (loading) {
    return <button className="button">Loading...</button>;
  }

  return (
    <>
    <div className="minting-section">
    <input
      className="input-eth"
      type={'text'}
      value={price}
      placeholder="Key in the Amount of ETH"
      onChange={event => {
        setPrice(event.target.value);
      } } />
      <div>
      <button className="button" onClick={publicMint}>
        Submit
      </button>
      </div>
      </div></>
  );
};

return (
  <div>
      <head>
      <title>Wedding NFT</title>
      <meta name="description" content="Wedding NFT dApp" />
      <link rel="icon" href="/favicon.ico" />
      </head>
    <div className="main">
      <body>
      <div>
        <h1 className="title">Thanks for attending our wedding!</h1>
        <h2 className="title"> Angpao NFT Minting Experience!</h2>
        <div className="description">
          Key in the amount of ETH You would like as an E-Angpao!
        </div>
        <div className="description">
          {tokenIdsMinted}/10 have been minted
        </div>
        {renderButton()}
      </div>
      </body>
    </div>
    <footer className="footer">Made with &#10084; by Kenneth</footer>
    
  </div>
  
);
}
