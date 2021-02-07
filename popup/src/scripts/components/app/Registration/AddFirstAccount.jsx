import React, { Component } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'

import { connect } from 'react-redux'

import Password from './Password'

import { SAVE_ACCOUNT } from '../../../../../../event/src/types/account'

import { PasswordPath } from '../../utils/constants'
import { CHANGE_VIEW } from '../../../../../../event/src/types/gotoView'
import { SEND_TO_CONTENT } from '../../../../../../event/src/types/sendToContent'
import { checkAccountDetails } from '../../../../../../API/src/checkAccountDetails/checkAccountDetails'

class AddFirstAccount extends Component {

    state = {
        privateKey: '',
        publicKey: '',
        accountId: '',
        error: false,
        errorMessage: ""
    }

    componentDidMount() { }

    addAccount = async (e) => {
        e.preventDefault()

        console.log('THIS PROPS', this.props)

        const { accountId, publicKey, privateKey } = this.state

        if (privateKey !== "" && publicKey !== "" && accountId !== "") {
            try {

                let res = await checkAccountDetails(accountId, publicKey, privateKey)

                if (!res.error) {

                    const { result } = res;
                    if (result.keysVerified) {

                        this.props.initialSignup({ accountId, publicKey, privateKey })
                        this.props.changeView({ newView: PasswordPath })

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
        this.setState({ gotoPassword: true })
    }

    render() {
        return <div>{this.main()}</div>
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
                    <Card.Title className='mb-2 text-muted text_align_center'>Fill your account details</Card.Title>
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
                                Submit
                    </Button>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        sendAccountToContent: newState => dispatch({ type: SEND_TO_CONTENT, state: newState }),
        initialSignup: newState => dispatch({ type: SAVE_ACCOUNT, state: newState }),
        changeView: newState => dispatch({ type: CHANGE_VIEW, state: newState })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFirstAccount)