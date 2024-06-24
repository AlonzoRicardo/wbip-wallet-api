interface Address {
    address: string;
    balance: number;
}
interface DeployContractOpts {
    contractCode: string;
    contractName: string;
}
interface ProviderInfo {
    name: string;
    methods: {
        btc: {
            getAddresses: () => Promise<Address[]>;
            sendTransaction: (params: {
                address: string;
                amount: number;
            }) => Promise<{
                txid: string;
            }>;
            signMessage: (params: {
                message: string;
            }) => Promise<{
                signature: string;
                messageHash: string;
                address: string;
            }>;
            signPSBT: (params: {
                psbt: string;
                signInputs: number[] | Record<string, number[]>;
                allowedSignHash?: string[];
            }) => Promise<{
                txid: string;
            }>;
        };
        stx: {
            deployContract: (params: DeployContractOpts) => Promise<{
                txid: string;
            }>;
        };
    };
}
declare const providerInfo: ProviderInfo;
export { providerInfo };
