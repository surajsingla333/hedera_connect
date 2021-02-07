import { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction, ContractFunctionParameters, ContractCallQuery, AccountId, ContractId, ContractExecuteTransaction } from "@hashgraph/sdk";

export const sendSmartContract = async (_accountId, _privateKey, _contractId, _functionName, _params, _gas = 5000, _txnFee = 2) => {

    try {

        console.log("INSIDE FN", _accountId, _privateKey, _contractId, _functionName, _params, _gas, _txnFee)
        // Create our connection to the Hedera network
        // The Hedera JS SDK makes this reallyyy easy!
        const client = Client.forTestnet();

        client.setOperator(_accountId, _privateKey);

        const privateKey = PrivateKey.fromString(_privateKey)
        const publicKey = privateKey.publicKey;
        const accountId = AccountId.fromString(_accountId)


        let contractId = ContractId.fromString(_contractId)

        // _params should be array
        let param = undefined
        if (_params) {
            param = new ContractFunctionParameters;
            _params.map((r) => param.addString(r))
        }


        console.log("INSIDE FN begor query", accountId, privateKey, contractId, _functionName, param, _gas, _txnFee)

        const query2 = new ContractExecuteTransaction()
            .setContractId(contractId)
            .setGas(_gas)
            .setFunction(_functionName, param);

        //Sign with the client operator private key to pay for the query2 and submit the query2 to a Hedera network
        const contractFunctionResult = await query2.execute(client);

        // const contractRes = contractFunctionResult.getString()

        console.log(contractFunctionResult);
        // console.log("contract res in string", contractRes);

        try {
            const record = await contractFunctionResult.getRecord(client)
            return { result: { response: contractFunctionResult, record: record }, error: false, message: "Contract called successfully" }
        } catch (err) {
            console.log("ERR IN record", err)
            return { result: { response: contractFunctionResult, record: null }, error: false, message: `Contract called successfully but no record fetched with error - ${err}` }
        }
    } catch (err) {
        console.log("ERROR", err)
        return { result: undefined, error: true, message: `Error while contract calling ${err}` }
    }
}
