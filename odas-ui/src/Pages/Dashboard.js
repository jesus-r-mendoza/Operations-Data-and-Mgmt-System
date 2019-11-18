import React from 'react';
import { connect } from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css";
import LoadSpinner from "../Components/LoadSpinner";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            isLoading: true
        });

        console.log(this.props)
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        })
    }

    render() {
        if(this.state.isLoading) {
            return (
                <LoadSpinner />
            )
        }
        return(
            <div className={"container"}>
            </div>
        );
    }
}

const mapStateToProps = state => {
    // console.log(state);

    return state;
};

// Connect returns a function and second parenthesis invokes returned function
export default connect(mapStateToProps)(Dashboard)