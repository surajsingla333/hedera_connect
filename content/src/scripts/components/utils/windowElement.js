import { ALLOW_CLIENT_ACCESS, CALL_TO_SIGN_TRANSACTION, SEND_TO_SIGN_TRANSACTION, SIGN_MESSAGE } from './EventConstants';

export const generateWindowHederaElement = (account, value) => {
    return `window.hedera = {

        isHedera: ` + JSON.stringify(account.currentAccountId ? true : false) + `,
        account: ` + JSON.stringify(account) + `,
        value: ` + JSON.stringify(value) + `,

        allowClient: function(data) {
            console.log("inside allowClient")

            let event = new CustomEvent( ` + JSON.stringify(ALLOW_CLIENT_ACCESS) + `, {detail: data});
            document.dispatchEvent(event);
             return "allow_client_access";
        },

        callContract: function(address, functionName, params, data){
            console.log("inside callContract")
            if(address && functionName && (!params || (params && typeof params === 'object' && params.length > 0))) {
                let event = new CustomEvent( ` + JSON.stringify(CALL_TO_SIGN_TRANSACTION) + `, {detail: {address, functionName, params, data}});
                document.dispatchEvent(event);
                return "call_to_sign_transaction";
            } else {
                console.log("wrong params")
                return "wrong parameters to call the contract"
            }
            
        },

        sendContract: function(address, functionName, params, data){
            console.log("inside sendContract")
            if(address && functionName && (!params || (params && typeof params === 'object' && params.length > 0))){
                let event = new CustomEvent( ` + JSON.stringify(SEND_TO_SIGN_TRANSACTION) + `, {detail: {address, functionName, params, data}});
                document.dispatchEvent(event);
                return "send_to_sign_transaction";
            } else{
                console.log(address, functionName, params, typeof params)
                console.log("wrong params")
                return "wrong parameters to send to contract"
            }
            
        },

        signMessage: function(topicId, topicMemo, message, data){
            console.log("inside signMessage")
            if(message && message !== "" && ((topicId && topicId !== "") || (topicMemo && topicMemo !== ""))) {
                let event = new CustomEvent( ` + JSON.stringify(SIGN_MESSAGE) + `, {detail: {topicId, topicMemo, message, data}});
                document.dispatchEvent(event);
                return "sign_message";
            } else {
                console.log(topicId, topicMemo, message, data)
                console.log("wrong params")
                return "wrong parameters to sign message"
            }
            
        },

      };`
}