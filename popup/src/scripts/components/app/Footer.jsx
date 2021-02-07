import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Footer extends Component {
    state = {}

    render() {
        return (
            <Container>
                <Row>
                    <div id="wave"></div>
                </Row>
            </Container>
        );
    }
}

export default Footer;
