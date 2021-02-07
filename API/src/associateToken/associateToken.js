import { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction, TokenCreateTransaction, AccountId, TokenAssociateTransaction } from "@hashgraph/sdk";

export const associateToken = async (accountId, privateKey, _tokenId) => {
    try {

        //Associate a token to an account and freeze the unsigned transaction for signing
        const client = Client.forTestnet();

        client.setOperator(accountId, privateKey);

        const myPK = PrivateKey.fromString(privateKey)
        // const myPublicK = myPK.publicKey;
        const myAid = AccountId.fromString(accountId)

        const transaction = new TokenAssociateTransaction()
            .setAccountId(myAid)
            .setTokenIds([_tokenId])
            .freezeWith(client);

        //Sign with the sender account private key
        const signTx = await transaction.sign(myPK);

        //Sign with the client operator private key and submit to a Hedera network
        const txResponse = await signTx.execute(client);

        //Request the receipt of the transaction
        const transactionReceipt = await txResponse.getReceipt(client);

        //Obtain the transaction consensus status
        const transactionStatus = transactionReceipt.status.toString();

        console.log("The transfer transaction from my account to the new account was: " + transactionStatus + " " + transactionReceipt.status);


        if (transactionStatus === "SUCCESS")
            return { result: { transactionStatus: transactionStatus, transactionSuccess: 1, transactionReceipt: transactionReceipt }, error: false, message: "Token associated successful" }
        else
            return { result: { transactionStatus: transactionStatus, transactionSuccess: 0, transactionReceipt: transactionReceipt }, error: false, message: "Token association failed" }

    } catch (err) {
        console.log("ERROR", err)
        return { result: undefined, error: true, message: `Token association failed, ${err}` }
    }
}