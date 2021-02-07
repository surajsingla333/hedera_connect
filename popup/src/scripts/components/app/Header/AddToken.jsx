import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

import { connect } from 'react-redux';

import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES'
import { encryptKeys } from '../../../../../../API/src/encryption/encryptAES';

import Cookies from 'js-cookie';

import { checkTokenDetails } from '../../../../../../API/src/checkTokenDetails/checkTokenDetails'
import { STORE_ACCOUNT } from '../../../../../../event/src/types/storeAccounts'

import { inThirtyMinutes } from '../../utils/constants'

import { HomePath } from '../../utils/constants'
import { CHANGE_VIEW } from '../../../../../../event/src/types/gotoView'
import { SEND_TO_CONTENT } from '../../../../../../event/src/types/sendToContent'
import { ADD_NEW_TOKEN } from '../../../../../../event/src/types/localStorageUpdate'

class AddToken extends Component {
    state = {
        DATA: JSON.parse(localStorage.getItem("DATA")),
        tokenId: 0,
        tokenSymbol: "",
        tokenName: "",
        error: false,
        errorMessage: ""
    }

    componentDidMount() { }

    addToken = async (e) => {

        e.preventDefault()

        const { tokenId, tokenSymbol, tokenName, DATA } = this.state

        if (tokenId !== "" && tokenSymbol !== "" && tokenName !== "") {

            try {
                let pass = Cookies.get('password')

                let private_key = decryptKeys(Cookies.get('privateKey'), pass)

                let res = await checkTokenDetails(Cookies.get('accountId'), private_key, tokenId, tokenName, tokenSymbol)
                console.log("RES", res)
                if (!res.error) {
                    const { correctTokenDetails, correctTokenDetailsMessage } = res.result
                    if (correctTokenDetails) {
                        this.props.setTokenInData({
                            DATA: DATA, tokenId: tokenId, tokenName: tokenName, tokenSymbol: tokenSymbol
                        });
                        this.props.changeView({ newView: HomePath })
                    } else {
                        console.log("wonrg token details given")
                        console.log(correctTokenDetailsMessage)
                        this.setState({
                            error: true,
                            errorMessage: correctTokenDetailsMessage
                        })
                    }
                }
                else {
                    console.log("ERROR while adding esixting token res.message, query fail", res.message)
                    this.setState({
                        error: true,
                        errorMessage: res.message
                    })
                }
            }
            catch (error) {
                console.log("ERROR while calling the query", error)
                this.setState({
                    error: true,
                    errorMessage: error
                })
            }
        }
        else {
            console.log("Empty values not allowed")
            this.setState({
                error: true,
                errorMessage: "Empty values not allowed"
            })
        }
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
                    <Card.Subtitle className='mb-2 text-muted text_align_center'>Add an existing token</Card.Subtitle>
                    <Card.Text>
                        <Form onSubmit={this.addToken}>
                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label>Token ID</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Token ID (x.y.z)'
                                    onChange={(e) => { this.handleChange('tokenId', e.target.value) }}
                                />
                            </Form.Group>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddToken);