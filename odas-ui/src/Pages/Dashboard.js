import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import LoadSpinner from "../Components/LoadSpinner";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            isLoading: true
        });
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