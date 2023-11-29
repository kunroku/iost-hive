"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha3 = void 0;
const js_sha3_1 = require("js-sha3");
const getHashFunc = (size) => {
    switch (size) {
        case 512:
            return js_sha3_1.sha3_512;
        case 384:
            return js_sha3_1.sha3_384;
        case 256:
            return js_sha3_1.sha3_256;
        case 224:
            return js_sha3_1.sha3_224;
        default:
            break;
    }
};
const sha3 = (size, buf) => {
    return Buffer.from(getHashFunc(size)(buf), 'hex');
};
exports.sha3 = sha3;
//# sourceMappingURL=sha3.js.map