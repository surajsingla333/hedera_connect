import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'

import { HomePath } from '../../utils/constants'

import {RESET_CONTENT_ACTIONS} from '../../../../../../event/src/types/content/callText'
import {ACCESS_TO_CLIENT} from '../../../../../../event/src/types/sendToContent'
import {CHANGE_VIEW} from '../../../../../../event/src/types/gotoView'

export class AllowAccess extends Component {

    allowAccess = () => {
        this.props.grantAccessToClient({ accessToClient: true })
        this.props.resetContentActions({})
        this.props.changeView({ newView: HomePath })
    }
    dontAllowAccess = () => {
        this.props.resetContentActions({})
        this.props.changeView({ newView: HomePath })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Allow website to access your account to set client for transaction. </h3>
                        <p>This is requried to interact with dapps from the wallet</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={this.allowAccess}>
                            Allow
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={this.dontAllowAccess}>
                            Cancel
                        </Button>
                    </Col>
                </Row>

            </Container>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    resetContentActions: newState => dispatch({ type: RESET_CONTENT_ACTIONS, state: newState }),
    grantAccessToClient: newState => dispatch({ type: ACCESS_TO_CLIENT, state: newState }),
    changeView: newState => dispatch({ type: CHANGE_VIEW, state: newState })
})

export default connect(mapStateToProps, mapDispatchToProps)(AllowAccess)
