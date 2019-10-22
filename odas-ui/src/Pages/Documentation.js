import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import LoadSpinner from "../Components/LoadSpinner";

export default class Documentation extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            isLoading: true
        });
    }

    render() {
        return(
            <div className={"main-page"}>
                <h1>DOCUMENTATION PAGE</h1>
            </div>
        );
    }
}