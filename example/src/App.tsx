import React, { useEffect, useState } from 'react';
import BitcoinWalletAPI from 'xverse-wallet-api';

interface Address {
  address: string;
  balance: number;
}

const App: React.FC = () => {
  const [api, setApi] = useState<BitcoinWalletAPI | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [transactionResult, setTransactionResult] = useState<string>('');
  const [signedMessage, setSignedMessage] = useState<string>('');
  const [psbtResult, setPsbtResult] = useState<string>('');
  const [contractResult, setContractResult] = useState<string>('');

  useEffect(() => {
    const handleIdentifyResponse = (event: Event) => {
      const customEvent = event as CustomEvent<any>;
      console.log('Providers:', Array.from(customEvent.detail));
      setApi(new BitcoinWalletAPI());
    };

    window.addEventListener('identify-response', handleIdentifyResponse);

    const identifyRequest = new Event('identify-request');
    window.dispatchEvent(identifyRequest);

    return () => {
      window.removeEventListener('identify-response', handleIdentifyResponse);
    };
  }, []);

  const getAddresses = async () => {
    if (api) {
      const addresses = await api.getAddresses();
      setAddresses(addresses);
    }
  };

  const sendTransaction = async () => {
    if (api) {
      const result = await api.sendTransaction('mockAddress1', 0.1);
      setTransactionResult(result.txid);
    }
  };

  const signMessage = async () => {
    if (api) {
      const result = await api.signMessage('Hello, Bitcoin!');
      setSignedMessage(result.signature);
    }
  };

  const signPSBT = async () => {
    if (api) {
      const result = await api.signPSBT('mockPSBT', [0, 1]);
      setPsbtResult(result.txid);
    }
  };

  const deployContract = async () => {
    if (api) {
      const result = await api.deployContract({ contractCode: 'code', contractName: 'MyContract' });
      setContractResult(result.txid);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mock Bitcoin Wallet</h1>

        <button onClick={getAddresses} disabled={!api}>Get Addresses</button>
        <ul>
          {addresses.map((address, index) => (
            <li key={index}>{address.address}: {address.balance} BTC</li>
          ))}
        </ul>

        <button onClick={sendTransaction} disabled={!api}>Send Transaction</button>
        {transactionResult && <p>Transaction ID: {transactionResult}</p>}

        <button onClick={signMessage} disabled={!api}>Sign Message</button>
        {signedMessage && <p>Signed Message: {signedMessage}</p>}

        <button onClick={signPSBT} disabled={!api}>Sign PSBT</button>
        {psbtResult && <p>PSBT ID: {psbtResult}</p>}

        <button onClick={deployContract} disabled={!api}>Deploy Contract</button>
        {contractResult && <p>Contract ID: {contractResult}</p>}
      </header>
    </div>
  );
};

export default App;
