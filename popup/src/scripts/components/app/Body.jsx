import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class Body extends Component {
    state = {};

    componentDidMount() { }

    render() {


        return (
            <Container>
                <Row>
                    <Col>
                        {this.props.children}
                    </Col>
                </Row>
            </Container>
        );
    }

}
const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);