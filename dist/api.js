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
const mock_1 = require("./mock");
class BitcoinWalletAPI {
    constructor() {
        this.providerInfo = mock_1.providerInfo;
        this.btcMethods = [
            'getAddresses',
            'sendTransaction',
            'signMessage',
            'signPSBT'
        ];
        this.stxMethods = [
            'deployContract'
        ];
    }
    request(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const [namespace, methodName] = method.split("_");
            if (namespace === "btc" && this.btcMethods.includes(methodName)) {
                return yield this.providerInfo.methods.btc[methodName](params);
            }
            else if (namespace === "stx" && this.stxMethods.includes(methodName)) {
                return yield this.providerInfo.methods.stx[methodName](params);
            }
            else {
                throw new Error("Method not supported");
            }
        });
    }
    getAddresses() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("btc_getAddresses", {});
        });
    }
    sendTransaction(address, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("btc_sendTransaction", { address, amount });
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("btc_signMessage", { message });
        });
    }
    signPSBT(psbt, signInputs, allowedSignHash = ["ALL"]) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("btc_signPSBT", { psbt, signInputs, allowedSignHash });
        });
    }
    deployContract(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("stx_deployContract", opts);
        });
    }
}
exports.default = BitcoinWalletAPI;
