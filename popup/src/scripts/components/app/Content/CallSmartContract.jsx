import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';

import Cookies from 'js-cookie'

import { decryptKeys } from '../../../../../../API/src/encryption/decryptAES'

import { HomePath } from '../../utils/constants'
import { FUNCTION_CALLED } from '../../../../../../event/src/types/content/callText'
import { CHANGE_VIEW } from '../../../../../../event/src/types/gotoView'


import { callSmartContract } from '../../../../../../API/src/callSmartContract/callSmartContract'

class CallSmartContract extends Component {
    state = {
        account: Cookies.get('name'),
    };

    componentDidMount(){
        console.log("PROPS in caontract screen", this.props )
    }

    signContractCallTransaction = async (e) => {
        e.preventDefault()

        const { contentActions } = this.props
        const { dataFromWeb } = contentActions
        try {

            let pass = Cookies.get('password')

            let private_key = decryptKeys(Cookies.get('privateKey'), pass)

            console.log("APPLE", Cookies.get('accountId'), private_key, dataFromWeb.address, dataFromWeb.functionName, dataFromWeb.params)

            let res = await callSmartContract(Cookies.get('accountId'), private_key, dataFromWeb.address, dataFromWeb.functionName, dataFromWeb.params)

            console.log("RES", res)
            if (!res.error) {

                this.props.onSigningTrnasaction({
                    dataToWeb: res
                })
                this.props.changeView({ newView: HomePath })
            } else {
                console.log("error while calling smart contract", res)
                this.props.onSigningTrnasaction({
                    dataToWeb: res
                })
                this.props.changeView({ newView: HomePath })
            }

        } catch(err) {
            console.log("callSmartContract failed while calling smart contract", err)
            this.props.onSigningTrnasaction({
                dataToWeb: {error: err}
            })
            this.props.changeView({ newView: HomePath })
        }


    }
    render() {
        const { contentActions } = this.props
        console.log("contetn", contentActions, contentActions.dataFromWeb )
        const { dataFromWeb } = contentActions
        return (
            <Container>
                <Row>
                    <Card className="m_20 w_18rem" >
                        <Card.Body>
                            <Card.Subtitle className='mb-2 text-muted'>
                                Function called from WebPage To Invoke Contract Function
              </Card.Subtitle>
                            <Card.Text>
                                <Form onSubmit={this.signContractCallTransaction}>
                                    <Row>
                                        <Col>
                                            <p className="text_align_left font-14 mt_10 mb_5"><span className="font-weight-600">Contract address - </span> {dataFromWeb.address}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p className="text_align_left font-14 mt_10 mb_5"><span className="font-weight-600">Function called - </span> {dataFromWeb.functionName}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="text_align_left font-14 mt_10 mb_5">
                                                {dataFromWeb.params &&
                                                    <span className="font-weight-600">With parameters :</span>}
                                                {dataFromWeb.params && dataFromWeb.params.map(r => {
                                                    return <span> {r} </span>
                                                })}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Button
                                        type='submit'
                                        variant='primary'
                                    >Send</Button>
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
        contentActions: state.contentActions
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSigningTrnasaction: newState => dispatch({ type: FUNCTION_CALLED, state: newState }),
        changeView: newState => dispatch({ type: CHANGE_VIEW, state: newState })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CallSmartContract)
