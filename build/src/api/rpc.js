"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPC = void 0;
const axios_1 = require("axios");
const events_1 = require("events");
class RPC {
    constructor(_host) {
        this._host = _host;
    }
    async _get(url) {
        try {
            const res = await (0, axios_1.default)({
                method: 'get',
                baseURL: this._host,
                url,
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
            return res.data;
        }
        catch (error) {
            if (error.response) {
                throw new Error(`${JSON.stringify(error.response.data)}`);
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    async _post(url, data) {
        try {
            const res = await (0, axios_1.default)({
                method: 'post',
                baseURL: this._host,
                url,
                data,
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
            return res.data;
        }
        catch (error) {
            if (error.response) {
                throw new Error(`${JSON.stringify(error.response.data)}`);
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    async _stream(url, data) {
        try {
            const res = await (0, axios_1.default)({
                method: 'post',
                baseURL: this._host,
                url,
                data,
                headers: {
                    'Content-Type': 'text/plain',
                },
                responseType: 'stream',
            });
            return res.data;
        }
        catch (error) {
            if (error.response) {
                throw new Error(`${JSON.stringify(error.response.data)}`);
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    async getNodeInfo() {
        const url = 'getNodeInfo';
        return await this._get(url);
    }
    async getChainInfo() {
        const url = 'getChainInfo';
        return await this._get(url);
    }
    async getGasRatio() {
        const url = 'getGasRatio';
        return await this._get(url);
    }
    async getRAMInfo() {
        const url = 'getRAMInfo';
        return await this._get(url);
    }
    async getTxByHash(hash) {
        const url = `getTxByHash/${hash}`;
        return await this._get(url);
    }
    async getTxReceiptByTxHash(hash) {
        const url = `getTxReceiptByTxHash/${hash}`;
        return await this._get(url);
    }
    async getBlockByHash(hash) {
        const url = `getBlockByHash/${hash}/true`;
        return await this._get(url);
    }
    async getBlockByNumber(num) {
        const url = `getBlockByNumber/${num}/true`;
        return await this._get(url);
    }
    async getAccount(id, byLongestChain = true) {
        const url = `getAccount/${id}/${byLongestChain}`;
        return await this._get(url);
    }
    async getBalance(address, symbol = 'iost', byLongestChain = true) {
        const url = `getTokenBalance/${address}/${symbol}/${byLongestChain}`;
        return await this._get(url);
    }
    async getProducerVoteInfo(id, byLongestChain = true) {
        const url = `getProducerVoteInfo/${id}/${byLongestChain}`;
        return await this._get(url);
    }
    async getContract(id, byLongestChain = true) {
        const url = `getContract/${id}/${byLongestChain}`;
        return await this._get(url);
    }
    async getContractStorage(id, key, field, byLongestChain = true) {
        const url = 'getContractStorage';
        const data = {
            id,
            key,
            field: field || '',
            by_longest_chain: byLongestChain,
        };
        return await this._post(url, data);
    }
    async getContractStorageFields(id, key, byLongestChain = true) {
        const url = 'getContractStorageFields';
        const data = {
            id,
            key,
            by_longest_chain: byLongestChain,
        };
        return await this._post(url, data);
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
        const res = await Promise.all(chunkedQuery.map((query) => this._post(url, query)));
        return res;
    }
    async sendTx(tx) {
        const url = 'sendTx';
        return await this._post(url, tx.toString());
    }
    async execTx(tx) {
        const url = 'execTx';
        return await this._post(url, tx.toString());
    }
    subscribe(topics, contract) {
        const url = 'subscribe';
        const data = {
            topics,
            filter: { contract_id: contract },
        };
        const event = new events_1.EventEmitter();
        this._stream(url, data).then(async (readable) => {
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
    async getCandidateBonus(name, byLongestChain = true) {
        const url = `getCandidateBonus/${name}/${byLongestChain}`;
        return await this._get(url);
    }
    async getVoterBonus(name, byLongestChain = true) {
        const url = `getVoterBonus/${name}/${byLongestChain}`;
        return await this._get(url);
    }
    async getTokenInfo(symbol, byLongestChain = true) {
        const url = `getTokenInfo/${symbol}/${byLongestChain}`;
        return await this._get(url);
    }
}
exports.RPC = RPC;
//# sourceMappingURL=rpc.js.map