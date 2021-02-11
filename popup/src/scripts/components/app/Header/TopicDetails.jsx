import React, { Component } from 'react';
import { Form, Button, ToggleButton, ButtonGroup, Card, Col, Row } from 'react-bootstrap';

import { connect } from 'react-redux';

import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES'
import { encryptKeys } from '../../../../../../API/src/encryption/encryptAES';

import Cookies from 'js-cookie';

import { getMessageInTopic } from '../../../../../../API/src/getMessageInTopic/getMessageInTopic'
import { getTopicInfo } from '../../../../../../API/src/getTopicInfo/getTopicInfo'
import { getBalance } from '../../../../../../API/src/getBalance/getBalance'
import { STORE_ACCOUNT } from '../../../../../../event/src/types/storeAccounts'

import { inThirtyMinutes } from '../../utils/constants'

import { HomePath } from '../../utils/constants'
import { CHANGE_VIEW } from '../../../../../../event/src/types/gotoView'
import { SEND_TO_CONTENT } from '../../../../../../event/src/types/sendToContent'
import { ADD_NEW_TOKEN } from '../../../../../../event/src/types/localStorageUpdate'

const TOPIC_MEMO = "topic_memo"
const TOPIC_ID = "topic_id"

class TopicDetails extends Component {
    state = {
        DATA: JSON.parse(localStorage.getItem("DATA")),
        error: false,
        errorMessage: "",
        topicId: '',
        showMessages: false,
        topicMessages: [],
        showTopicInfo: false,
        topicInfo: {},
    }


    componentDidMount() { }

    getTopicMessages = async (e) => {

        e.preventDefault()

        const { topicId, DATA } = this.state

        console.log("TOPIC", topicId)
        if (topicId !== "") {

            try {

                console.log("IN TRY TOPIC", topicId)

                let res = await getMessageInTopic(topicId)
                console.log("RES", res)
                if (!res.error) {
                    console.log("NO ERROR ", res)

                    const { messages } = res.result

                    console.log("messages", messages)
                    console.log("DATA", DATA)

                    this.setState({
                        showMessages: true,
                        showTopicInfo: false,
                        topicMessages: messages
                    })

                }
                else {
                    console.log("ERROR tru ", res)
                    this.setState({
                        error: true,
                        errorMessage: res.message
                    })
                }
            }
            catch (error) {
                console.log("catch", error)
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

    fetchTopicInfo = async (e) => {

        e.preventDefault()

        const { topicId, DATA } = this.state

        console.log("TOPIC", topicId)
        if (topicId !== "") {

            try {


                let pass = Cookies.get('password')

                let private_key = decryptKeys(Cookies.get('privateKey'), pass)

                console.log("IN TRY TOPIC", topicId)

                let res = await getTopicInfo(Cookies.get('accountId'), private_key, topicId)
                console.log("RES", res)
                if (!res.error) {
                    console.log("NO ERROR ", res)

                    console.log("messages", res.result)
                    console.log("DATA", DATA)

                    this.setState({
                        showMessages: false,
                        showTopicInfo: true,
                        topicInfo: { ...res.result }
                    })

                }
                else {
                    console.log("ERROR tru ", res)
                    this.setState({
                        error: true,
                        errorMessage: res.message
                    })
                }
            }
            catch (error) {
                console.log("catch", error)
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

        const { showMessages, showTopicInfo } = this.state

        if (showMessages)
            return this.showMessages()
        else if (showTopicInfo)
            return this.showTopicDetails()
        else
            return this.main()

    }


    handleChange = (key, value) => {
        this.setState({
            [key]: value
        }, () => { console.log(this.state) })
    }

    showTopicDetails() {
        const { topicInfo } = this.state
        console.log("TOPIC INFO", topicInfo)
        return (
            <Card className="m_10 z_100000 bg_transparent">
                <Card.Body className="p_10">
                    <Card.Title className='mb-2 text-muted text_align_center'>Topic info</Card.Title>
                    <Card.Text>
                        <Row>
                            <Col>
                                <p className="text_align_left font-10 mt_5 mb_5"><span className="font-weight-600">Topic Memo - </span> {topicInfo.topicMemo}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text_align_left font-10 mt_5 mb_5"><span className="font-weight-600">Running hash - </span> {topicInfo.topicRunningHash}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text_align_left font-10 mt_5 mb_5"><span className="font-weight-600">Admin key- </span> {topicInfo.topicAdminKey}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text_align_left font-10 mt_5 mb_5"><span className="font-weight-600">Submit key - </span> {topicInfo.topicSubmitKey}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text_align_left font-10 mt_5 mb_5"><span className="font-weight-600">Expiration time - </span> {topicInfo.topicExiprationTime.toString()}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text_align_left font-10 mt_5 mb_5"><span className="font-weight-600">Auto renew period - </span> {topicInfo.topicAutoRenewPeriod}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text_align_left font-10 mt_5 mb_5"><span className="font-weight-600">Sequence number - </span> {topicInfo.topicSequenceNumber}</p>
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


    showMessages() {
        const { topicMessages } = this.state

        return (
            <Card className="m_10 z_100000 bg_transparent">
                <Card.Body className="p_10">
                    <Card.Title className='mb-2 text-muted text_align_center'>Messages in the topic</Card.Title>
                    <Card.Text>
                        <Row>
                            <Col>
                                <div className="text_align_left font-14 mt_10 mb_5">
                                    <ul>
                                        {topicMessages && topicMessages.length > 0 && topicMessages.map(r => {
                                            return <li> {r} </li>
                                        })}
                                    </ul>
                                </div>
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
        return (
            <Card className="m_10 z_100000 bg_transparent">
                <Card.Body>
                    <Card.Subtitle className='mb-2 text-muted text_align_center'>Send Message</Card.Subtitle>
                    <Card.Text>
                        <Form >
                            <Form.Group controlId='formTopicMemoOrId'>
                                <Form.Label>Topic Id </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder={`Enter the topic id`}
                                    onChange={(e) => { this.handleChange('topicId', e.target.value) }}
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

                            <Button variant='primary' onClick={this.getTopicMessages} className="mb_10">
                                Get Messages
                    </Button>
                            <Button variant='primary' type='click' onClick={this.fetchTopicInfo}>
                                Get Topic Info
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
        changeView: newState => dispatch({ type: CHANGE_VIEW, state: newState }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetails);