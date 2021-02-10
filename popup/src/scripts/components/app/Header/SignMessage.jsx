import React, { Component } from 'react';
import { Form, Button, ToggleButton, ButtonGroup, Card, Col, Row } from 'react-bootstrap';

import { connect } from 'react-redux';

import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES'
import { encryptKeys } from '../../../../../../API/src/encryption/encryptAES';

import Cookies from 'js-cookie';

import { signMessage } from '../../../../../../API/src/signMessage/signMessage'
import { getBalance } from '../../../../../../API/src/getBalance/getBalance'
import { STORE_ACCOUNT } from '../../../../../../event/src/types/storeAccounts'

import { inThirtyMinutes } from '../../utils/constants'

import { HomePath } from '../../utils/constants'
import { CHANGE_VIEW } from '../../../../../../event/src/types/gotoView'
import { SEND_TO_CONTENT } from '../../../../../../event/src/types/sendToContent'
import { ADD_NEW_TOKEN } from '../../../../../../event/src/types/localStorageUpdate'

const TOPIC_MEMO = "topic_memo"
const TOPIC_ID = "topic_id"

class SignMessage extends Component {
    state = {
        DATA: JSON.parse(localStorage.getItem("DATA")),
        error: false,
        errorMessage: "",
        signingType: TOPIC_MEMO,
        topicId: undefined,
        topicMemo: '',
        userMessage: '',
        viewTopicResponse: false,
        res: {}
    }


    componentDidMount() { }

    sendMessage = async (e) => {

        e.preventDefault()

        const { signingType, userMessage, topicMemo, topicId, DATA } = this.state

        if (userMessage !== "" && (topicMemo !== "" || topicId !== "")) {

            try {
                console.log("signingType", signingType)
                let pass = Cookies.get('password')

                let private_key = decryptKeys(Cookies.get('privateKey'), pass)

                console.log("PROVATe", private_key)

                let _topicMemo = signingType === TOPIC_MEMO ? topicMemo : undefined
                let _topicId = signingType === TOPIC_MEMO ? undefined : topicId
                let _newTopic = signingType === TOPIC_MEMO ? false : true

                // _accountId, _privateKey, _topicMemo, _message, _tokenId = undefined, _newTopic = false, _gas = 5000, _txnFee = 2
                let res = await signMessage(Cookies.get('accountId'), private_key, _topicMemo, userMessage, _topicId, _newTopic)
                console.log("RES", res)
                if (!res.error) {

                    const { messageReceipt, messageTransactionHash, topicReceipt, topicId } = res.result

                    console.log("messageReceipt", messageReceipt)
                    console.log("messageTransactionHash", messageTransactionHash)
                    console.log("topicReceipt", topicReceipt)
                    console.log("topicId", topicId)

                    console.log("DATA", DATA)

                    this.setState({
                        viewTopicResponse: true,
                        res: res.result
                    })

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

        const { viewTopicResponse } = this.state

        if (viewTopicResponse)
            return this.showTopic()
        else
            return this.main()

    }


    handleChange = (key, value) => {
        this.setState({
            [key]: value
        }, () => { console.log(this.state) })
    }

    setSigningType = (e) => {
        e.preventDefault()
        console.log("E", e.target.value)
        this.setState({
            signingType: e.target.value
        })
    }

    showTopic() {
        const { res, signingType, userMessage } = this.state

        return (
            <Card className="m_10 z_100000 bg_transparent">
                <Card.Body className="p_10">
                    <Card.Title className='mb-2 text-muted text_align_center'>{signingType === TOPIC_MEMO ? 'New topic created' : 'Message added to topic'}</Card.Title>
                    <Card.Text>
                        <Row>
                            <Col>
                                <p className="text_align_left font-14 mt_10 mb_5"><span className="font-weight-600">Topic id - </span> {res.topicId}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text_align_left font-14 mt_10 mb_5"><span className="font-weight-600">Message added - </span> {userMessage}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button className="mt_10 mb_5" variant="primary" onClick={() => {
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
        const { signingType } = this.state
        return (
            <Card className="m_10 z_100000 bg_transparent">
                <Card.Body>
                    <Card.Subtitle className='mb-2 text-muted text_align_center'>Send Message</Card.Subtitle>
                    <Card.Text>
                        <Form onSubmit={this.sendMessage}>
                            <Form.Group controlId='formTopicMemoOrId'>
                                <Form.Label>{signingType === TOPIC_MEMO ? `Topic Memo` : `Topic Id`} </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder={signingType === TOPIC_MEMO ? `Enter the topic Memo` : `Enter the topic id`}
                                    onChange={(e) => { this.handleChange(`${signingType === TOPIC_MEMO ? 'topicMemo' : 'topicId'}`, e.target.value) }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <ButtonGroup toggle>
                                    <ToggleButton
                                        type="radio"
                                        variant="secondary"
                                        name="radio"
                                        value={TOPIC_MEMO}
                                        checked={signingType === TOPIC_MEMO}
                                        onChange={this.setSigningType}
                                        className="font-10 width_100_px pr_0 pl_0"
                                    >
                                        Type topic memo
                                        </ToggleButton>
                                    <ToggleButton
                                        type="radio"
                                        variant="secondary"
                                        name="radio"
                                        value={TOPIC_ID}
                                        checked={signingType === TOPIC_ID}
                                        onChange={this.setSigningType}
                                        className="font-10 width_100_px pr_0 pl_0"
                                    >
                                        Type topic id
                                        </ToggleButton>
                                </ButtonGroup>
                            </Form.Group>
                            <Form.Group controlId='formBasicEmail'>

                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder='Type you message'
                                    onChange={(e) => { this.handleChange('userMessage', e.target.value) }}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignMessage);