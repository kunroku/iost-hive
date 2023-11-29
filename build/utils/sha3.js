"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha3 = void 0;
const sha3_1 = require("sha3");
const sha3 = (size, buf) => {
    const hash = new sha3_1.SHA3(size);
    hash.update(buf);
    return hash.digest('binary');
};
exports.sha3 = sha3;
//# sourceMappingURL=sha3.js.map