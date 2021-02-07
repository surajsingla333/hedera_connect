import { ALLOW_CLIENT_ACCESS, CALL_TO_SIGN_TRANSACTION, SEND_TO_SIGN_TRANSACTION } from './EventConstants';

export const generateWindowHederaElement = (account, value) => {
    return `window.hedera = {

        bar:function(work) {
          console.log("IN FOO:BARR");
  
          let event = new CustomEvent("my_event", {detail: work});
         document.dispatchEvent(event);
          return "APLE";
        }, 
  
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
            if(!address || !functionName || (params && typeof params !== Array)){
                console.log("wrong params")
                return "wrong parameters to call the contract"
            } else
            {
                let event = new CustomEvent( ` + JSON.stringify(CALL_TO_SIGN_TRANSACTION) + `, {detail: {address, functionName, params, data}});
                document.dispatchEvent(event);
                return "call_to_sign_transaction";
            }
        },

        sendContract: function(address, functionName, params, data){
            console.log("inside sendContract")
            if(!address || !functionName || (params && typeof params !== 'object' && params.length > 0)){
                console.log(address, functionName, params, typeof params)
                console.log("wrong params")
                return "wrong parameters to call the contract"
            } else
            {
                let event = new CustomEvent( ` + JSON.stringify(SEND_TO_SIGN_TRANSACTION) + `, {detail: {address, functionName, params, data}});
                document.dispatchEvent(event);
                return "call_to_sign_transaction";
            }
        },

        transfer:function(data) {
          console.log("IN FOO:BARR");
  
          let event = new CustomEvent("transfer", {detail: data});
         document.dispatchEvent(event);
          return "transfer";
        }, 

        invokeContract:function(data) {
          console.log("IN FOO:BARR");
          let event = new CustomEvent("invoke", {detail: data});
         document.dispatchEvent(event);
          return "invoked";
        },

        send:function(data) {
          console.log("IN FOO:BARR");
          let event = new CustomEvent("send", {detail: data});
         document.dispatchEvent(event);
          return "sent";
        },

      };`
}