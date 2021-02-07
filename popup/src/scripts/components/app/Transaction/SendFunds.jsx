import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Form, Button, Card, ToggleButton, ButtonGroup } from 'react-bootstrap'

import Cookies from 'js-cookie'

import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES'
import { transferFunds } from '../../../../../../API/src/transferFunds/transferFunds'

import Home from '../StartUp/Home';

import { HBAR, TINY_HBAR, toTinyHbar, toHbar } from '../../utils/constants'
import { HomePath } from '../../utils/constants'
import { CHANGE_VIEW } from '../../../../../../event/src/types/gotoView'


class SendFunds extends Component {
    state = {
        amount: 0,
        receiver: "",
        error: false,
        errorMessage: "",
        valueType: TINY_HBAR
    }


    componentDidMount() {
        console.log('IN SENDFUNDS PROPS', this.props)
    }

    send = async (e) => {
        e.preventDefault()
        const { amount, receiver, valueType } = this.state

        let pass = Cookies.get('password')

        let private_key = decryptKeys(Cookies.get('privateKey'), pass)

        if (amount && receiver !== "") {
            try {
                let amountToSend = valueType === TINY_HBAR ? amount : toTinyHbar(amount)
                let res = await transferFunds(Cookies.get('accountId'), private_key, receiver, amountToSend)

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

    setValueType = (e) => {
        e.preventDefault()
        console.log("E", e.target.value)
        this.setState({
            valueType: e.target.value,
            amount: 0
        })
    }


    render() {

        const { valueType } = this.state
        return (
            <Card className="m_10 z_100000 bg_transparent">
                <Card.Body>
                    <Card.Subtitle className='mb-2 text-muted'>
                        Send Amount
              </Card.Subtitle>
                    <Card.Text className="font-10 text_align_left text-warning">
                        Updated amount will be reflected after txn confirmation
              </Card.Text>
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
                            <Form.Group >
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder={`Enter amount in ${valueType}`}
                                    onChange={(e) => { this.handleChange('amount', e.target.value) }}
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

export default connect(mapStateToProps, mapDispatchToProps)(SendFunds)