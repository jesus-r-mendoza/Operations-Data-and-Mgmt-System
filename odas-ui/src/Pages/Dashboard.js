import React from 'react';
//Redux
import { connect } from "react-redux"
import { fetchUnits, fetchComponents, fetchSatellites } from "../Actions";
// Components
import LoadSpinner from "../Components/LoadSpinner";
// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "../Layout/Dashboard.css";

class Dashboard extends React.Component {
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
                <div className={"dash-container"}>

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
export default connect(mapStateToProps, { fetchUnits, fetchComponents, fetchSatellites })(Dashboard)