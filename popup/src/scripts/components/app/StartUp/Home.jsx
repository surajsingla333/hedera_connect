import React, { Component } from 'react'
import { Form, Card, Button, Container, Row, Col, Dropdown } from 'react-bootstrap'

import { connect } from 'react-redux'

import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES'

import { getBalance } from '../../../../../../API/src/getBalance/getBalance'
import { associateToken } from '../../../../../../API/src/associateToken/associateToken'

import SendFunds from '../Transaction/SendFunds'

import Cookies from 'js-cookie'

import { inThirtyMinutes } from '../../utils/constants'

import { SEND_TO_CONTENT } from '../../../../../../event/src/types/sendToContent'
import { CHANGE_VIEW } from '../../../../../../event/src/types/gotoView'

import { HBAR, TINY_HBAR, toTinyHbar, toHbar } from '../../utils/constants'

import { SendFundsPath, SendTokensPath, SET_NEW_BALANCE_IN_HOME } from '../../utils/constants'

class Home extends Component {
    state = {
        tokenType: HBAR,
        balance: 0.0,
        DATA: JSON.parse(localStorage.getItem("DATA")),
        allTokens: [],
        showTokenAssociation: false,
        error: false,
        errorMessage: "",
        associationSuccess: false,
        associationMessage: ''
    }

    updateBalanceFromHeader = (e) => {
        console.log("E", e)
        this.updateBalance(this.state.tokenType)
    }

    async componentDidMount() {
        document.addEventListener(SET_NEW_BALANCE_IN_HOME, this.updateBalanceFromHeader)
        const { DATA } = this.state
        if (DATA && DATA.listTokensSymbols.length) {
            this.setState({ allTokens: DATA.tokens })
        }
        console.log('PROPS IN HOME', this.props);
        try {
            let res = await this.getAccBalance()
            console.log("{RES BALANCE", res)
            const { balance, tokensBalance } = res.result
            console.log("BALANCES IN HEADERSSSSSSSSSSSSSSS", balance, tokensBalance, JSON.parse(tokensBalance))
            let newBalance = {
                balance,
                tokensBalance: JSON.parse(tokensBalance)
            }

            console.log("NEW BALANCE", newBalance)
            // balances.tokenBalance = JSON.parse(balances.tokenBalance)
            Cookies.set("balance", newBalance, {
                expires: inThirtyMinutes
            });
            this.setState({
                balance: res.result.balance
            })
        }
        catch {
            Cookies.set("balance", 0.0, {
                expires: inThirtyMinutes
            });
            this.setState({
                balance: 0.0
            })
        }
        this.props.sendAccountToContent({ accountId: Cookies.get('accountId'), accountName: Cookies.get('name') });
        this.setState({
            update: this.props.update,
        })
    }

    componentWillUnmount() {
        document.removeEventListener(SET_NEW_BALANCE_IN_HOME, this.updateBalanceFromHeader)
    }

    render() {
        return (
            <div>
                {this.mainCard()}
            </div>
        )
    }

    getAccBalance = async () => {

        try {
            let pass = Cookies.get('password')

            let private_key = decryptKeys(Cookies.get('privateKey'), pass)

            let res = await getBalance(Cookies.get('accountId'), private_key)
            if (!res.error)
                return res;
            else
                return res;
        }
        catch (error) {
            console.log("ERROR in home getAccBalance", error)
            return error;
        }
    }

    onTokenChange = async (e) => {
        e.preventDefault(e);
        this.updateBalance(e.target.value)
    }

    updateBalance = (newTokenType) => {
        const { tokenType, balance } = this.state;

        const balanceInCookie = JSON.parse(Cookies.get('balance'))

        const tokenTypeTrimmed = newTokenType.trim()

        console.log("tokenType", newTokenType)
        if (newTokenType === HBAR) {
            let newBalance = balanceInCookie.balance
            this.setState({
                tokenType: newTokenType, balance: newBalance, showTokenAssociation: false, error: false, errorMessage: "", associationSuccess: false,
                associationMessage: ''
            }, () => console.log("STATe", this.state));
        } else if (newTokenType === TINY_HBAR) {
            let newBalance = toTinyHbar(balanceInCookie.balance)
            this.setState({
                tokenType: newTokenType, balance: newBalance, showTokenAssociation: false, error: false, errorMessage: "", associationSuccess: false,
                associationMessage: ''
            }, () => console.log("STATe", this.state));
        } else {
            if (balanceInCookie.tokensBalance[`${tokenTypeTrimmed}`] !== undefined)
                this.setState({
                    tokenType: newTokenType, balance: balanceInCookie.tokensBalance[`${tokenTypeTrimmed}`], showTokenAssociation: false, error: false, errorMessage: "", associationSuccess: false,
                    associationMessage: ''
                }, () => console.log("STATe", this.state));
            else
                this.setState({
                    tokenType: newTokenType, balance: 0, showTokenAssociation: true, error: false, errorMessage: "", associationSuccess: false,
                    associationMessage: ''
                }, () => console.log("STATe", this.state));
        }
    }

