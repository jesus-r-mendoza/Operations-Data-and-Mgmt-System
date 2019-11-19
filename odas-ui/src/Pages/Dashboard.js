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
        this.setState({
            isLoading: false
        });

        this.props.fetchUnits()
    }

    render() {
        if(this.state.isLoading) {
            return (
                <LoadSpinner />
            )
        }
        const test = this.props;
        console.log(test);
        // for(let i = 0; i < test.length; i++) {
        //     console.log(test[i].id, test[i].name);
        // }

        return(
            <div className={"container"}>
            </div>
        );
    }
}

const mapStateToProps = state => {
    // return state;
    return {sats: state.sats};
};

// Connect returns a function and second parenthesis invokes returned function
export default connect(mapStateToProps, { fetchUnits })(Dashboard)