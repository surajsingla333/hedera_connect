import React, { Component } from 'react'
import { connect } from 'react-redux'

import Cookies from 'js-cookie';

import { generateWindowHederaElement } from '../utils/windowElement'
import { ALLOW_CLIENT_ACCESS, CALL_TO_SIGN_TRANSACTION, SEND_TO_SIGN_TRANSACTION } from '../utils/EventConstants'
import { GRANT_CLIENT_ACCESS, CALL_SMART_CONTRACT, SEND_SMART_CONTRACT } from '../../../../../utils/constants/FunctionsType'
import { CALL_FUNCTION, RESET_CONTENT_ACTIONS } from '../../../../../event/src/types/content/callText'


class App extends Component {
    state = {
        account: this.props.currentAccount,
        value: "ME VALUE",
    }


    componentWillMount() { }

    componentDidMount() {


        document.addEventListener('my_event', async (e) => {
            console.log("GETTING E", e);
            await this.callEvent(e.detail);
        })

        document.addEventListener('transfer', async (e) => {
            console.log("GETTING E", e);
            await this.transfer(e.detail);
        })
        document.addEventListener('invoke', async (e) => {
            console.log("GETTING E", e);
            await this.invoke(e.detail);
        })
        document.addEventListener('send', async (e) => {
            console.log("GETTING E", e);
            await this.send(e.detail);
        })
        document.addEventListener(ALLOW_CLIENT_ACCESS, (e) => {
            console.log("GETTING E in client access", e);
            this.getClientAccess(e)
        })

        document.addEventListener(CALL_TO_SIGN_TRANSACTION, (e) => {
            console.log("GETTING E in singing transaction", e);
            this.callSmartContract(e.detail)
        })

        document.addEventListener(SEND_TO_SIGN_TRANSACTION, (e) => {
            console.log("GETTING E in singing transaction in send", e);
            this.sendSmartContract(e.detail)
        })

        const { account, value } = this.state;

        let elt = document.createElement('script');

        elt.innerHTML = generateWindowHederaElement(account, value)

        document.head.appendChild(elt)

        console.log("CONTENT")
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.account !== this.props.currentAccount)
            this.setState({
                account: this.props.currentAccount
            }, () => {
                const { account, value } = this.state;
                let elt = document.createElement('script');
                elt.innerHTML = generateWindowHederaElement(account, value)
                document.head.appendChild(elt)
            })
    }

    getClientAccess = (e) => {
        console.log("E", e)
        this.props.sendFunction({ type: GRANT_CLIENT_ACCESS, dataFromWeb: {} });
    }

    callSmartContract = (e) => {
        console.log(e)
        this.props.sendFunction({ type: CALL_SMART_CONTRACT, dataFromWeb: e });
        // await this.props.operationID;
        // return "VALUE";
        // return new Promise(function (resolve, reject) {
        let intervalId = setInterval(() => {
            const { contentActions } = this.props
            const { dataToWeb, actionToWeb } = contentActions
            console.log("DATATOWEB ", dataToWeb, "\n actoToWeb", actionToWeb)
            if (actionToWeb && Object.keys(dataToWeb).length > 0) {
            console.log("DATATOWEB ", dataToWeb, "\n actoToWeb", actionToWeb)

                let event = new CustomEvent("smartContractResponseOfCall", { detail: dataToWeb });
                document.dispatchEvent(event);
                this.props.resetContentActions({});
                clearInterval(intervalId);
            }
        }, 1000);
    }

    sendSmartContract = (e) => {
        console.log(e)
        this.props.sendFunction({ type: SEND_SMART_CONTRACT, dataFromWeb: e });
        // await this.props.operationID;
        // return "VALUE";
        // return new Promise(function (resolve, reject) {
        let intervalId = setInterval(() => {
            const { contentActions } = this.props
            const { dataToWeb, actionToWeb } = contentActions
            console.log("DATATOWEB ", dataToWeb, "\n actoToWeb", actionToWeb)
            if (actionToWeb && Object.keys(dataToWeb).length > 0) {
            console.log("DATATOWEB ", dataToWeb, "\n actoToWeb", actionToWeb)

                let event = new CustomEvent("smartContractResponseOfSend", { detail: dataToWeb });
                document.dispatchEvent(event);
                this.props.resetContentActions({});
                clearInterval(intervalId);
            }
        }, 1000);
    }

    barCall1(v) {
        console.log("INSIDE BAR CALL1");
        console.log(v, this.state);
    }

    async barCall(v) {
        console.log("INSIDE BAR CALL", v);
        return "PROMISE";
    }

    async transfer(data) {

        // this.setState({ functionType: 'transfer', functionValue: data });
        console.log("GOT DATA", data);
        // console.log('EVENT Call')
        // this.props.sendFunction(this.state);
        // // await this.props.operationID;
        // // return "VALUE";
        // // return new Promise(function (resolve, reject) {
        // let intervalId = setInterval(() => {
        //     if (this.props.operationID) {
        //         let event = new CustomEvent("transferResponse", { detail: this.props.operationID });
        //         document.dispatchEvent(event);
        //         this.props.refreshOperation(this.state);
        //         clearInterval(intervalId);
        //     }
        // }, 1000);

    }

    async send(data) {

        // this.setState({ functionType: 'sendFunction', functionValue: data });
        console.log("GOT DATA", data);
        // console.log('EVENT Call')
        // this.props.sendFunction(this.state);
        // // await this.props.operationID;
        // // return "VALUE";
        // // return new Promise(function (resolve, reject) {
        // let intervalId = setInterval(() => {
        //     if (this.props.operationID) {
        //         let event = new CustomEvent("sendResponse", { detail: this.props.operationID });
        //         document.dispatchEvent(event);
        //         this.props.refreshOperation(this.state);
        //         clearInterval(intervalId);
        //     }
        // }, 1000);

    }

    async invoke(data) {

        // this.setState({ functionType: 'contractInvoke', functionValue: data });
        console.log("GOT DATA", data);
        // console.log('EVENT Call')
        // this.props.sendFunction(this.state);
        // // await this.props.operationID;
        // // return "VALUE";
        // // return new Promise(function (resolve, reject) {
        // let intervalId = setInterval(() => {
        //     if (this.props.operationID) {
        //         let event = new CustomEvent("invokeResponse", { detail: this.props.operationID });
        //         document.dispatchEvent(event);
        //         this.props.refreshOperation(this.state);
        //         clearInterval(intervalId);
        //     }
        // }, 1000);

    }

    async callEvent(v) {
        // this.setState({ functionType: 'message', functionValue: v });
        console.log("GOT DATA", v)
        // console.log('EVENT Call')
        // this.props.sendFunction(this.state);
        // // await this.props.operationID;
        // // return "VALUE";
        // // return new Promise(function (resolve, reject) {
        // let intervalId = setInterval(() => {
        //     if (this.props.operationID) {
        //         let event = new CustomEvent("bar", { detail: this.props.operationID });
        //         document.dispatchEvent(event);
        //         this.props.refreshOperation(this.state);
        //         clearInterval(intervalId);
        //     }
        // }, 1000);
        // });

        // alert('SECOND ALERT')
    }

    render() {
        const { currentAccount } = this.props
        return (
            <div>
                {/* <h1>Account: {currentAccount.currentAccountId}, {currentAccount.currentAccountName}</h1> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentAccount: state.sendToContent,
        contentActions: state.contentActions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendFunction: newState => dispatch({ type: CALL_FUNCTION, state: newState }),
        resetContentActions: newState => dispatch({ type: RESET_CONTENT_ACTIONS, state: newState }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
