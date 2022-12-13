"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _RPC_instances, _RPC_host, _RPC_get, _RPC_post, _RPC_stream;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPC = void 0;
const axios_1 = require("axios");
const events_1 = require("events");
class RPC {
    constructor(host) {
        _RPC_instances.add(this);
        _RPC_host.set(this, void 0);
        __classPrivateFieldSet(this, _RPC_host, host, "f");
    }
    async getNodeInfo() {
        const url = 'getNodeInfo';
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
    async getChainInfo() {
        const url = 'getChainInfo';
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
    async getGasRatio() {
        const url = 'getGasRatio';
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
    async getRAMInfo() {
        const url = 'getRAMInfo';
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
    async getTxByHash(hash) {
        const url = `getTxByHash/${hash}`;
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
    async getTxReceiptByTxHash(hash) {
        const url = `getTxReceiptByTxHash/${hash}`;
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
    async getBlockByHash(hash) {
        const url = `getBlockByHash/${hash}/true`;
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
    async getBlockByNumber(num) {
        const url = `getBlockByNumber/${num}/true`;
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
    async getAccount(id, byLongestChain = true) {
        const url = `getAccount/${id}/${byLongestChain}`;
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
    async getBalance(address, symbol = 'iost', byLongestChain = true) {
        const url = `getTokenBalance/${address}/${symbol}/${byLongestChain}`;
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
    async getProducerVoteInfo(id, byLongestChain = true) {
        const url = `getProducerVoteInfo/${id}/${byLongestChain}`;
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
    async getContract(id, byLongestChain = true) {
        const url = `getContract/${id}/${byLongestChain}`;
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
    async getContractStorage(id, key, field, byLongestChain = true) {
        const url = 'getContractStorage';
        const data = {
            id,
            key,
            field: field || '',
            by_longest_chain: byLongestChain,
        };
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_post).call(this, url, data);
    }
    async getContractStorageFields(id, key, byLongestChain = true) {
        const url = 'getContractStorageFields';
        const data = {
            id,
            key,
            by_longest_chain: byLongestChain,
        };
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_post).call(this, url, data);
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
        const res = await Promise.all(chunkedQuery.map((query) => __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_post).call(this, url, query)));
        return res;
    }
    async sendTx(tx) {
        const url = 'sendTx';
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_post).call(this, url, tx.toString());
    }
    async execTx(tx) {
        const url = 'execTx';
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_post).call(this, url, tx.toString());
    }
    subscribe(topics, contract) {
        const url = 'subscribe';
        const data = {
            topics,
            filter: { contract_id: contract },
        };
        const event = new events_1.EventEmitter();
        __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_stream).call(this, url, data).then(async (readable) => {
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
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
    async getVoterBonus(name, byLongestChain = true) {
        const url = `getVoterBonus/${name}/${byLongestChain}`;
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
    async getTokenInfo(symbol, byLongestChain = true) {
        const url = `getTokenInfo/${symbol}/${byLongestChain}`;
        return await __classPrivateFieldGet(this, _RPC_instances, "m", _RPC_get).call(this, url);
    }
}
exports.RPC = RPC;
_RPC_host = new WeakMap(), _RPC_instances = new WeakSet(), _RPC_get = async function _RPC_get(url) {
    try {
        const res = await (0, axios_1.default)({
            method: 'get',
            baseURL: __classPrivateFieldGet(this, _RPC_host, "f"),
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
}, _RPC_post = async function _RPC_post(url, data) {
    try {
        const res = await (0, axios_1.default)({
            method: 'post',
            baseURL: __classPrivateFieldGet(this, _RPC_host, "f"),
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
}, _RPC_stream = async function _RPC_stream(url, data) {
    try {
        const res = await (0, axios_1.default)({
            method: 'post',
            baseURL: __classPrivateFieldGet(this, _RPC_host, "f"),
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
};
//# sourceMappingURL=rpc.js.map