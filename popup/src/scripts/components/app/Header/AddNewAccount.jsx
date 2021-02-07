import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

import { connect } from 'react-redux';

import { encryptKeys } from '../../../../../../API/src/encryption/encryptAES';
import { checkAccountDetails } from '../../../../../../API/src/checkAccountDetails/checkAccountDetails'

import Home from '../StartUp/Home';
import Cookies from 'js-cookie';

import { STORE_ACCOUNT } from '../../../../../../event/src/types/storeAccounts'

import { inThirtyMinutes, HomePath } from '../../utils/constants'

import { CHANGE_VIEW } from '../../../../../../event/src/types/gotoView'
import { SEND_TO_CONTENT } from '../../../../../../event/src/types/sendToContent'

class AddNewAccount extends Component {
    state = {
        click: false,
        error: false,
        gotoBody: false,
        DATA: JSON.parse(localStorage.getItem("DATA")),
        privateKey: '',
        publicKey: '',
        accountId: ''
    }


    componentDidMount() { }

    addAccount = async (e) => {

        e.preventDefault();

        this.setState({
            click: true
        })

        console.log("THIS PROPS", this.props);

        const { privateKey, publicKey, accountId, DATA } = this.state

        if (privateKey !== "" && publicKey !== "" && accountId !== "") {

            try {

                let res = await checkAccountDetails(accountId, publicKey, privateKey)

                console.log("RES", res)

                if (!res.error) {

                    const { result } = res;
                    if (result.keysVerified) {

                        let p = Cookies.get('password');

                        let pub = encryptKeys(publicKey, p);
                        let priv = encryptKeys(privateKey, p);

                        console.log("SENDING", this.state);

                        this.props.addNewAccountFromHeader({
                            privateKey: priv,
                            publicKey: pub,
                            accountId: accountId,
                            DATA: DATA
                        });

                        Cookies.set('accountId', accountId, {
                            expires: inThirtyMinutes
                        })
                        Cookies.set("password", p, {
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
                        this.props.changeView({ newView: HomePath })

                    } else {
                        this.setState({
                            error: true,
                            errorMessage: res.message
                        })
                    }

                } else {
                    this.setState({
                        error: true,
                        errorMessage: res.message
                    })
                }
            } catch (err) {
                this.setState({
                    error: true,
                    errorMessage: err
                })
            }

        } else {
            this.setState({
                error: true,
                errorMessage: "Empty values not allowed"
            })
        }
    }


    gotoPass() {
        this.setState({ gotoBody: true });
    }

    render() {

        return (
            <div>
                {this.main()}
            </div>
        );
    }


    handleChange = (key, value) => {
        this.setState({
            [key]: value
        }, () => { console.log(this.state) })
    }

    main() {
        return (
            <Card className="m_10 z_100000 bg_transparent">
                <Card.Body>
                    <Card.Subtitle className='mb-2 text-muted text_align_center'>Add you existing account</Card.Subtitle>
                    <Card.Text>
                        <Form onSubmit={this.addAccount}>
                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label>Account id</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter account id (x.y.z)'
                                    onChange={(e) => { this.handleChange('accountId', e.target.value) }}
                                />
                            </Form.Group>
                            <Form.Group controlId='formBasicEmail'>

                                <Form.Label>Public key</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Public key'
                                    onChange={(e) => { this.handleChange('publicKey', e.target.value) }}
                                />
                            </Form.Group>

                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label>Private key</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Private key'
                                    onChange={(e) => { this.handleChange('privateKey', e.target.value) }}
                                />
                            </Form.Group>
                            {this.state.error ? (
                                <Form.Control.Feedback type="invalid" className="text_align_left font-10">
                                    {this.state.errorMessage}
                                </Form.Control.Feedback>
                            ) : (
                                    <div></div>
                                )}

                            <hr></hr>

                            <Button variant='primary' type='submit'>
                                Submit</Button>
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
        addNewAccountFromHeader: (newState) => dispatch({ type: STORE_ACCOUNT, state: newState }),
        changeView: newState => dispatch({ type: CHANGE_VIEW, state: newState })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAccount);