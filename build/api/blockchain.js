"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainRPC = void 0;
const events_1 = require("events");
const abstract_rpc_1 = require("./abstract-rpc");
class BlockchainRPC extends abstract_rpc_1.AbstractRPC {
    async getChainInfo() {
        const url = 'getChainInfo';
        return await this.get(url);
    }
    async getBlockByHash(hash) {
        const url = `getBlockByHash/${hash}/true`;
        return await this.get(url);
    }
    async getBlockByNumber(num) {
        const url = `getBlockByNumber/${num}/true`;
        return await this.get(url);
    }
    async getBalance(address, symbol = 'iost', byLongestChain = true) {
        const url = `getTokenBalance/${address}/${symbol}/${byLongestChain}`;
        return await this.get(url);
    }
    async getTokenInfo(symbol, byLongestChain = true) {
        const url = `getTokenInfo/${symbol}/${byLongestChain}`;
        return await this.get(url);
    }
    async getToken721Balance(address, symbol, byLongestChain = true) {
        const url = `getToken721Balance/${address}/${symbol}/${byLongestChain}`;
        return await this.get(url);
    }
    async getToken721Metadata(symbol, tokenID, byLongestChain = true) {
        const url = `getToken721Metadata/${symbol}/${tokenID}/${byLongestChain}`;
        return await this.get(url);
    }
    async getToken721Owner(symbol, tokenID, byLongestChain = true) {
        const url = `getToken721Owner/${symbol}/${tokenID}/${byLongestChain}`;
        return await this.get(url);
    }
    async getContract(id, byLongestChain = true) {
        const url = `getContract/${id}/${byLongestChain}`;
        return await this.get(url);
    }
    async getContractStorage(id, key, field, byLongestChain = true) {
        const url = 'getContractStorage';
        const data = {
            id,
            key,
            field: field || '',
            by_longest_chain: byLongestChain,
        };
        return await this.post(url, data);
    }
    async getContractStorageFields(id, key, byLongestChain = true) {
        const url = 'getContractStorageFields';
        const data = {
            id,
            key,
            by_longest_chain: byLongestChain,
        };
        return await this.post(url, data);
    }
    async getBatchContractStorage(id, keyFields, byLongestChain = true) {
        const chunkedQuery = [];
        for (let i = 0; i < keyFields.length; i++) {
            if (i % 50 === 0) {
                chunkedQuery.push({
                    id,
                    key_fields: [],
                    by_longest_chain: byLongestChain,
                });
            }
            chunkedQuery[chunkedQuery.length - 1].key_fields.push(keyFields[i]);
        }
        const url = 'getBatchContractStorage';
        const res = await Promise.all(chunkedQuery.map((query) => this.post(url, query)));
        return res;
    }
    async getAccountInfo(id, reversible = true) {
        const url = `getAccount/${id}/${reversible ? 1 : 0}`;
        return await this.get(url);
    }
    subscribe(topics, contract) {
        const url = 'subscribe';
        const data = {
            topics,
            filter: { contract_id: contract },
        };
        const event = new events_1.EventEmitter();
        this.stream(url, data).then(async (readable) => {
            var _a, e_1, _b, _c;
            try {
                for (var _d = true, readable_1 = __asyncValues(readable), readable_1_1; readable_1_1 = await readable_1.next(), _a = readable_1_1.done, !_a;) {
                    _c = readable_1_1.value;
                    _d = false;
                    try {
                        const chunk = _c;
                        const messages = Buffer.from(chunk)
                            .toString('utf-8')
                            .split('\n')
                            .filter((data) => data !== '')
                            .map((e) => JSON.parse(e));
                        event.emit('messages', messages);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = readable_1.return)) await _b.call(readable_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
        return event;
    }
    async subscribeAsync(topics, contract, onSubscribe) {
        const url = 'subscribe';
        const data = {
            topics,
            filter: { contract_id: contract },
        };
        return await this.stream(url, data).then(async (readable) => {
            var _a, e_2, _b, _c;
            const allMessages = [];
            try {
                for (var _d = true, readable_2 = __asyncValues(readable), readable_2_1; readable_2_1 = await readable_2.next(), _a = readable_2_1.done, !_a;) {
                    _c = readable_2_1.value;
                    _d = false;
                    try {
                        const chunk = _c;
                        const messages = Buffer.from(chunk)
                            .toString('utf-8')
                            .split('\n')
                            .filter((data) => data !== '')
                            .map((e) => JSON.parse(e));
                        allMessages.push(messages);
                        if (!(await onSubscribe(messages))) {
                            break;
                        }
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = readable_2.return)) await _b.call(readable_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return allMessages;
        });
    }
}
exports.BlockchainRPC = BlockchainRPC;
//# sourceMappingURL=blockchain.js.map