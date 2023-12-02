# IOST client Library

## import

```js
import { IOST } from '@iost/hive';
```

or

```js
const { IOST } = require('@iost/hive');
```

## iost

### create iost instance

```js
const config = {
  "name": "Local",
  "host": "http://localhost:30001",
  "chainId": 1020
};
const iost = new IOST(config);
```

## wallet

### create wallet instance with local admin account

```js
import { Wallet, Account, Ed25519, Bs58 } from '@iost/hive';

const seckey = '2yquS3ySrGWPEKywCPzX4RTJugqRh7kJSo5aehsLYPEWkUxBWA39oMrZ7ZxuM4fgyXYs2cPwh5n8aNNpH5x2VyK1';

const wallet = new Wallet([
  new Account('admin')
    .addKeyPair('active', Ed25519.fromSecretKey(Bs58.decode(seckey)))
    .addKeyPair('owner', Ed25519.fromSecretKey(Bs58.decode(seckey)))
]);

```

#### encrypt

```js
console.log(wallet.toString('your-password'));
```

#### decrypt

```js
const wallet = Wallet.parse('encrypted-wallet-data', 'your-password');
```

## send transaction

### Step.1 create empty transaction

```js
const tx = iost.createTransaction({ gasLimit: 500000 });
```

### Step.2 add contract actions

```js
import { OfficialContracts } from '@iost/client';
/** Skip Step 1 **/
// create official iost contract caller
const contracts = new OfficialContracts(tx);
// add actions
contracts.vote_producer.getVote('eversystem');
```

### Step.3 set transaction time

```js
await iost.setServerTimeDiff();
tx.setTime(1000, 0, iost.serverTimeDiff);
```

### Step.4 add signatures

```js
const account = wallet.accounts[0];
await iost.sign(wallet, tx, account, []);
```

### Step.5-1 send tx (event emitter)

```js
// This example will listen irreversible transaction result
iost.send(tx, { times: 300, irreversible: true })
  .once('pending', (res) => {
    console.log('[pending]');
    console.log(res);
  })
  .once('packed', (res) => {
    console.log('[packed]');
    console.log(res);
  })
  .once('irreversible', (res) => {
    console.log('[irreversible]');
    console.log(res);
  })
  .once('failed', (res) => {
    console.log('[failed]');
    console.log(res);
  });
```

### Step.5-2 send tx (async function)

```js
// This example will listen packed transaction result
const res = await iost.sendAsync(tx, {});
console.log(res);
```

## exec transaction

[WARNING] This api is additional option. You should check that the target iost node allows 'execTx' or not.

```js
const res = await iost.exec(tx);
console.log(res);
```
