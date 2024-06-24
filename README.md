### USAGE

```
import BitcoinWalletAPI from 'xverse-wallet-api';

const api = new BitcoinWalletAPI();

// Get addresses
api.getAddresses().then(addresses => {
  console.log('Addresses:', addresses);
});

// Send transaction
api.sendTransaction('mockAddress1', 1000).then(response => {
  console.log('Transaction:', response.txid);
});

// Sign message
api.signMessage('Hello, Bitcoin!').then(response => {
  console.log('Signed Message:', response);
});

// Sign PSBT
api.signPSBT('mockPSBT', [0, 1]).then(response => {
  console.log('Signed PSBT:', response.txid);
});

// Deploy contract
api.deployContract({ contractCode: 'code', contractName: 'MyContract' }).then(response => {
  console.log('Deploy Contract Response:', response.txid);
});
```