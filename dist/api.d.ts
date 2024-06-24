interface Address {
    address: string;
    balance: number;
}
interface DeployContractOpts {
    contractCode: string;
    contractName: string;
}
declare class BitcoinWalletAPI {
    private providerInfo;
    private btcMethods;
    private stxMethods;
    request(method: string, params: any): Promise<any>;
    getAddresses(): Promise<Address[]>;
    sendTransaction(address: string, amount: number): Promise<{
        txid: string;
    }>;
    signMessage(message: string): Promise<{
        signature: string;
        messageHash: string;
        address: string;
    }>;
    signPSBT(psbt: string, signInputs: number[] | Record<string, number[]>, allowedSignHash?: string[]): Promise<{
        txid: string;
    }>;
    deployContract(opts: DeployContractOpts): Promise<{
        txid: string;
    }>;
}
export default BitcoinWalletAPI;
