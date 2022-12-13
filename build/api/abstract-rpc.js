"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRPC = void 0;
const axios_1 = require("axios");
class AbstractRPC {
    constructor(host) {
        this.host = host;
    }
    async get(url) {
        const res = await (0, axios_1.default)({
            method: 'get',
            baseURL: this.host,
            url,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
        return res.data;
    }
    async post(url, data) {
        const res = await (0, axios_1.default)({
            method: 'post',
            baseURL: this.host,
            url,
            data,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
        return res.data;
    }
    async stream(url, data) {
        const res = await (0, axios_1.default)({
            method: 'post',
            baseURL: this.host,
            url,
            data,
            headers: {
                'Content-Type': 'text/plain',
            },
            responseType: 'stream',
        });
        return res.data;
    }
}
exports.AbstractRPC = AbstractRPC;
//# sourceMappingURL=abstract-rpc.js.map