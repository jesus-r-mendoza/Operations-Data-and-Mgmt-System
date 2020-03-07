import React from 'react';
//Components
// import ReportCard from "../Components/ReportCard";
import ReportHeader from "../Components/ReportHeader";
// import {apiURL} from "../Definitions/SatApi";
// Stylesheets
import '../Layout/Reports.css'
import LoadSpinner from "../Components/LoadSpinner";
import Sidebar from "../Components/Sidebar";

export default class QueryData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            COMPONENTS: [],
            satObject: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    createSatNameObject(satName, satId) {
        return Object.create(Object.prototype, {
            value: {label: satId},
            label: {label: satName}
        });
    }

    createSatArray (satName, satId) {
        const nameList = [];
        for(let i = 0; i < satId.length; i++) {
            nameList.push(this.createSatNameObject(satName[i], satId[i]));
        }
        return nameList;
    }

    render() {
        if (this.state.isLoading) {
            return (
                <LoadSpinner/>
            );
        }

        if (!this.state.isLoading) {
            // let satNames = this.state.satObject.map(function(names) {return names.name});
            // let satIds = this.state.satObject.map(function(ids){return ids.id});
            // let satList = this.createSatArray(satNames, satIds);

            return (
                <div className={"report-container"}>
                    <Sidebar>
                        Query a Dataset
                    </Sidebar>
                    <div className={"report-body"}>
                        <ReportHeader />
                        {/*<ReportCard />*/}
                    </div>
                </div>
            );
        }
    }
}