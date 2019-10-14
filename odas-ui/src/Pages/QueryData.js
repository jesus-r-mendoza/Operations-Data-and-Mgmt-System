import React from 'react';
//Components
import ReportCard from "../Components/ReportCard";
// Stylesheets
import '../Layout/Reports.css'
import LoadSpinner from "../Components/LoadSpinner";
import Sidebar from "../Components/Sidebar";

export default class QueryData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <LoadSpinner/>
            );
        }

        if (!this.state.isLoading) {
            return (
                <div className={"report-container"}>
                    <Sidebar>Query a Dataset</Sidebar>
                    <div className={"card-container"}>
                        <ReportCard/>
                    </div>
                </div>
            );
        }
    }
}