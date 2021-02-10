import React, { Component } from 'react';
import { Form, Button, ToggleButton, ButtonGroup, Card, Container, Col, Row } from 'react-bootstrap';

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

import { FUNCTION_CALLED } from '../../../../../../event/src/types/content/callText'

class SignMessage extends Component {
    state = {
        account: Cookies.get('name'),
    }


    componentDidMount() { }

    sendMessage = async (e) => {

        e.preventDefault()

        const { contentActions } = this.props
        console.log("contetn", contentActions, contentActions.dataFromWeb)
        const { dataFromWeb } = contentActions

        try {
            let pass = Cookies.get('password')

            let private_key = decryptKeys(Cookies.get('privateKey'), pass)

            console.log("PROVATe", private_key)

            let _topicMemo = dataFromWeb.topicMemo ? dataFromWeb.topicMemo : undefined
            let _topicId = dataFromWeb.topicMemo ? undefined : dataFromWeb.topicId
            let _newTopic = dataFromWeb.topicMemo ? false : true

            // _accountId, _privateKey, _topicMemo, _message, _tokenId = undefined, _newTopic = false, _gas = 5000, _txnFee = 2
            let res = await signMessage(Cookies.get('accountId'), private_key, _topicMemo, dataFromWeb.message, _topicId, _newTopic)
            console.log("RES", res)
            if (!res.error) {
                console.log("IN IF", res)

                const { messageReceipt, messageTransactionHash, topicReceipt, topicId } = res.result

                console.log("messageReceipt", messageReceipt)
                console.log("messageTransactionHash", messageTransactionHash)
                console.log("topicReceipt", topicReceipt)
                console.log("topicId", topicId)

                this.props.onSigningTrnasaction({
                    dataToWeb: res
                })
                this.props.changeView({ newView: HomePath })

            }
            else {
            console.log("IN ELSE", res)

                this.props.onSigningTrnasaction({
                    dataToWeb: res
                })
                this.props.changeView({ newView: HomePath })
            }
        }
        catch (error) {
            console.log("ERROR", error)
            this.props.onSigningTrnasaction({
                dataToWeb: { error: error }
            })
            this.props.changeView({ newView: HomePath })
        }

    }

    render() {
        const { contentActions } = this.props
        console.log("contetn", contentActions, contentActions.dataFromWeb)
        const { dataFromWeb } = contentActions
        return (
            <Container>
                <Row>
                    <Card className="m_20 w_18rem" >
                        <Card.Body>
                            <Card.Subtitle className='mb-2 text-muted'>
                                Sign Message
              </Card.Subtitle>
                            <Card.Text>
                                <Form onSubmit={this.sendMessage}>
                                    {/* <Form onSubmit={() => {}}> */}
                                    <Row>
                                        <Col>
                                            <p className="text_align_left font-14 mt_10 mb_5"><span className="font-weight-600">Topic Id - </span> {dataFromWeb.topicId ? dataFromWeb.topicId : 'New topic to create'}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p className="text_align_left font-14 mt_10 mb_5"><span className="font-weight-600">Topic Memo - </span> {dataFromWeb.topicMemo ? dataFromWeb.topicMemo : 'Adding message to existing topic'}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p className="text_align_left font-14 mt_10 mb_5"><span className="font-weight-600">Message - </span> {dataFromWeb.message}</p>
                                        </Col>
                                    </Row>
                                    <Button
                                        type='submit'
                                        variant='primary'
                                    >Sign</Button>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        data: state.getLocalStorage,
        contentActions: state.contentActions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSigningTrnasaction: newState => dispatch({ type: FUNCTION_CALLED, state: newState }), changeView: newState => dispatch({ type: CHANGE_VIEW, state: newState }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignMessage);