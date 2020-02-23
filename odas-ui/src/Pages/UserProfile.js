import React from 'react';
//Redux
import { connect } from "react-redux"
import { fetchUnits, fetchComponents, fetchSatellites, createOrg } from "../Actions";
// Components
import {Jumbotron, Modal, Tab, Tabs, Form} from "react-bootstrap";
import {SegmentGroup, Segment, Header, Divider, Button} from "semantic-ui-react";
// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "../Layout/UserProfile.css";


class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            isLoading: true,
            testing: null,
            orgName: ''
        });
    }

    componentDidMount() {
        this.props.fetchSatellites();
        this.props.fetchUnits();
        this.props.fetchComponents();

        this.setState({
            isLoading: false
        });
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

    render() {
        // const test = this.props;
        console.log(this.props.org);

        return (
            <div className={"user-container"}>
                <div className={"jumbo-container"}>
                    <Jumbotron>
                        <h1>Hello, user</h1>
                        <p>Welcome back</p>
                    </Jumbotron>
                </div>
                <div className={"section-container"}>
                    <SegmentGroup className={"info-sections"}>
                        <Segment>
                            <div className={"jumbo-header"}>
                                <Header>Organizations{"\xa0\xa0"}</Header>
                                <Button
                                    onClick={() => this.setElementState('modalState', true)}
                                    icon={"add"}
                                    size={"mini"}
                                />
                            </div>
                                <p>User's organizations can be listed here as they join them</p>
                                <Divider section />
                            <div className={"jumbo-header"}>
                                <Header>Satellites{"\xa0\xa0"}</Header>
                                <Button
                                    onClick={() => this.setElementState('modalState', true)}
                                    icon={"add"}
                                    size={"mini"}
                                />
                            </div>
                                <p>User's associated satellites can be viewed here</p>
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
                            Create
                        </Modal.Title>
                    </Modal.Header>
                    <Tabs>
                        <Tab eventKey={"Join"} title={"Join"}>
                            <Form.Control
                                name={"org-name"}
                            />
                        </Tab>
                        <Tab eventKey={"Create"} title={"Create"}>
                            Hello
                        </Tab>
                    </Tabs>
                </Modal>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        units: state.units,
        components: state.components,
        satObjects: state.satObjects,
        org: state.createOrg
    };
};

// Connect returns a function and second parenthesis invokes returned function
export default connect(mapStateToProps, {
    fetchUnits,
    fetchComponents,
    fetchSatellites,
    createOrg
})(UserProfile)