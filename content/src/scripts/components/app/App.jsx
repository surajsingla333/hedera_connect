import React, { Component } from 'react'
import { connect } from 'react-redux'

import Cookies from 'js-cookie';

import { generateWindowHederaElement } from '../utils/windowElement'
import { ALLOW_CLIENT_ACCESS, CALL_TO_SIGN_TRANSACTION, SEND_TO_SIGN_TRANSACTION, SIGN_MESSAGE } from '../utils/EventConstants'
import { GRANT_CLIENT_ACCESS, CALL_SMART_CONTRACT, SEND_SMART_CONTRACT, SIGN_TOPIC_AND_MESSAGE } from '../../../../../utils/constants/FunctionsType'
import { CALL_FUNCTION, RESET_CONTENT_ACTIONS } from '../../../../../event/src/types/content/callText'


class App extends Component {
    state = {
        account: this.props.currentAccount,
        value: "ME VALUE",
    }

    componentDidMount() {

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

        document.addEventListener(SIGN_MESSAGE, (e) => {
            console.log("GETTING E in singing message", e);
            this.signTopicAndMessage(e.detail)
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

    signTopicAndMessage = (e) => {
        console.log(e)
        this.props.sendFunction({ type: SIGN_TOPIC_AND_MESSAGE, dataFromWeb: e });
        // let intervalId = setInterval(() => {
        //     const { contentActions } = this.props
        //     const { dataToWeb, actionToWeb } = contentActions
        //     console.log("DATATOWEB ", dataToWeb, "\n actoToWeb", actionToWeb)
        //     if (actionToWeb && Object.keys(dataToWeb).length > 0) {
        //     console.log("DATATOWEB ", dataToWeb, "\n actoToWeb", actionToWeb)

        //         let event = new CustomEvent("signMessageResponse", { detail: dataToWeb });
        //         document.dispatchEvent(event);
        //         this.props.resetContentActions({});
        //         clearInterval(intervalId);
        //     }
        // }, 1000);
    }

    render() {
        const { currentAccount } = this.props
        return (
            <div>
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
