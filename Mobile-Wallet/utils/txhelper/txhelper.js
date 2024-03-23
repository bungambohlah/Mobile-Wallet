const ethers = require('ethers');
const { bech32 } = require('bech32');
const { Buffer } = require ('buffer');
global.Buffer = Buffer;
import 'react-native-get-random-values';

class PlanQSigner {
  constructor(mnemonic, rpcUrl) {
    this.mnemonic = mnemonic;
    this.rpcUrl = rpcUrl;
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.wallet = ethers.Wallet.fromMnemonic(mnemonic).connect(this.provider);
  }

  convertToPlanqAddress(ethAddress) {
    const addressBuffer = Buffer.from(ethAddress.substring(2), 'hex');
    const planqAddress = bech32.encode('plq', bech32.toWords(addressBuffer));
    return planqAddress;
  }

  convertToEthAddress(planqAddress) {
    const decodedData = bech32.decode(planqAddress);
    const hex = Buffer.from(bech32.fromWords(decodedData.words)).toString('hex');
    const ethAddress = '0x' + hex;
    return ethAddress;
  }

  async signAndSendTransaction({ toAddress, amount, data = '' }) {
    // Convert the PlanQ address to an Ethereum address if necessary
    let recipientAddress = toAddress;
    if (toAddress.startsWith('plq')) {
      recipientAddress = this.convertToEthAddress(toAddress);
    }
    const tx = {
      to: recipientAddress,
      value: ethers.utils.parseEther(amount.toString()), 
      data: data,
    };

    const signedTx = await this.wallet.signTransaction(tx);

    const txResponse = await this.provider.sendTransaction(signedTx);
    await txResponse.wait(); 

    return txResponse;
  }
}

module.exports =  { PlanQSigner };
