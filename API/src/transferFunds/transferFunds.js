import { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction } from "@hashgraph/sdk";

export const transferFunds = async (accountId, privateKey, toAccountId, amount) => {

    try {

        // Create our connection to the Hedera network
        // The Hedera JS SDK makes this reallyyy easy!
        const client = Client.forTestnet();

        client.setOperator(accountId, privateKey);

        //Create the transfer transaction
        const transferTransactionResponse = await new TransferTransaction()
            .addHbarTransfer(accountId, Hbar.fromTinybars(-amount)) //Sending account
            .addHbarTransfer(toAccountId, Hbar.fromTinybars(amount)) //Receiving account
            .execute(client);

        //Verify the transaction reached consensus
        const transactionReceipt = await transferTransactionResponse.getReceipt(client);

        const transactionStatus = transactionReceipt.status.toString();

        console.log("The transfer transaction from my account to the new account was: " + transactionStatus);

        if (transactionStatus === "SUCCESS")
            return { result: { transactionStatus: transactionStatus, transactionSuccess: 1, transactionReceipt: transactionReceipt }, error: false, message: "Transaction successful" }
        else
            return { result: { transactionStatus: transactionStatus, transactionSuccess: 0, transactionReceipt: transactionReceipt }, error: false, message: "Transaction failed" }

    } catch (err) {
        console.log("ERROR", err)
        return { result: { transactionStatus: null, transactionSuccess: 0 }, error: true, message: `Error while sending funds ${err}` }
    }
}