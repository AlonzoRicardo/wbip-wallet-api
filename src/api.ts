import { providerInfo } from './mock';

interface Address {
    address: string;
    balance: number;
}

interface DeployContractOpts {
    contractCode: string;
    contractName: string;
}

class BitcoinWalletAPI {
    private providerInfo = providerInfo;

    private btcMethods = [
        'getAddresses',
        'sendTransaction',
        'signMessage',
        'signPSBT'
    ] as const;

    private stxMethods = [
        'deployContract'
    ] as const;

    async request(method: string, params: any): Promise<any> {
        const [namespace, methodName] = method.split("_");
        if (namespace === "btc" && this.btcMethods.includes(methodName as any)) {
            return await (this.providerInfo.methods.btc as any)[methodName](params);
        } else if (namespace === "stx" && this.stxMethods.includes(methodName as any)) {
            return await (this.providerInfo.methods.stx as any)[methodName](params);
        } else {
            throw new Error("Method not supported");
        }
    }

    async getAddresses(): Promise<Address[]> {
        return await this.request("btc_getAddresses", {});
    }

    async sendTransaction(address: string, amount: number): Promise<{ txid: string }> {
        return await this.request("btc_sendTransaction", { address, amount });
    }

    async signMessage(message: string): Promise<{ signature: string, messageHash: string, address: string }> {
        return await this.request("btc_signMessage", { message });
    }

    async signPSBT(psbt: string, signInputs: number[] | Record<string, number[]>, allowedSignHash: string[] = ["ALL"]): Promise<{ txid: string }> {
        return await this.request("btc_signPSBT", { psbt, signInputs, allowedSignHash });
    }

    async deployContract(opts: DeployContractOpts): Promise<{ txid: string }> {
        return await this.request("stx_deployContract", opts);
    }
}

export default BitcoinWalletAPI;
