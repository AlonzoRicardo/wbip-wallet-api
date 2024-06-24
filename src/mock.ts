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
            sendTransaction: (params: { address: string, amount: number }) => Promise<{ txid: string }>;
            signMessage: (params: { message: string }) => Promise<{ signature: string, messageHash: string, address: string }>;
            signPSBT: (params: { psbt: string, signInputs: number[] | Record<string, number[]>, allowedSignHash?: string[] }) => Promise<{ txid: string }>;
        };
        stx: {
            deployContract: (params: DeployContractOpts) => Promise<{ txid: string }>;
        };
    };
}

const providerInfo: ProviderInfo = {
    name: "Mock Bitcoin Wallet",
    methods: {
        btc: {
            getAddresses: async () => [
                { address: "mockAddress1", balance: 0.5 },
                { address: "mockAddress2", balance: 1.2 },
            ],
            sendTransaction: async ({ address, amount }) => ({ txid: `mockTxid_to_${address}_amount_${amount}` }),
            signMessage: async ({ message }) => ({
                signature: `Signed message: ${message}`,
                messageHash: `hash_of_${message}`,
                address: "mockAddress1"
            }),
            signPSBT: async ({ psbt, signInputs, allowedSignHash = ["ALL"] }) => ({
                txid: `mockTxid_for_psbt_${psbt}`
            })
        },
        stx: {
            deployContract: async ({ contractCode, contractName }) => ({
                txid: `mockTxid_for_contract_${contractName}`
            }),
        },
    },
};

const identifyResponse = new CustomEvent("identify-response", {
    detail: providerInfo,
});

window.addEventListener("identify-request", () => {
    window.dispatchEvent(identifyResponse);
});

export { providerInfo };
