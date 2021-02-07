import { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction, TokenCreateTransaction, AccountId, TokenAssociateTransaction, TokenInfoQuery } from "@hashgraph/sdk";


export const checkTokenDetails = async (_accountId, _privateKey, _tokenId, _tokenName, _tokenSymbol) => {

    try {

        // Create our connection to the Hedera network
        // The Hedera JS SDK makes this reallyyy easy!
        const client = Client.forTestnet();

        client.setOperator(_accountId, _privateKey);

        // ------------------------------------------------------------
        const query = new TokenInfoQuery()
            .setTokenId(`${_tokenId}`);

        //Sign with the client operator private key, submit the query to the network and get the token supply
        const tokenDetails = await query.execute(client);

        if (tokenDetails.name.toString() === _tokenName) {
            if (tokenDetails.symbol.toString() === _tokenSymbol) {
                return { result: { correctTokenDetails: true, correctTokenDetailsMessage: "Correct details" }, error: false, message: "Tokens details fetched" }
            } else {
                return { result: { correctTokenDetails: false, correctTokenDetailsMessage: "Wrong token symbol provided" }, error: false, message: "Tokens details not fetched" }
            }
        } else {
            return { result: { correctTokenDetails: false, correctTokenDetailsMessage: "Wrong token name provided" }, error: false, message: "Tokens details not fetched" }
        }

    } catch (err) {
        console.log("ERROR", err)
        return { result: { correctTokenDetails: false, correctTokenDetailsMessage: "Wrong token id provided or network error" }, error: true, message: `Tokens details not fetched with error - ${err}` }
    }
}