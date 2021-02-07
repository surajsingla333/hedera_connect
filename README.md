# Hedera Connect

Hedera connet is a browser extension wallet for Hedera Hashgraph. 

The wallet will enable the users to manage hedera accounts in the browser without any other dependency. This can also be used to interact with dApps built on Hedera hashgraph. Using the wallet, users will also be able to create and manage Token built on hedera.

## Idea
The wallet is developed to provide users and developers an easy and user friendly interface to interact with Hedera Hashgraph and dApps built on Hedera.

### Development
This is a [ReactJS](https://reactjs.org/) based Google Chrome Browser Extension.

[Hedera SDK](https://docs.hedera.com/guides/docs/sdks) is used to connect account with Hedera hashgraph using the wallet.

Various Hedera APIs and services which are currently used are:

[Hedera Cryptocurrency Accounts](https://docs.hedera.com/guides/docs/hedera-api/cryptocurrency-accounts), to create, add, and manage Hedera Accounts.

[Hedera Token Service](https://docs.hedera.com/guides/docs/hedera-api/token-service), for creating and managing tokens in the wallet.

[Hedera Smart Contracts](https://docs.hedera.com/guides/docs/hedera-api/smart-contracts), for interacting with smart contracts based dApps.

###### For more details about Hedera Hashgraph goto :  https://docs.hedera.com/guides/

The extension is built using [this](https://github.com/tshaddix/webext-redux-examples/tree/master/clicker-key) boiler-plate code for ReactJS for Chrome extensions.
