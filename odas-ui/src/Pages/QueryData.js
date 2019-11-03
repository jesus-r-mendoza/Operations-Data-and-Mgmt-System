import React from 'react';
import axios from 'axios';
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
        axios.get('http://localhost:8000/api/units/', {
            headers: {
                'Content-type': "application/json"
            }})
        .then((response) => {
            console.log(response.data)
        })
        .catch(function (err) {
            console.log(err);
        });

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