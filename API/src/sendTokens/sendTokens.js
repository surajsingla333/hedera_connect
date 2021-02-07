import { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction, TokenCreateTransaction, AccountId } from "@hashgraph/sdk";

export const sendTokens = async (_accountId, _privateKey, _tokenId, _receiverAccountId, _numberOfToken) => {

    try {

        const client = Client.forTestnet();

        client.setOperator(_accountId, _privateKey);

        const privateKey = PrivateKey.fromString(_privateKey)
        const publicKey = privateKey.publicKey;
        const accountId = AccountId.fromString(_accountId)

        const receiverAccountId = AccountId.fromString(_receiverAccountId)


        //Create the transfer transaction
        const transaction = new TransferTransaction()
            .addTokenTransfer(_tokenId, accountId, -_numberOfToken)
            .addTokenTransfer(_tokenId, receiverAccountId, _numberOfToken)
            .freezeWith(client);

        //Sign with the sender account private key
        const signTx = await transaction.sign(privateKey);

        //Sign with the client operator private key and submit to a Hedera network
        const txResponse = await signTx.execute(client);

        //Request the receipt of the transaction
        const transactionReceipt = await txResponse.getReceipt(client);

        //Obtain the transaction consensus status
        const transactionStatus = transactionReceipt.status.toString();

        console.log("The transfer transaction from my account to the new account was: " + transactionStatus + " " + transactionReceipt.status);

        if (transactionStatus === "SUCCESS")
            return { result: { transactionStatus: transactionStatus, transactionSuccess: 1, transactionReceipt: transactionReceipt }, error: false, message: "Token transfer successful" }
        else
            return { result: { transactionStatus: transactionStatus, transactionSuccess: 0, transactionReceipt: transactionReceipt }, error: false, message: "Token transfer failed" }

    } catch (err) {
        console.log("ERROR", err)
        return { result: undefined, error: true, message: `Token transfer failed, ${err}` }
    }
}