import { Client, AccountInfoQuery, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction, TokenCreateTransaction, AccountId, TokenAssociateTransaction, TokenInfoQuery } from "@hashgraph/sdk";


export const checkAccountDetails = async (_accountId, _publicKey, _privateKey) => {

    try {

        // Create our connection to the Hedera network
        // The Hedera JS SDK makes this reallyyy easy!
        const client = Client.forTestnet();

        client.setOperator(_accountId, _privateKey);

        const privateKeyObj = PrivateKey.fromString(_privateKey);
        const publicKeyObj = privateKeyObj.publicKey;
        const publicKeyString = publicKeyObj.toString();

        if (publicKeyString === _publicKey) {

            const query = new AccountInfoQuery()
                .setAccountId(_accountId).setQueryPayment(new Hbar(1));

            //Sign with client operator private key and submit the query to a Hedera network
            const accountInfo = await query.execute(client);

            const fetchPublicKey = accountInfo.key.toString()

            if (_publicKey === fetchPublicKey){
                return { result: { keysVerified: true }, error: false, message: `Account verified` }
            } else {
                return { result: { keysVerified: false }, error: false, message: `Public key does not corresponds to this account id` }
            }

        } else {
            return { result: { keysVerified: false }, error: false, message: `Public key does not corresponds to this private key` }
        }


    } catch (err) {
        console.log("ERROR", err)
        return { result: { undefined }, error: true, message: `Cannot verify the account - ${err}` }
    }
}