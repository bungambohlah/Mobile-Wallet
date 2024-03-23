const PlanQSigner = require('./txhelper');

// Initialize the PlanQSigner with a mnemonic and an RPC URL
const signer = new PlanQSigner('detail cherry canyon endless catch whip never dutch lizard hold worth demand', 'https://rpc.planq.network');

async function main() {
  const txResponse = await signer.signAndSendTransaction({
    toAddress: 'plq187ech4jrp8veclk5ylxwhg02dtg5sued356d2h', // PlanQ address or Ethereum address
    amount: '0.01', // Amount in Ether
    data: '', // Optional data field for the transaction
  });

  console.log('Transaction sent:', txResponse.hash);
}

main().catch(console.error);