    getTokenName = (tokenType) => {
        const { allTokens } = this.state;
        if (tokenType === TINY_HBAR || tokenType === HBAR)
            return { tokenSymbol: "Hbar" }
        else {
            let thisToken = allTokens.filter((t) => t.tokenId === tokenType)
            return thisToken[0]
        }
    }

    getAssociation = async (_token) => {

        try {
            let pass = Cookies.get('password')

            let private_key = decryptKeys(Cookies.get('privateKey'), pass)

            let res = await associateToken(Cookies.get('accountId'), private_key, _token)
            console.log("RES", res)
            if (!res.error) {
                console.log("RES", res)
                const { result } = res
                if (result.transactionSuccess) {
                    this.setState({
                        showTokenAssociation: false,
                        error: false,
                        errorMessage: res.message,
                        associationSuccess: true,
                        associationMessage: "Token is now associated with this account"
                    })
                } else {
                    console.log("ERROR", res.message)
                    let msg = res.message.toString()
                    console.log("ERROR fgdddddddddddd", mes)
                    if (msg.includes('TokenAlreadyAssociatedToAccount'))
                        this.setState({
                            showTokenAssociation: false,
                            error: false,
                            errorMessage: res.message,
                            associationSuccess: true,
                            associationMessage: "Token is now associated with this account"
                        })
                    else
                        this.setState({
                            showTokenAssociation: true,
                            error: true,
                            errorMessage: res.message,
                            associationSuccess: false,
                            associationMessage: ''
                        })
                }
            }
            else {
                console.log("ERROR", res.message)
                // let msg = JSON.stringify(res.message)
                // console.log("ERROR fgdddddddddddd", mes)
                if (`${res.message}`.includes('TokenAlreadyAssociatedToAccount'))
                    this.setState({
                        showTokenAssociation: false,
                        error: false,
                        errorMessage: res.message,
                        associationSuccess: true,
                        associationMessage: "Token is now associated with this account"
                    })
                else
                    this.setState({
                        showTokenAssociation: true,
                        error: true,
                        errorMessage: res.message,
                        associationSuccess: false,
                        associationMessage: ''
                    })
            }
        }
        catch (error) {
            this.setState({
                showTokenAssociation: true,
                error: true,
                errorMessage: error,
                associationSuccess: false,
                associationMessage: ''
            })
        }
    }


    mainCard() {
        const { tokenType, balance, allTokens, showTokenAssociation } = this.state;
        let tokenToSend = this.getTokenName(tokenType)
        return (
            <Card className="m_10 text_align_center z_100000 bg_transparent">
                <Card.Body>
                    <Card.Title>{Cookies.get('name')}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>
                        {Cookies.get('accountId')}
                    </Card.Subtitle>
                    <Card.Subtitle className='mb-2 text-muted'>
                        <Row className="pt_10">
                            <Col>
                                {balance}
                            </Col>
                            <Col>
                                <Form onChange={this.onTokenChange}>
                                    <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                                        <Form.Control as="select" value={tokenType} size="sm" custom>
                                            <option value={`${HBAR}`}>Hbar</option>
                                            <option value={`${TINY_HBAR}`}>Tiny Hbar</option>
                                            {allTokens.length && allTokens.map(token => {
                                                return (
                                                    <option value={`${token.tokenId}`}>{token.tokenSymbol}</option>
                                                )
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Subtitle>
                    <hr></hr>
                    <Card.Text>

                        <Container>
                            <Row className="m_5">
                                <Col>
                                    <Button
                                        variant='primary'
                                        onClick={e => {
                                            if (tokenType === TINY_HBAR || tokenType === HBAR)
                                                this.props.changeView({ newView: SendFundsPath })
                                            else {
                                                console.log("Token to send", tokenToSend)
                                                this.props.changeView({ newView: SendTokensPath, tokenToSend: tokenToSend })
                                            }
                                        }}
                                    >
                                        Send {tokenToSend.tokenSymbol}</Button>
                                </Col>
                            </Row>
                            {showTokenAssociation &&
                                <Row className="m_5">
                                    <Col>
                                        <Button
                                            variant='primary'
                                            onClick={e => {
                                                this.getAssociation(tokenToSend.tokenId)
                                            }}
                                        >
                                            Associate token with this account</Button>
                                    </Col>
                                </Row>

                            }
                            {this.state.error ? (
                                <Form.Control.Feedback type="invalid" className="text_align_left font-10">
                                    {this.state.errorMessage}
                                </Form.Control.Feedback>
                            ) : (
                                    <div></div>
                                )}
                            {this.state.associationSuccess ? (
                                <Form.Control.Feedback type="success" className="text-success font-10">
                                    {this.state.associationMessage}
                                </Form.Control.Feedback>
                            ) : (
                                    <div></div>
                                )}
                        </Container>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

}

const mapStateToProps = state => {
    return {
        data: state.getLocalStorage,
        hashArray: state.saveWallet.hashArray,
        update: state.updateState.update,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendAccountToContent: newState => dispatch({ type: SEND_TO_CONTENT, state: newState }),
        changeView: newState => dispatch({ type: CHANGE_VIEW, state: newState })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


9606.85383171