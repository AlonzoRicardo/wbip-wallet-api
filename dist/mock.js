"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerInfo = void 0;
const providerInfo = {
    name: "Mock Bitcoin Wallet",
    methods: {
        btc: {
            getAddresses: () => __awaiter(void 0, void 0, void 0, function* () {
                return [
                    { address: "mockAddress1", balance: 0.5 },
                    { address: "mockAddress2", balance: 1.2 },
                ];
            }),
            sendTransaction: ({ address, amount }) => __awaiter(void 0, void 0, void 0, function* () { return ({ txid: `mockTxid_to_${address}_amount_${amount}` }); }),
            signMessage: ({ message }) => __awaiter(void 0, void 0, void 0, function* () {
                return ({
                    signature: `Signed message: ${message}`,
                    messageHash: `hash_of_${message}`,
                    address: "mockAddress1"
                });
            }),
            signPSBT: ({ psbt, signInputs, allowedSignHash = ["ALL"] }) => __awaiter(void 0, void 0, void 0, function* () {
                return ({
                    txid: `mockTxid_for_psbt_${psbt}`
                });
            })
        },
        stx: {
            deployContract: ({ contractCode, contractName }) => __awaiter(void 0, void 0, void 0, function* () {
                return ({
                    txid: `mockTxid_for_contract_${contractName}`
                });
            }),
        },
    },
};
exports.providerInfo = providerInfo;
const identifyResponse = new CustomEvent("identify-response", {
    detail: providerInfo,
});
window.addEventListener("identify-request", () => {
    window.dispatchEvent(identifyResponse);
});
