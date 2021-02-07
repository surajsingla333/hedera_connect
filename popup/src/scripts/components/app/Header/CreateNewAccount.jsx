import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Card, ToggleButton, ButtonGroup } from 'react-bootstrap';

import { connect } from 'react-redux';

import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES'
import { encryptKeys } from '../../../../../../API/src/encryption/encryptAES';

import Body from '../Body';
import Cookies from 'js-cookie';

import { generateAccount } from '../../../../../../API/src/generateAccount/generateAccount'
import { getBalance } from '../../../../../../API/src/getBalance/getBalance'
import { STORE_ACCOUNT } from '../../../../../../event/src/types/storeAccounts'

import { inThirtyMinutes } from '../../utils/constants'
import { HBAR, TINY_HBAR, toTinyHbar, toHbar } from '../../utils/constants'

import { HomePath } from '../../utils/constants'
import { CHANGE_VIEW } from '../../../../../../event/src/types/gotoView'
import { SEND_TO_CONTENT } from '../../../../../../event/src/types/sendToContent'
class CreateNewAccount extends Component {
    state = {
        click: false,
        error: false,
        gotoBody: false,
        showAccount: false,
        DATA: JSON.parse(localStorage.getItem("DATA")),
        initialAmount: 0,
        account: {},
        error: false,
        errorMessage: "",
        valueType: TINY_HBAR
    }



    componentDidMount() { }

    createAcoount = async (e) => {
        e.preventDefault()
        this.setState({
            click: true
        })
        const { initialAmount, DATA, valueType } = this.state

        try {
            let pass = Cookies.get('password')

            let private_key = decryptKeys(Cookies.get('privateKey'), pass)

            console.log("PROVATe", private_key)

            let amountToSend = valueType === TINY_HBAR ? initialAmount : toTinyHbar(initialAmount)

            let res = await generateAccount(Cookies.get('accountId'), private_key, amountToSend)
            console.log("RES", res)
            if (!res.error) {

                const { accountId, privateKey, publicKey } = res.result

                let pub = encryptKeys(publicKey, pass);
                let priv = encryptKeys(privateKey, pass);

                console.log("SENDING", this.state);

                this.props.addAccountWithPK({
                    privateKey: priv,
                    publicKey: pub,
                    accountId: accountId,
                    DATA: DATA
                });

                Cookies.set("password", pass, {
                    expires: inThirtyMinutes
                });
                Cookies.set("accountId", accountId, {
                    expires: inThirtyMinutes
                });
                Cookies.set("publicKey", pub, {
                    expires: inThirtyMinutes
                });
                Cookies.set("privateKey", priv, {
                    expires: inThirtyMinutes
                });
                Cookies.set("name", `ACCOUNT ${(this.state.DATA.listAccountsNames.length) + 1}`, {
                    expires: inThirtyMinutes
                });

                this.props.sendAccountToContent({ accountId: accountId, accountName: `ACCOUNT ${(this.state.DATA.listAccountsNames.length) + 1}` })
                this.setState({
                    showAccount: true,
                    account: { ...res.result }
                });
            }
            else {
                this.setState({
                    error: true,
                    errorMessage: res.message
                })
            }
        }
        catch (error) {
            console.log("ERROR while generating new acc", error)
            this.setState({
                error: true,
                errorMessage: error
            })
        }

    }

    render() {

        if (this.state.showAccount === true)
            return (this.showAccDetails())
        else
            return (this.main())
    }


    handleChange = (key, value) => {
        this.setState({
            [key]: value
        }, () => { console.log(this.state) })
    }

    setValueType = (e) => {
        e.preventDefault()
        console.log("E", e.target.value)
        this.setState({
            valueType: e.target.value,
            amount: 0
        })
    }

    showAccDetails() {

        const { accountId, privateKey, publicKey } = this.state.account;

        return (
            <Card className="m_10 z_100000 bg_transparent">
                <Card.Body className="p_10">
                    <Card.Title className='mb-2 text-muted text_align_center'>New account details</Card.Title>
                    <Card.Text>
                        <Row>
                            <Col>
                                <p className="text_align_left font-14 mt_10 mb_5"><span className="font-weight-600">Account id - </span> {accountId}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text_align_left font-14 mt_10 mb_5"><span className="font-weight-600">Public Key - </span> {publicKey}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text_align_left font-14 mt_10 mb_5"><span className="font-weight-600">Private key - </span> {privateKey}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button className="mt_10 mb_5" variant="primary" onClick={() => {
                                    this.props.sendAccountToContent({ accountId: Cookies.get('accountId'), accountName: Cookies.get('name') })
                                    this.props.changeView({ newView: HomePath })
                                }}>
                                    Goto home
          </Button></Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
    main() {
        const { valueType } = this.state

        return (
            <Card className="m_10 z_100000 bg_transparent">
                <Card.Body>
                    <Card.Subtitle className='mb-2 text-muted text_align_center'>Enter the amount you want to send to the new account</Card.Subtitle>
                    <Card.Text>
                        <Form onSubmit={this.createAcoount}>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control
                                    type='number'
                                    placeholder={`Enter amount in ${valueType}`}
                                    onChange={(e) => { this.handleChange('initialAmount', e.target.value) }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <ButtonGroup toggle>
                                    <ToggleButton
                                        type="radio"
                                        variant="secondary"
                                        name="radio"
                                        value={TINY_HBAR}
                                        checked={TINY_HBAR === valueType}
                                        onChange={this.setValueType}
                                        className="font-14 width_86_px"
                                    >
                                        Tiny Hbar
                                        </ToggleButton>
                                    <ToggleButton
                                        type="radio"
                                        variant="secondary"
                                        name="radio"
                                        value={HBAR}
                                        checked={HBAR === valueType}
                                        onChange={this.setValueType}
                                        className="font-14 width_86_px"
                                    >
                                        Hbar
                                        </ToggleButton>
                                </ButtonGroup>
                            </Form.Group>
                            {this.state.error ? (
                                <Form.Control.Feedback type="invalid" className="text_align_left font-10">
                                    {this.state.errorMessage}
                                </Form.Control.Feedback>
                            ) : (
                                    <div></div>
                                )}

                            <hr></hr>
                            <Button variant="primary" type="submit">
                                Submit
          </Button>
                        </Form>

                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }

}



const mapStateToProps = (state) => {
    return {
        data: state.getLocalStorage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendAccountToContent: newState => dispatch({ type: SEND_TO_CONTENT, state: newState }),
        addAccountWithPK: (newState) => dispatch({ type: STORE_ACCOUNT, state: newState }),
        changeView: newState => dispatch({ type: CHANGE_VIEW, state: newState })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewAccount);