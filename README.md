# LiteMakerJS

This is a JS wrapper meant to simplify working with the Maker system. In its
present iteration, it provides the ability to transfer tokens in the Maker Asset
Registry and assist Dai Alpha members in making, confirming, and triggering
proposals.

MakerJS is meant to be environment-agnostic, meaning it is just as happy running
in the browser as it is running server-side in NodeJS or interactively via geth.

## Normal Use

The simplest way at present to use MakerJS is to load it into geth.

```
$ geth attach
> loadScript('maker.js')
true
```

Once loaded, you must instantiate a copy of MakerJS by passing it a copy of your
web3 object and the name of the network you are connected to. (In this case
either 'live' or 'morden'.)

```
> var maker = new dapple.maker(web3, 'morden')
```

The maker object created above provides the ability to transfer Maker Asset
Registry tokens and, for admins, propose, confirm, and trigger actions. Here are
some annotated example token uses:

```
> maker.getToken('MKR').totalSupply()
1e+24

> // MKR has the same number of decimal places as ether.
> web3.fromWei(maker.getToken('MKR').totalSupply())
1000000

> // You might not have tokens, but we have 1000 MKR "wei" in this example.
> maker.getToken('MKR').balanceOf(web3.eth.coinbase)
1000

> // Let's define some default transaction parameters now.
> var opts = {from: web3.eth.coinbase, gas: 3141592}

> // We're going to allow another address to charge up
> // to 100 MKR wei from our account.
> var recipient = '0x803c84d8b64be30554e2edb9c61b50bc78a7231f'
> maker.getToken('MKR').approve(recipient, 100, opts)

> // Verify the allowance. The account that granted the allowance comes first,
> // followed by the account that was granted the allowance.
> maker.getToken('MKR').allowance(opts.from, recipient)
100

> // We're going to transfer 10 MKR wei from an account we have been
> // granted an allowance from.
> // First, verify our allowance...
> var granter = '0x941d249889291b55486bdcab6f585ea3c87dfb51'
> maker.getToken('MKR').allowance(granter, opts.from)
10
> // ...and then we make the transfer.
> var recipient = '0x55b6a98c3168299899bc45e1b2ed75fb0bff1462'
> maker.getToken('MKR').transferFrom(granter, recipient, 10, opts)

> // Finally, let's send 10 MKR wei from our account.
> maker.getToken('MKR').transfer(recipient, 10, opts)
```

## Admin Use

If you are a multisig member, you can also use MakerJS to propose, confirm, and
trigger actions. Here are some simple examples:

```
> // getInfo shows information about the multisig's configuration.
> maker.admin.getInfo()
{
  lastActionID: 0, // no actions proposed yet
  members: 6,
  quorum: 4,
  votingPeriod: 86400 // in seconds

}

> // Propose sending 1 MKR wei from the supply to our own account.
> // By default, the multisig has all the tokens.
> // First we have to pass the contract we want the multisig to call a function
> // on, then the name of the function, then an array of arguments, then any
> // ether we want to send from the multisig along with the transaction, and
> // then (optionally) our transaction options and a callback.
> maker.admin.propose(maker.getToken('MKR'), 'transfer', [web3.eth.coinbase, 1],
.. 0, opts, maker.logAction)

> // Wait until the transaction is included in a block, at which point we should
> // see some output from the `maker.logAction` callback. In this case we're
> // pretending this is the first proposal ever made via the multisig contract.
Action ID: 1

> // getInfo is also updated to show our action ID.
> // (Don't rely on this to get your action ID, though!)
> maker.admin.getInfo()
{
  lastActionID: 1,
  ...
}

> // To confirm a proposal, we have to be an admin. Make sure our sending
> // address is a member of the admin multisig.
> maker.admin.isAdmin(opts.from)
true

> // Our action ID is 1, so that's what we need to pass to confirmAction.
> // Note that proposing an action does *not* automatically confirm it for you.
> // This allows people to propose actions they don't necessarily agree with on
> // behalf of others.
> maker.admin.confirmAction(1, opts, maker.logAction)

> // Wait until the transaction is included again...
Action ID: 1

> // Now let's check the status of our proposal.
> maker.admin.actionStatus(1)
{
  confirmations: 1,
  expiration: <Date Mon, 29 Feb 2016 19:15:23 UTC>,
  triggered: false

}

> // Other admins will want to verify our proposal before voting.
> // To do so, they pass in the action ID, the target contract,
> // the function name, the function arguments, the wei value to be sent,
> // and a callback. The `maker.logVerification` callback prints the results in
> // a user-friendly format to the console.
> maker.admin.verifyAction(1, maker.getToken('MKR'), 'transfer',
.. [<our coinbase address>, 1], 0, maker.logVerification)
Action #1 verification result: Passes verification. Should be safe to confirm.

// Given enough confirmations, we should be able to trigger the action.
> maker.admin.triggerAction(1, opts, maker.logAction)
Action ID: 1

> // Now let's check the status of our proposal again.
> maker.admin.actionStatus(1)
{
  confirmations: 4,
  expiration: <Date Mon, 29 Feb 2016 19:15:23 UTC>,
  triggered: true

}
```

Furthermore, the propose, confirm, and trigger functions all emit events which
can be accessed like so:

```
> maker.admin.ActionProposed
function()
> maker.admin.ActionConfirmed
function()
> maker.admin.ActionTriggered
function()
```

For more information about how to use events, see [the web3 Javascript API
docs](https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-events).

And finally, the maker object exposes several other properties which may be used
to drill down into the components underlying its behavior. Most users will not
need to know about or use these components, but developers may find them useful:

```
> Object.keys(maker)
["_web3", "dappsys", "admin"]
> Object.keys(maker.admin)
["_maker", "_dappsys", "_web3", "_multisig", "ActionProposed", "ActionConfirmed", "ActionTriggered"]
> Object.keys(maker.dappsys)
["web3", "headers", "classes", "objects", "environment"]
> Object.keys(maker.dappsys.headers)
["DSApprovalDB", ...]
> Object.keys(maker.dappsys.headers.DSTokenFrontend)
["interface"]
> Object.keys(maker.dappsys.environment.objects)
["auth_factory1", ...]
> Object.keys(maker.dappsys.environment.objects.token_registry)
["class", "address"]
> Object.keys(maker.dappsys.objects)
["auth_factory1", ...]
> Object.keys(maker.dappsys.objects.token_registry)
["address", "getToken", "updateAuthority", "get", "unset", "_authority",
"_auth_mode", "tryGet", "set", "allEvents", "SetNullable", "DSAuthUpdate", "abi"]
```

## Code Generation

The code in `maker.js` was partially generated using Dapple. I began with
running `dapple build --no-deploy-data` in `maker-core` and then manually added
helper functions and classes at the bottom of the generated file. At present
there is no clean way to update the generated code portion of the file.
