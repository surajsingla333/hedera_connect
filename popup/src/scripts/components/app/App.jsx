import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap'

import Body from './Body'
import Footer from './Footer'
import Header from './Header'

import CreateNewAccount from './Header/CreateNewAccount'
import AddNewAccount from './Header/AddNewAccount'
import CreateToken from './Header/CreateToken'
import AddToken from './Header/AddToken'
import SignMessage from './Header/SignMessage'
import TopicDetails from './Header/TopicDetails'

import AddFirstAccount from './Registration/AddFirstAccount'
import Password from './Registration/Password'

import Home from "./StartUp/Home";
import Signup from './StartUp/Signup'
import Login from './StartUp/Login'

import SendFunds from './Transaction/SendFunds'
import SendTokens from './Transaction/SendTokens'

import AllowAccess from './Content/AllowAccess'
import CallSmartContract from './Content/CallSmartContract'
import SendSmartContract from './Content/SendSmartContract'
import SignMessageContent from './Content/SignMessage'

import Cookies from 'js-cookie'

import './App.css';

import { UPDATE_STATE } from '../../../../../event/src/types/_updateState'
import { SEND_TO_CONTENT } from '../../../../../event/src/types/sendToContent'

import { SendTokensPath, AddTokenPath, HomePath, LoginPath, SignupPath, SendFundsPath, PasswordPath, AddFirstAccountPath, AddNewAccountPath, CreateNewAccountPath, CreateTokenPath, SignMessagePath, TopicDetailsPath } from '../utils/constants'
import { CHANGE_VIEW } from '../../../../../event/src/types/gotoView'

import { GRANT_CLIENT_ACCESS, CALL_SMART_CONTRACT, SEND_SMART_CONTRACT, SIGN_TOPIC_AND_MESSAGE } from '../../../../../utils/constants/FunctionsType'

class App extends Component {
    state = {
        accountName: Cookies.get('name') ? Cookies.get('name') : '',
        accountId: Cookies.get('accountId') ? Cookies.get('accountId') : '',
        update: false,
        DATA: JSON.parse(localStorage.getItem("DATA"))
    }
    componentWillMount() {
        console.log("HTis props", this.props)
    }

    componentDidMount() {
        const { data, gotoView, contentActions } = this.props
        this.props.sendAccountToContent(this.state);
        if (Cookies.get('name') && Cookies.get('name') !== "" && Cookies.get('password') && Cookies.get('password') !== "" && Cookies.get('password') !== undefined && Cookies.get('password') !== "undefined") { }
        else if (data && Object.keys(data).length > 0 && data.accounts.length > 0)
            this.props.changeView({ newView: LoginPath })
        else
            this.props.changeView({ newView: SignupPath })
    }

    gotoNewViewFromHeader = (view) => {
        this.props.changeView({ newView: view })
    }

    updateHome = () => {
        this.setState({
            update: Cookies.get('name'),
        }, () => {
            this.props.sendAccountToContent({ accountId: Cookies.get('accountId'), accountName: Cookies.get('name') })
            this.props.stateUpdate(this.state);
        })
    };

    render() {
        return (
            <Container
                className='text_align_center'
            >
                <Header
                    updateHome={this.updateHome}
                    gotoNewViewFromHeader={this.gotoNewViewFromHeader}
                />
                <Row>
                    <Col className="h_100">
                        <Body>
                            {this.body()}
                        </Body>
                    </Col>
                </Row>
                <Row className="fixed-bottom">
                    <Footer />
                </Row>
            </Container>
        )
    }

    body() {

        const { data, gotoView, contentActions, tokenToSend } = this.props

        console.log("TOKEN TO SEND IN APP>JS", tokenToSend)

        if (contentActions && contentActions.actionFromWeb)
            switch (contentActions.type) {
                case GRANT_CLIENT_ACCESS:
                    return <AllowAccess />
                case CALL_SMART_CONTRACT:
                    return <CallSmartContract />
                case SEND_SMART_CONTRACT:
                    return <SendSmartContract />
                case SIGN_TOPIC_AND_MESSAGE:
                    return <SignMessageContent />
                default:
                    return <Home />
            }
        else
            switch (gotoView) {
                case HomePath:
                    return <Home />
                case LoginPath:
                    return <Login />
                case SignupPath:
                    return <Signup />
                case SendFundsPath:
                    return <SendFunds />
                case SendTokensPath:
                    return <SendTokens tokenToSend={tokenToSend} />
                case PasswordPath:
                    return <Password />
                case AddFirstAccountPath:
                    return <AddFirstAccount />
                case AddNewAccountPath:
                    return <AddNewAccount />
                case CreateNewAccountPath:
                    return <CreateNewAccount />
                case CreateTokenPath:
                    return <CreateToken />
                case AddTokenPath:
                    return <AddToken />
                case SignMessagePath:
                    return <SignMessage />
                case TopicDetailsPath:
                    return <TopicDetails />
                default:
                    return <Home />
            }
    }

}

const mapStateToProps = state => {
    return {
        data: state.getLocalStorage,
        contentActions: state.contentActions,
        gotoView: state.gotoView.currentView,
        tokenToSend: state.gotoView.tokenToSend,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendAccountToContent: newState => dispatch({ type: SEND_TO_CONTENT, state: newState }),
        stateUpdate: newState => dispatch({ type: UPDATE_STATE, state: newState }),
        changeView: newState => dispatch({ type: CHANGE_VIEW, state: newState })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

"password=1234; accountId=0.0.305248;publicKey=U2FsdGVkX19XVhiN78LViGJhCdgF5hdM7hYlxqIEsh2bb8sTSGHctFEx/3Jb2uaZXPUeEs7rSe0KudKpWcgDOljDR4UD/bskeW5J16q69kHvyWRMjGfrDIQrVnTQZXq2nVAIexw1iZPjzsvb/HakRg==; privateKey=U2FsdGVkX18ZOgAf6+2MV7YG9zMcY8LPNajK8onfXU/uYnmk6DZ8mNGtcdaHOYg5/beNp7meRfTJCywPW2OWGcBuT8yfw0Uyab2lakFqy67XO0XxYam3BMB/PAGUcNzZMEyELFDkes/8TGAR+8zA7YliKuuC3SaEkqgIlg6axNE=; name=ACCOUNT%201; balance=0"