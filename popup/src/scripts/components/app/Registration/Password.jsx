import React, { Component } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'

import { connect } from 'react-redux'

import {
    genHash,
    checkHash
} from '../../../../../../API/src/encryption/encryptBcrypt'
import { encryptKeys } from '../../../../../../API/src/encryption/encryptAES'
import Home from '../StartUp/Home'
import Cookies from 'js-cookie'

import { SAVE_WALLET } from '../../../../../../event/src/types/storeWallet'

import { inThirtyMinutes } from '../../utils/constants'

import { HomePath } from '../../utils/constants'
import { CHANGE_VIEW } from '../../../../../../event/src/types/gotoView'
import { SEND_TO_CONTENT } from '../../../../../../event/src/types/sendToContent'

class Password extends Component {
    state = {
        ps: '',
        psc: '',
        match: true,
        gotoBody: false
    }

    componentDidMount() { }

    setPassword = () => {
        const { ps, psc } = this.state

        if (ps !== psc) {
            this.setState({ match: false })
            return 'Different passwords'
        } else {

            const { accountId, publicKey, privateKey } = this.props


            let pub = encryptKeys(publicKey, ps)
            let priv = encryptKeys(privateKey, ps)

            let hashAndSalt = genHash(ps)

            this.setState({
                privateKey: priv,
                publicKey: pub,
                accountId: accountId,
                hashArray: hashAndSalt,
            })

            this.props.storeData({
                privateKey: priv,
                publicKey: pub,
                accountId: accountId,
                hashArray: hashAndSalt,
            })

            Cookies.set('password', ps, {
                expires: inThirtyMinutes
            })
            Cookies.set('accountId', accountId, {
                expires: inThirtyMinutes
            })
            Cookies.set('publicKey', pub, {
                expires: inThirtyMinutes
            })
            Cookies.set('privateKey', priv, {
                expires: inThirtyMinutes
            })
            Cookies.set('name', 'ACCOUNT 1', {
                expires: inThirtyMinutes
            })
            Cookies.set('storeType', this.props.storeType, {
                expires: inThirtyMinutes
            })

            this.setState({
                loggedIn: true,
                gotoBody: true
            }, () => {
                this.props.sendAccountToContent({ accountId: accountId, accountName: 'ACCOUNT 1' })
                this.props.changeView({ newView: HomePath })
            })
        }
    }

    render() {
        if (this.state.gotoBody && this.state.loggedIn) {
            this.state.gotoBody = false
            return <Home />
        }
        return (
            <Card className="m_10 text_align_center z_100000 bg_transparent">
                <Card.Body>
                    <Card.Title className='mb-2 text-muted'>Set password</Card.Title>
                    <Card.Text>
                        <Form onSubmit={this.setPassword}>
                            <Form.Group controlId='input'>
                                <Form.Label>Enter your password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Your password'
                                    onChange={(e) => { this.setState({ ps: e.target.value }) }}
                                    onBlur={(e) => {
                                        this.setState({ ps: e.target.value })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId='input'>
                                <Form.Label>Re-enter your password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Must be same as above'
                                    onChange={(e) => { this.setState({ psc: e.target.value }) }}
                                    onBlur={(e) => {
                                        if (e.target.value === this.state.ps) {
                                            this.setState({ match: true })
                                            console.log('CORRECT', this.state)
                                        } else {
                                            this.setState({ match: false })
                                            console.log('WRONG', this.state)
                                        }
                                    }}
                                />
                                {!this.state.match ? (
                                    <Form.Control.Feedback type="invalid">
                                        Password does not match
                                    </Form.Control.Feedback>
                                ) : (
                                        <div></div>
                                    )}
                            </Form.Group>
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
    return {
        accountId: state.account.accountId,
        publicKey: state.account.publicKey,
        privateKey: state.account.privateKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendAccountToContent: newState => dispatch({ type: SEND_TO_CONTENT, state: newState }),
        storeData: newState => dispatch({ type: SAVE_WALLET, state: newState }),
        changeView: newState => dispatch({ type: CHANGE_VIEW, state: newState })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)
