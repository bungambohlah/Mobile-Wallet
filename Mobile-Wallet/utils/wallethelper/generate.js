import { ethers } from 'ethers';

// Function to generate a new wallet
function generateWallet() {
  const wallet = ethers.Wallet.createRandom();
  console.log("Wallet Address:", wallet.address);
  console.log("Private Key:", wallet.privateKey);
}

// Example usage
generateWallet();
