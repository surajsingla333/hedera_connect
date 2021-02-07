import { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction, TokenCreateTransaction, AccountId } from "@hashgraph/sdk";

export const createToken = async (_accountId, _privateKey, _tokenName, _tokenSymbol, _tokenSupply, _txnFee = 30) => {
    try {

        const client = Client.forTestnet();

        client.setOperator(_accountId, _privateKey);

        const privateKey = PrivateKey.fromString(_privateKey)
        const publicKey = privateKey.publicKey;
        const accountId = AccountId.fromString(_accountId)


        const transaction = new TokenCreateTransaction()
            .setTokenName(_tokenName)
            .setTokenSymbol(_tokenSymbol)
            .setTreasuryAccountId(accountId)
            .setInitialSupply(_tokenSupply)
            .setAdminKey(publicKey)
            .setMaxTransactionFee(new Hbar(_txnFee)) //Change the default max transaction fee
            .freezeWith(client);

        //Sign the transaction with the token adminKey and the token treasury account private key
        const signTx = await (await transaction.sign(privateKey)).sign(privateKey);

        //Sign the transaction with the client operator private key and submit to a Hedera network
        const txResponse = await signTx.execute(client);

        //Get the receipt of the transaction
        const receipt = await txResponse.getReceipt(client);

        //Get the token ID from the receipt
        const tokenId = receipt.tokenId;


        console.log("\nSIGN TX \n", signTx);
        console.log("\nTX response \n", txResponse);
        console.log("\nTX receipt \n", receipt);


        console.log("\nThe new token ID is " + tokenId);

        const tokenIdString = tokenId.toString()

        return { result: { tokenId: tokenIdString, tokenName: _tokenName, tokenSymbol: _tokenSymbol, transactionResponse: txResponse, receipt: receipt }, error: false, message: "Token generated" }

        //v2.0.5
    } catch (err) {
        console.log("ERROR", err)
        return { result: undefined, error: true, message: `Token generation failed, ${err}` }
    }
}