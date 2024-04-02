const ethers = require('ethers');

// Function to fetch and display the balance of an Ethereum address
async function fetchAndDisplayBalance() {
  try {
    // Specify your custom RPC provider URL
    const rpcProviderURL = 'https://planq-rpc.nodies.app'; // Your RPC provider URL
    
    // Use a custom provider to connect to the Ethereum network
    const provider = new ethers.providers.JsonRpcProvider(rpcProviderURL);

    // The Ethereum address whose balance you want to fetch
    const address = '0x0108276e9484c0377317dE77E208DB35911fc32C'; // Replace with the actual address

    // Fetch the balance of the address
    const balance = await provider.getBalance(address);

    // ethers.js returns the balance in wei, convert it to ether
    const balanceInEther = ethers.utils.formatEther(balance);

    // Display the balance
    console.log(`Balance: ${balanceInEther} ETH`);
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
}

// Call the function
fetchAndDisplayBalance();
