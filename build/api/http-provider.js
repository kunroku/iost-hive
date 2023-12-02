"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPProvider = void 0;
const axios_1 = require("axios");
class HTTPProvider {
    constructor(host) {
        this.host = host;
    }
    async get(url) {
        try {
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
        catch (error) {
            if (error.response) {
                throw new Error(`${JSON.stringify(error.response.data)}`);
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    async post(url, data) {
        try {
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
        catch (error) {
            if (error.response) {
                throw new Error(`${JSON.stringify(error.response.data)}`);
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    async stream(url, data) {
        try {
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
        catch (error) {
            if (error.response) {
                throw new Error(`${JSON.stringify(error.response.data)}`);
            }
            else {
                throw new Error(error.message);
            }
        }
    }
}
exports.HTTPProvider = HTTPProvider;
//# sourceMappingURL=http-provider.js.map