"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const sha3_1 = require("sha3");
const codec_1 = require("./crypto/codec");
const signature_1 = require("./crypto/signature");
const defaultTransactionConfig = {
    chainId: 1024,
    gasLimit: 2000000,
    gasRatio: 1,
};
class Transaction {
    constructor(props) {
        this.amount_limit = [];
        this.actions = [];
        this.publisher = '';
        this.publisher_sigs = [];
        this.signers = [];
        this.signatures = [];
        this.reserved = null;
        this.time = new Date().getTime();
        this.expiration = new Date().getTime();
        this.delay = 0;
        const config = Object.assign(Object.assign({}, defaultTransactionConfig), { props });
        this.chainId = config.chainId;
        this.gasLimit = config.gasLimit;
        this.gasRatio = config.gasRatio;
    }
    addSigner(id, permission) {
        if (this.signers.indexOf(`${id}@${permission}`) === -1) {
            this.signers.push(`${id}@${permission}`);
        }
        return this;
    }
    addApprove(token, amount = 'unlimited') {
        let index = null;
        for (let i = 0; i < this.amount_limit.length; i++) {
            if (this.amount_limit[i].token === token) {
                if (this.amount_limit[i].value === 'unlimited') {
                    return;
                }
                index = i;
                break;
            }
        }
        if (amount !== 'unlimited') {
            let _amount = Number(amount);
            if (Number.isNaN(amount)) {
                throw new Error('invalid amount');
            }
            if (index !== null) {
                _amount += Number(this.amount_limit[index].value);
            }
            amount = Number(_amount.toFixed(8));
        }
        if (index === null) {
            this.amount_limit.push({
                token: token,
                value: `${amount}`,
            });
        }
        else {
            this.amount_limit[index].value = `${amount}`;
        }
        return this;
    }
    getApproveList() {
        return this.amount_limit;
    }
    addAction(contract, abi, args) {
        this.actions.push({
            contract: contract,
            actionName: abi,
            data: JSON.stringify(args),
        });
        return this;
    }
    setTime(expiration, delay, serverTimeDiff) {
        this.time = new Date().getTime() * 1e6 + serverTimeDiff;
        this.expiration = this.time + expiration * 1e9;
        this.delay = delay;
        return this;
    }
    _base_hash() {
        const hash = new sha3_1.SHA3(256);
        hash.update(this._bytes(0));
        return hash.digest('binary');
    }
    addSign(keyPair) {
        const signature = new signature_1.Signature(this._base_hash(), keyPair);
        this.signatures.push(signature);
        return this;
    }
    _publish_hash() {
        const hash = new sha3_1.SHA3(256);
        hash.update(this._bytes(1));
        return hash.digest('binary');
    }
    addPublishSign(id, keyPair) {
        this.publisher = id;
        const info = this._publish_hash();
        const sig = new signature_1.Signature(info, keyPair);
        this.publisher_sigs.push(sig);
        return this;
    }
    _bytes(n) {
        const c = new codec_1.Codec();
        c.pushInt64(this.time);
        c.pushInt64(this.expiration);
        c.pushInt64(this.gasRatio * 100);
        c.pushInt64(this.gasLimit * 100);
        c.pushInt64(this.delay);
        c.pushInt(this.chainId);
        if (!this.reserved) {
            c.pushInt(0);
        }
        c.pushInt(this.signers.length);
        for (let i = 0; i < this.signers.length; i++) {
            c.pushString(this.signers[i]);
        }
        c.pushInt(this.actions.length);
        for (let i = 0; i < this.actions.length; i++) {
            const c2 = new codec_1.Codec();
            c2.pushString(this.actions[i].contract);
            c2.pushString(this.actions[i].actionName);
            c2.pushString(this.actions[i].data);
            c.pushBytes(c2.buf);
        }
        c.pushInt(this.amount_limit.length);
        for (let i = 0; i < this.amount_limit.length; i++) {
            const c2 = new codec_1.Codec();
            c2.pushString(this.amount_limit[i].token);
            c2.pushString(this.amount_limit[i].value + '');
            c.pushBytes(c2.buf);
        }
        if (n > 0) {
            c.pushInt(this.signatures.length);
            for (let i = 0; i < this.signatures.length; i++) {
                c.pushBytes(this.signatures[i].bytes());
            }
        }
        return c.buf;
    }
    toString() {
        return JSON.stringify(this);
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=tx.js.map