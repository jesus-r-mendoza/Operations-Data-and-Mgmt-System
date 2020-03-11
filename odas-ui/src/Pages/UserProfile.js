import React from 'react';
//Redux
import { connect } from "react-redux"
import {
    createOrg,
    joinOrg,
    fetchSatellites
} from "../Actions";
// Components
import {Jumbotron, Modal, Tab, Tabs, Form} from "react-bootstrap";
import {SegmentGroup, Segment, Header, Divider, Button} from "semantic-ui-react";
// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "../Layout/UserProfile.css";
import { orgName, userName, invCode } from "../Definitions/BrowserCookie";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            testing: null,
            orgName: '',
            inviteCode: '',
            masterPassword: ''
        });

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchSatellites();
    }

    setElementState = (element, state) => {
        this.setState({
            [element]: state
        });
    };

    createOrganization = e => {
        e.preventDefault();
        this.props.createOrg(this.state.orgName);
    };

    joinOrganization = e => {
        e.preventDefault();
        this.props.joinOrg(this.state.inviteCode);
    };

    handleInputChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    showSatList = satellites => {
        return satellites.map(satellite => {
            console.log(satellite.name);
            return (
                <ul key={satellite.id}>{satellite.name}</ul>
            )
        });
    };

    render() {
        console.log(this.props.orgCreate);
        console.log(this.props.orgJoin);
        console.log(this.props.satellites);

        return (
            <div className={"user-container"}>
                <div className={"jumbo-container"}>
                    <Jumbotron>
                        <h1>Hello, {userName}</h1>
                        <h4>Welcome back</h4>
                    </Jumbotron>
                </div>
                <div className={"section-container"}>
                    <SegmentGroup className={"info-sections"}>
                        <Segment>
                            <div className={"jumbo-header"}>
                                <Header size={"large"}>Organization{"\xa0\xa0"}</Header>
                                <Button
                                    onClick={() => this.setElementState('modalState', true)}
                                    icon={"add"}
                                    size={"mini"}
                                />
                            </div>
                            {orgName} {invCode}
                                <Divider section />
                            <div className={"jumbo-header"}>
                                <Header size={"large"}>Satellites{"\xa0\xa0"}</Header>
                                <Button
                                    onClick={() => console.log("Satellites")}
                                    icon={"add"}
                                    size={"mini"}
                                />
                            </div>
                            {this.showSatList(this.props.satellites)}
                        </Segment>
                    </SegmentGroup>
                </div>
                <Modal
                    size={"med"}
                    show={this.state.modalState}
                    onHide={() => this.setElementState('modalState', false)}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Join or Create an Organization
                        </Modal.Title>
                    </Modal.Header>
                    <Tabs>
                        <Tab eventKey={"Join"} title={"Join"}>
                            <Form className={"org-form"}>
                                <Form.Control
                                    name={"inviteCode"}
                                    placeholder={"Enter your invite code"}
                                    className={"org-input"}
                                    value={this.state.inviteCode}
                                    onChange={this.handleInputChange}
                                />
                                <div className={"org-submit-btn"}>
                                    <Button
                                        className={"org-submit-btn"}
                                        onClick={this.joinOrganization}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Tab>
                        <Tab eventKey={"Create"} title={"Create"}>
                            <Form className={"org-form"}>
                                <Form.Control
                                    name={"orgName"}
                                    className={"org-input"}
                                    placeholder={"Enter the organization name"}
                                    value={this.state.orgName}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Control
                                    name={"masterPassword"}
                                    type={"password"}
                                    placeholder={"Enter the master password"}
                                    className={"org-input"}
                                    onChange={this.handleInputChange}
                                    value={this.state.masterPassword}
                                />
                                <div className={"org-submit-btn"}>
                                    <Button
                                        onClick={this.createOrganization}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Tab>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orgCreate: state.createOrg,
        orgJoin: state.joinOrg,
        satellites: state.fetchSatellites
    };
};

// Connect returns a function and second parenthesis invokes returned function
export default connect(mapStateToProps, {
    createOrg,
    joinOrg,
    fetchSatellites
})(UserProfile)