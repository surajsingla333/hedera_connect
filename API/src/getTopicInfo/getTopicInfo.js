import { Client, PrivateKey, TopicCreateTransaction, AccountId, TopicMessageSubmitTransaction, TopicMessageQuery, TopicInfoQuery, Hbar } from "@hashgraph/sdk";

export const getTopicInfo = async (accountId, privateKey, _topicId, _queryPayment = 10, _maxQueryPayment = 10) => {

    try {

        // Create our connection to the Hedera network
        // The Hedera JS SDK makes this reallyyy easy!
        const client = Client.forTestnet();

        client.setOperator(accountId, privateKey);

        let topicInfoQuery = await new TopicInfoQuery()
            .setTopicId(_topicId)
            .setQueryPayment(new Hbar(_queryPayment))
            .setMaxQueryPayment(new Hbar(_maxQueryPayment))
            .execute(client)
        console.log("topicInfoQuery", topicInfoQuery)
        console.log("topicInfoQuery", topicInfoQuery.topicId.toString())
        console.log("topicInfoQuery", topicInfoQuery.topicMemo)
        console.log("topicInfoQuery", Buffer.from(topicInfoQuery.runningHash).toString('hex'))
        console.log("topicInfoQuery", topicInfoQuery.sequenceNumber.toString())
        console.log("topicInfoQuery", topicInfoQuery.expirationTime.toDate())
        console.log("topicInfoQuery", topicInfoQuery.adminKey.toString())
        console.log("topicInfoQuery", topicInfoQuery.submitKey.toString())
        console.log("topicInfoQuery", topicInfoQuery.autoRenewPeriod._toProtobuf().seconds.toString())
        console.log("topicInfoQuery", topicInfoQuery.autoRenewAccountId ? topicInfoQuery.autoRenewAccountId.toString() : topicInfoQuery.autoRenewAccountId)

        return {
            result: {
                topicInfo: topicInfoQuery,
                topicMemo: topicInfoQuery.topicId.toString(),
                topicRunningHash: Buffer.from(topicInfoQuery.runningHash).toString('hex'),
                topicSequenceNumber: topicInfoQuery.sequenceNumber.toString(),
                topicExiprationTime: topicInfoQuery.expirationTime.toDate(),
                topicAdminKey: topicInfoQuery.adminKey.toString(),
                topicSubmitKey: topicInfoQuery.submitKey.toString(),
                topicAutoRenewPeriod: topicInfoQuery.autoRenewPeriod._toProtobuf().seconds.toString(),
                topicAutoRenewAccountId: topicInfoQuery.autoRenewAccountId ? topicInfoQuery.autoRenewAccountId.toString() : topicInfoQuery.autoRenewAccountId,
            }, error: false, message: "Topic info fetched"
        }
    } catch (err) {
        console.log("ERROR", err)
        return { result: undefined, error: true, message: `Error while fetching topic info - ${err}` }
    }
}