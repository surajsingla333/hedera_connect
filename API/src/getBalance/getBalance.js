import { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction } from "@hashgraph/sdk";

export const getBalance = async (accountId, privateKey) => {

    try {

        // Create our connection to the Hedera network
        // The Hedera JS SDK makes this reallyyy easy!
        const client = Client.forTestnet();

        client.setOperator(accountId, privateKey);

        //Verify the account balance of new
        const accountBalance = await new AccountBalanceQuery()
            .setAccountId(accountId)
            .execute(client);

        const balance = accountBalance.hbars.toString()
        console.log("ACCOUNTS BALANE", accountBalance)
        console.log("BALANCE", balance)
        console.log("BALANCE otken", accountBalance.tokens.toString())
        return { result: { balance: parseFloat(balance), tokensBalance: accountBalance.tokens.toString() }, error: false, message: "Balance fetched" }
    } catch (err) {
        console.log("ERROR", err)
        return { result: undefined, error: true, message: `Error while fetching balance ${err}` }
    }
}