import { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction } from "@hashgraph/sdk";

export const generateAccount = async (accountId, privateKey, initialAmount = 0) => {

  try {

    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this reallyyy easy!
    const client = Client.forTestnet();

    client.setOperator(accountId, privateKey);

    //Create new keys
    const newAccountPrivateKey = await PrivateKey.generate();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    //Create a new account with 1,000 tinybar starting balance
    const newAccountTransactionResponse = await new AccountCreateTransaction()
      .setKey(newAccountPublicKey)
      .setInitialBalance(Hbar.fromTinybars(initialAmount))
      .execute(client);

    // Get the new account ID
    const getReceipt = await newAccountTransactionResponse.getReceipt(client);
    const newAccountId = getReceipt.accountId;

    return {
      result: {
        accountId: newAccountId.toString(),
        publicKey: newAccountPublicKey.toString(),
        privateKey: newAccountPrivateKey.toString()
      }, error: false, message: "New account created"
    }

  } catch (err) {
    console.log("ERROR", err)
    return { result: { undefined }, error: true, message: `Error while generating new account,  ${err}` }
  }
}