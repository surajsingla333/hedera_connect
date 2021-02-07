import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

import { connect } from 'react-redux';

import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES'
import { encryptKeys } from '../../../../../../API/src/encryption/encryptAES';

import Cookies from 'js-cookie';

import { createToken } from '../../../../../../API/src/createToken/createToken'
import { getBalance } from '../../../../../../API/src/getBalance/getBalance'
import { STORE_ACCOUNT } from '../../../../../../event/src/types/storeAccounts'

import { inThirtyMinutes } from '../../utils/constants'

import { HomePath } from '../../utils/constants'
import { CHANGE_VIEW } from '../../../../../../event/src/types/gotoView'
import { SEND_TO_CONTENT } from '../../../../../../event/src/types/sendToContent'
import { ADD_NEW_TOKEN } from '../../../../../../event/src/types/localStorageUpdate'

class CreateToken extends Component {
    state = {
        DATA: JSON.parse(localStorage.getItem("DATA")),
        tokenInitialSupply: 0,
        tokenSymbol: "",
        tokenName: "",
        error: false,
        errorMessage: ""
    }

    componentDidMount() { }

    createToken = async (e) => {

        e.preventDefault()

        const { tokenInitialSupply, tokenSymbol, tokenName, DATA } = this.state

        if (tokenInitialSupply && tokenSymbol !== "" && tokenName !== "") {

            try {
                let pass = Cookies.get('password')

                let private_key = decryptKeys(Cookies.get('privateKey'), pass)

                console.log("PROVATe", private_key)

                let res = await createToken(Cookies.get('accountId'), private_key, tokenName, tokenSymbol, tokenInitialSupply)
                console.log("RES", res)
                if (!res.error) {

                    const { tokenId, tokenName, tokenSymbol, transactionResponse, receipt } = res.result

                    console.log("TOKEN ID", tokenId)
                    console.log("transactionResponse", transactionResponse)
                    console.log("receipt", receipt)

                    console.log("DATA", DATA)
                    this.props.setTokenInData({
                        DATA: DATA, tokenId: tokenId, tokenName: tokenName, tokenSymbol: tokenSymbol
                    });

                    this.props.changeView({ newView: HomePath })
                }
                else
                    this.setState({
                        error: true,
                        errorMessage: res.message
                    })
            }
            catch (error) {
                this.setState({
                    error: true,
                    errorMessage: error
                })
            }
        }
        else
            this.setState({
                error: true,
                errorMessage: "Empty values not allowed"
            })

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
                    <Card.Subtitle className='mb-2 text-muted text_align_center'>Create a new token</Card.Subtitle>
                    <Card.Text>
                        <Form onSubmit={this.createToken}>
                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label>Token name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter name of your token'
                                    onChange={(e) => { this.handleChange('tokenName', e.target.value) }}
                                />
                            </Form.Group>
                            <Form.Group controlId='formBasicEmail'>

                                <Form.Label>Token symbol</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Token symbol'
                                    onChange={(e) => { this.handleChange('tokenSymbol', e.target.value) }}
                                />
                            </Form.Group>

                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label>Initial supply</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Initial supply'
                                    onChange={(e) => { this.handleChange('tokenInitialSupply', e.target.value) }}
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
        changeView: newState => dispatch({ type: CHANGE_VIEW, state: newState }),
        setTokenInData: newState => dispatch({ type: ADD_NEW_TOKEN, state: newState })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateToken);