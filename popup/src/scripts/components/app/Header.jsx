import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cookies from 'js-cookie';

import { Container, Row, Col, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { decryptKeys } from '../../../../../API/src/encryption/decryptAES';

import { getBalance } from '../../../../../API/src/getBalance/getBalance'

import { CHANGE_NETWORK } from '../../../../../event/src/types/network'
import { SEND_TO_CONTENT } from '../../../../../event/src/types/sendToContent'

import { RESET_CONTENT_ACTIONS } from '../../../../../event/src/types/content/callText'

import { inThirtyMinutes, SET_NEW_BALANCE_IN_HOME, HomePath, CreateTokenPath, AddNewAccountPath, CreateNewAccountPath, AddTokenPath, SignMessagePath, TopicDetailsPath } from '../utils/constants'

class Header extends Component {
    state = {
        network: this.props.network,
        selectedValue: Cookies.get("name"),
        allData: JSON.parse(localStorage.getItem('DATA'))
    }


    componentDidMount() {
        this.setState({
            selectedValue: Cookies.get("name"),
            allData: JSON.parse(localStorage.getItem('DATA'))
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { allData, selectedValue } = this.state;
        const newData = JSON.parse(localStorage.getItem('DATA'))
        console.log("HEADER", allData, "\n", prevProps, "\n", prevState, "\n", newData, "\n", this.state, "\n", Cookies.get("name"))
        if ((allData && newData && allData.listAccountsNames.length !== newData.listAccountsNames.length) || (!allData && newData) || (newData && (selectedValue !== Cookies.get("name"))))
            this.setState({
                selectedValue: Cookies.get("name"),
                allData: newData
            }, () => console.log("header update", this.state))
    }

    onRadioChange = (e, value) => {
        console.log("e", e, e.target.value, value)
        e.preventDefault(e);
        Cookies.set('network', value);
        this.setState({ network: value });
        this.props.changeNetwork(value);
    }

    onRadioChangeAccount = async (e, value) => {
        console.log("E", e, e.target.value, value)
        e.preventDefault(e);

        const { allData } = this.state;

        console.log("ACC selected", value)
        console.log("ACC index", allData.listAccountsNames.indexOf(value))

        let changedAccount = allData.accounts[allData.listAccountsNames.indexOf(value)];
        console.log("ACC details", changedAccount)

        let p = Cookies.get("password");

        Cookies.set("password", p, {
            expires: inThirtyMinutes
        });
        Cookies.set("accountId", changedAccount.accountId, {
            expires: inThirtyMinutes
        });
        Cookies.set("publicKey", changedAccount.publicKey, {
            expires: inThirtyMinutes
        });
        Cookies.set("privateKey", changedAccount.privateKey, {
            expires: inThirtyMinutes
        });
        Cookies.set("name", changedAccount.name, {
            expires: inThirtyMinutes
        });
        this.props.sendAccountToContent({ accountId: changedAccount.accountId, accountName: changedAccount.name })
        this.setState({
            selectedValue: changedAccount.name
        })

        try {
            let private_key = decryptKeys(changedAccount.privateKey, p)
            let res = await getBalance(changedAccount.accountId, private_key)
            if (!res.error) {
                const { balance, tokensBalance } = res.result
                let newBalance = {
                    balance,
                    tokensBalance: JSON.parse(tokensBalance)
                }

                Cookies.set("balance", newBalance, {
                    expires: inThirtyMinutes
                });
                this.setState({
                    balance: res.result.balance
                })

                let event = new CustomEvent(SET_NEW_BALANCE_IN_HOME, { detail: { newBalance: newBalance } });
                document.dispatchEvent(event);
            }
            else {
                let newBalance = {
                    balance: 0,
                    tokensBalance: {}
                }
                Cookies.set("balance", newBalance, {
                    expires: inThirtyMinutes
                });

                let event = new CustomEvent(SET_NEW_BALANCE_IN_HOME, { detail: { newBalance: newBalance } });
                document.dispatchEvent(event);
            }

        }
        catch {
            let newBalance = {
                balance: 0,
                tokensBalance: {}
            }
            Cookies.set("balance", newBalance, {
                expires: inThirtyMinutes
            });
            let event = new CustomEvent(SET_NEW_BALANCE_IN_HOME, { detail: { newBalance: newBalance } });
            document.dispatchEvent(event);

            this.setState({
                balance: 0.0
            })

        }

    }

    render() {

        let listOfAccounts = [];

        const { allData } = this.state;

        if (allData) {
            let accounts = allData.listAccountsNames;

            listOfAccounts = accounts.map((account, key) =>
                <Dropdown.Item key={key} val2={key} value={account} onClick={(e) => this.onRadioChangeAccount(e, account)}>{account}</Dropdown.Item>


                // <option key={key} val2={key} value={account}>
                //     {account}
                // </option>
            )
        }

        return (
            <Container className="p_15 text_align_center">
                <div className="header_corner_1"></div>
                <div className="header_corner_2"></div>
                <Row className="header">
                    <Col>
                        <Button className="back_button" type="secondary" onClick={() => {
                            this.props.gotoNewViewFromHeader(HomePath)
                            this.props.resetContentCalls({})
                        }}><div className="back_arrow"></div></Button></Col>
                    <Col className="d-flex justify_content_center align_items_center text_align_center">
                        <h6>Saral Wallet</h6>
                    </Col>
                </Row>
                <Row className="mt_10">
                    {this.networkOptions(listOfAccounts)}
                </Row>
            </Container>
        );
    }

    networkOptions(accounts) {
        if (this.state.selectedValue && this.state.selectedValue !== "") {
            return (
                <Container className="p_0">
                    <Row>
                        <Col>
                            {/* <Form onChange={this.onRadioChange}>
                                <Form.Group controlId="network_dropdown">
                                    <Form.Control as="select" value={Cookies.get("network")} size="sm" custom readOnly>
                                        <option value="testnet">TestNet</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form> */}
                            <DropdownButton size="sm" title="Network">
                                <Dropdown.Item onClick={(e) => this.onRadioChange(e, "testnet")}>TestNet</Dropdown.Item>
                            </DropdownButton>
                        </Col>

                        <Col>
                            {/* <Form onChange={this.onRadioChangeAccount}>
                                <Form.Group controlId="accounts_dropdown">
                                    <Form.Control as="select" value={this.state.selectedValue} size="sm" custom>
                                        {accounts}
                                    </Form.Control>
                                </Form.Group>
                            </Form> */}
                            <DropdownButton size="sm" title="Accounts">
                            {accounts}
                            </DropdownButton>

                        </Col>

                        <Col>
                            <DropdownButton size="sm" title="Settings">
                                <Dropdown.Item onClick={() => this.props.gotoNewViewFromHeader(CreateNewAccountPath)}>Create new account</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.props.gotoNewViewFromHeader(AddNewAccountPath)}>Add new account</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => this.props.gotoNewViewFromHeader(CreateTokenPath)}>Create new token</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.props.gotoNewViewFromHeader(AddTokenPath)}>Add existing token to wallet</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => this.props.gotoNewViewFromHeader(SignMessagePath)}>Sign Message</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.props.gotoNewViewFromHeader(TopicDetailsPath)}>Topic details</Dropdown.Item>
                                <Dropdown.Divider />
                            </DropdownButton>
                        </Col>

                    </Row>

                </Container>
            );
        }
    }

}

const mapStateToProps = (state) => {
    return {
        network: state.getNetwork.network,
        getLocalStorage: state.getLocalStorage,
        gotoView: state.gotoView.currentView
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeNetwork: newNetwork => dispatch({ type: CHANGE_NETWORK, state: newNetwork }),
        sendAccountToContent: newNetwork => dispatch({ type: SEND_TO_CONTENT, state: newNetwork }),
        resetContentCalls: newData => dispatch({ type: RESET_CONTENT_ACTIONS, state: newData })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);