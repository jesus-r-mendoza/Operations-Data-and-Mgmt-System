import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import LoadSpinner from "../Components/LoadSpinner";
import "../Layout/DocumentPage.css"

export default class Documentation extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            isLoading: true
        });
    }

    render() {

        if(this.state.isLoading) {
            return (
                <LoadSpinner />
            )
        }
        return(
            <div className={"document-page"}>
                <h1>DOCUMENTATION PAGE</h1>
            </div>
        );
    }
}