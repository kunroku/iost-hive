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
import { Wallet, WalletRequestHandler, Bs58 } from '@iost/client';

const wallet = new Wallet(
  [],
  '',
  new WalletRequestHandler(
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
import { Wallet, WalletRequestHandler, Bs58 } from '@iost/client';

const data = 'BaeguqaT6Gou2phnvGrXPftGBsBSTD3Pm:L8N8ec8zvvuCvY3HN6YpJsZQUnn2rVE51JGuUunHUHMBp36jUGsS27FffU7byLYKo7VRMZnUTKwtRK7TriBDKDkQjTQ8WhsGkBEtU4xxY1EAdddAVoodvY9t3TBLvFyPdJ4XHNMrdZythcawVRPmkq2QYHG5theex3XwLqjwD65T1qbHBwYyQuAdFq4FsCa9vJ2FDY1ZQgditrLzPsgULGWVbg2FKPRNAv42kFGY7y9fXsQvQUZLSkoewioZF7oktaRxg7ZJhzxMGrt5mRjXUjpmBRSdcHzGzF9bHJQBY5yBSRqrsnQUwFM7xNib4tTtHqXwqsDWpr1Q1ihPcdQAkmAmWyo7';
const password = 'password';
const wallet = Wallet.parse(
  data,
  password,
  new WalletRequestHandler(
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
const iost = new IOST({ host: MAINNET_US, chainId: 1024 }, wallet);
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
// iost.sign(/** tx instance **/, /** publisher **/, /** other signers **/);
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
