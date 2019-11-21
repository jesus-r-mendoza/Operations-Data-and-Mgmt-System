import React from 'react';
import { connect } from "react-redux"
import { fetchUnits } from "../Actions";
// Components
import LoadSpinner from "../Components/LoadSpinner";
// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            isLoading: true,
            testing: null
        });
    }

    componentDidMount() {
        this.props.fetchUnits();

        this.setState({
            isLoading: false
        });
    }

    render() {
        if(this.state.isLoading) {
            return (
                <LoadSpinner />
            )
        }
        const test = this.props;
        console.log(test);

        return (
            <div className={"container"}>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {sats: state.sats};
};

// Connect returns a function and second parenthesis invokes returned function
export default connect(mapStateToProps, { fetchUnits })(Dashboard)