import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'

import Cookies from 'js-cookie'

import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES'
import { sendTokens } from '../../../../../../API/src/sendTokens/sendTokens'

import Home from '../StartUp/Home';

import { HomePath } from '../../utils/constants'
import { CHANGE_VIEW } from '../../../../../../event/src/types/gotoView'


class SendTokens extends Component {
    state = {
        amount: 0,
        receiver: "",
        error: false,
        errorMessage: ""
    }


    componentDidMount() {
        console.log('IN SENDFUNDS PROPS', this.props)
    }

    send = async (e) => {
        e.preventDefault()
        const { amount, receiver } = this.state
        const { tokenToSend } = this.props
        let pass = Cookies.get('password')
        if (amount && receiver !== "") {
            try {
                let private_key = decryptKeys(Cookies.get('privateKey'), pass)

                let res = await sendTokens(Cookies.get('accountId'), private_key, `${tokenToSend.tokenId}`, receiver, amount)

                console.log("SEND RESULT", res)

                if (!res.error) {
                    const { result } = res;
                    if (result.transactionSuccess === 1) {
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
                console.log("Error catch", err)
                this.setState({
                    error: true,
                    errorMessage: `Error in transfer - ${err}, try again`
                })
            }

        } else {
            this.setState({
                error: true,
                errorMessage: "Can't have empty values "
            })
        }
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        }, () => { console.log(this.state) })
    }


    render() {

        const { tokenToSend } = this.props

        return (
            <Container>
                <Row>
                    <Card className="m_10 z_100000 bg_transparent">
                        <Card.Body>
                            <Card.Subtitle className='mb-2 text-muted'>
                                Send {`${tokenToSend.tokenName} (${tokenToSend.tokenSymbol} with token address as ${tokenToSend.tokenId})`}
                            </Card.Subtitle>
                            <Card.Text>
                                <Form onSubmit={this.send}>
                                    <Form.Group controlId='formBasicEmail'>
                                        <Form.Label>Receiver</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Receiver account id'
                                            onChange={(e) => { this.handleChange('receiver', e.target.value) }}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Enter number of tokens to send'
                                            onChange={(e) => { this.handleChange('amount', e.target.value) }}
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
                                    <Button
                                        type='submit'
                                        variant='primary'
                                        value='activate'
                                    >
                                        Transfer
                  </Button>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        hashArray: state.saveWallet.hashArray,
        network: state.getNetwork.network
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeView: newState => dispatch({ type: CHANGE_VIEW, state: newState })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendTokens)