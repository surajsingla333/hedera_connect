import React, { Component } from 'react';
import { Form, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { checkHash } from '../../../../../../API/src/encryption/encryptBcrypt';
import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES';
import Home from './Home';
import Cookies from 'js-cookie';

import { inThirtyMinutes } from '../../utils/constants'
import { HomePath } from '../../utils/constants'
import { CHANGE_VIEW } from '../../../../../../event/src/types/gotoView'
import { SEND_TO_CONTENT } from '../../../../../../event/src/types/sendToContent'

class Login extends Component {
    state = {
        passHash: "",
        salt: "",
        password: '',
        wrongPassword: false,
    }


    componentDidMount() {

        this.setState({
            passHash: this.props.data.passwordHash,
            salt: this.props.data.salt,
        })

    }

    login = (e) => {
        e.preventDefault()

        console.log("LOGGING IN");

        const { password, passHash, salt } = this.state

        let hash = checkHash(password, salt);

        console.log("HASH", hash, passHash, hash === passHash);

        if (hash === passHash) {


            Cookies.set("password", password, {
                expires: inThirtyMinutes
            });
            Cookies.set("accountId", this.props.data.accounts[0].accountId, {
                expires: inThirtyMinutes
            });
            Cookies.set("publicKey", this.props.data.accounts[0].publicKey, {
                expires: inThirtyMinutes
            });
            Cookies.set("privateKey", this.props.data.accounts[0].privateKey, {
                expires: inThirtyMinutes
            });
            Cookies.set("name", this.props.data.accounts[0].name, {
                expires: inThirtyMinutes
            });

            this.props.sendAccountToContent({ accountId: this.props.data.accounts[0].accountId, accountName: this.props.data.accounts[0].name })
            this.props.changeView({ newView: HomePath })

        }
        else {
            this.setState({wrongPassword: true})
        }

    }



    render() {
        return (
            <Card className="m_10 text_align_center z_100000 bg_transparent">
                <Card.Body>
                    <Card.Title>Saral Wallet</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Login</Card.Subtitle>
                    <Card.Text>

                        <Container>
                            <Row>
                                <Col>
                                    <Form onSubmit={this.login}>
                                        <Form.Group controlId="input">
                                            <Form.Label>Enter your password</Form.Label>
                                            <Form.Control type="password" placeholder="Your password"
                                                onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                        {this.state.wrongPassword ? (
                                            <Form.Control.Feedback type="invalid">
                                                    Wrong password
                                                </Form.Control.Feedback>
                                            ) : (
                                                <div></div>
                                                )}
                                                </Form.Group>

                                        <Button variant="primary" type="submit">Submit</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
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
        changeView: newState => dispatch({ type: CHANGE_VIEW, state: newState })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
