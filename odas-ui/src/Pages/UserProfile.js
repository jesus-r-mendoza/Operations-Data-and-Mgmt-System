import React from 'react';
//Redux
import { connect } from "react-redux"
import { fetchUnits, fetchComponents, fetchSatellites } from "../Actions";
// Components
import LoadSpinner from "../Components/LoadSpinner";
import { Jumbotron } from "react-bootstrap";
// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "../Layout/UserProfile.css";
import {SegmentGroup, Segment, Header, Divider} from "semantic-ui-react";
import {Button} from "semantic-ui-react";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            isLoading: true,
            testing: null
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

    render() {
        if(this.state.isLoading) {
            return (
                <LoadSpinner />
            );
        } else {
            const test = this.props;
            console.log(test);

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
                                    <Button icon={"add"} size={"mini"} />
                                </div>
                                    <p>User's organizations can be listed here as they join them</p>
                                    <Divider section />
                                <div className={"jumbo-header"}>
                                    <Header>Satellites{"\xa0\xa0"}</Header>
                                    <Button icon={"add"} size={"mini"} />
                                </div>
                                    <p>User's associated satellites can be viewed here</p>
                            </Segment>
                        </SegmentGroup>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        units: state.units,
        components: state.components,
        satObjects: state.satObjects
    };
};

// Connect returns a function and second parenthesis invokes returned function
export default connect(mapStateToProps, { fetchUnits, fetchComponents, fetchSatellites })(UserProfile)