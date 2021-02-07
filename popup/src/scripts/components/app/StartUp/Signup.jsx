import React, { Component } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'

import { connect } from 'react-redux'

import { AddFirstAccountPath } from '../../utils/constants'
import { CHANGE_VIEW } from '../../../../../../event/src/types/gotoView'

class Signup extends Component {
    state = {}

    render() {
        return (
            <div>
                {this.card()}
            </div>
        )
    }

    card() {
        return (
            <Card className="m_10 text_align_center z_100000 bg_transparent">
                <Card.Body>
                    <Card.Title>HEDERA CONNECT</Card.Title>
                    <Card.Text>
                        <Container>
                            <Row>
                                <Col className="font-15">
                                    <Button
                                        variant='primary'
                                        value='get-started'
                                        onClick={e => {
                                            this.props.changeView({ newView: AddFirstAccountPath })

                                        }}
                                    >Let's get started</Button>
                                </Col>
                            </Row>
                        </Container>
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
        changeView: newState => dispatch({ type: CHANGE_VIEW, state: newState })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
