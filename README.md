# IOST client Library

## import

```
import { IOST } from '@iost/client';
```

or

```
const { IOST } = require('@iost/client');
```

## wallet data parse

### create empty wallet

```
import { Wallet, ConstantWalletRequestHandler, Bs58 } from '@iost/client';

const wallet = new Wallet(
  [],
  '',
  new ConstantWalletRequestHandler(
    async () => true,
    async () => true,
    async () => true,
    async () => true,
    async () => true,
  ),
);
```

### encrypt wallet data and decrypt wallet data

#### decrypt

```
import { Wallet, ConstantWalletRequestHandler, Bs58 } from '@iost/client';

const data = 'MJR4mzVHbrZaBzRprgYAMwQrgqSqehUaR:rezbhbSYD2wGPZytnxP292b31R2RviXVh5ZX6LP7oLmeLenHr2VkbjhDTuhtKDecUHKjUp6y3HXxLZHJc1YJr7yP9jp7iXVc3s8GrFYEjTd1419AdYQsw32iXvspr9CWjddFZSv4ZRLKEJoZJ7iFG8NDabD4F7dqi4SiAHmo5wHxqUZ1oECrKTZLcc1frRxjFcHGX7XVeDNXbs5FycvmsbhrLh66WJVnogxL2pJchrfWnBX1ss4ew2pHvGaXRSTAjhdBAzLhUcWPnCemumiZanyVvdyJtp8QbJxQ8fbmAh1rtN2HDHEVoT6tSeoLmisocVhyrKdetKgfLVTKFywHyGCyqHKJuXfi8H913bw8yvVM7JCzx5qcGGsAbQwDsY8aedojP6DCT1FJGrQeyT6ptY5MEtfYPFtsojPcb4Q31X6EmMBAqJ3C1Rb5YVHZkgf1vqp6fEqFzK2bCjRXgw1iko65TEmP2u6FNXbiCxyqjBY1r4vfdPmy6adtr4stkNoe6GHoAi4o7XSR1HpiSqUiviJdauYgkBKtTcuPv1Nws8YBsiUyDK9ZxKUQ4kXHrP7JsGupTWzykne';
const password = 'password';
const wallet = Wallet.parse(
  data,
  password,
  new ConstantWalletRequestHandler(
    // This function is called when an account signature is required
    async (id, permision, data) => {
      console.log('[require_sign]', `${id}@${permision}`, Bs58.encode(data));
      return true;
    },
    // This function is called when an account is requested to be added
    async (account) => {
      console.log('[require_add_account]', account);
      return true;
    },
    // This function is called when an account is requested to be updated
    async (account) => {
      console.log('[require_update_account]', account);
      return true;
    },
    // This function is called when an account is requested to be removed
    async (id) => {
      console.log('[require_remove_account]', id);
      return true;
    },
    // This function is called when a password is requested to be update
    async (password) => {
      console.log('[require_update_password]', password);
      return true;
    },
  ),
);
```

#### encrypt

```
console.log(wallet.toString());
```

## iost instance

```
import { Wallet, IOST, MAINNET_US } from '@iost/client';

const wallet = Wallet.parse(/** arguments **/);
const iost = new IOST({ host: MAINNET_US, chainId: 1024 });
```

## send transaction

### Step.1 create empty transaction

```
const tx = iost.createTransaction({ gasLimit: 100000 });
```

### Step.2 add contract actions

```
import { OfficialContracts } from '@iost/client';
/** Skip Step 1 **/
// create official iost contract caller
const contracts = new OfficialContracts(tx);
// add actions
contracts.vote_producer.getVote('eversystem');
```

### Step.3 set transaction time

```
await iost.setServerTimeDiff();
tx.setTime(1000, 0, iost.serverTimeDiff);
```

### Step.4 add signatures

```
const account = iost.wallet.accounts[0];
// iost.sign(/** wallet instance **/, /** tx instance **/, /** publisher **/, /** other signers **/);
await iost.sign(tx, account, []);
```

### Step.5-1 send tx (event emitter)

```
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

```
// This example will listen packed transaction result
const res = await iost.sendAsync(tx, {});
console.log(res);
```


## exec transaction

[WARNING] This api is additional option. You should check that the target iost node allows 'execTx' or not.

```
const res = await iost.exec(tx);
console.log(res);
```
