import { Client, PrivateKey, TopicCreateTransaction, AccountId, TopicMessageSubmitTransaction, TopicMessageQuery, TopicInfoQuery, Hbar, TopicId } from "@hashgraph/sdk";

export const signMessage = async (_accountId, _privateKey, _topicMemo, _message, _tokenId = undefined, _newTopic = false, _gas = 5000, _txnFee = 2) => {

    try {

        console.log("INSIDE FN", _accountId, _privateKey, _topicMemo, _message, _tokenId, _newTopic, _gas, _txnFee)
        // Create our connection to the Hedera network
        // The Hedera JS SDK makes this reallyyy easy!
        const client = Client.forTestnet();

        client.setOperator(_accountId, _privateKey);

        const privateKey = PrivateKey.fromString(_privateKey)
        const publicKey = privateKey.publicKey;
        const accountId = AccountId.fromString(_accountId)

        let topicId = _tokenId ? TopicId.fromString(_tokenId) : undefined;
        let createTopicReceipt = undefined;

        let topicIdString = _tokenId;

        if (_tokenId === undefined && _newTopic === false) {
            //Create a new account with 1,000 tinybar starting balance
            try {
                const createTopic = await new TopicCreateTransaction()
                    .setTopicMemo(_topicMemo)
                    .setAdminKey(privateKey)
                    .setSubmitKey(privateKey)
                    .execute(client)

                createTopicReceipt = await createTopic.getReceipt(client) // createTopicReceipt.topicId.toString()
                topicId = createTopicReceipt.topicId
                topicIdString = createTopicReceipt.topicId.toString()
            } catch (err) {
                return {
                    result: undefined,
                    error: true,
                    message: `Error while topic creation - ${err}`
                }
            }
        }
        const submitMessage = await new TopicMessageSubmitTransaction()
            .setTopicId(topicId)
            .setMessage(_message.toString())
            .execute(client)

        const submitMessageReceipt = await submitMessage.getReceipt(client)

        const messageTransactionHash = Buffer.from(submitMessageReceipt.topicRunningHash).toString('hex')

        console.log("submitMessageReceipt", submitMessageReceipt)
        console.log("submitMessageReceipt runningHash", messageTransactionHash)

        return {
            result: {
                topicId: topicIdString,
                topicReceipt: createTopicReceipt,
                messageTransactionHash: messageTransactionHash,
                messageReceipt: submitMessageReceipt
            },
            error: false,
            message: ""
        }
    } catch (err) {
        console.log("ERROR", err)
        return { result: undefined, error: true, message: `Error while message transaction - ${err}` }
    }
}