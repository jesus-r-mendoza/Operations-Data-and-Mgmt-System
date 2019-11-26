import React from 'react';
//Components
import ReportCard from "../Components/ReportCard";
import ReportHeader from "../Components/ReportHeader";
import axios from "axios";
// Stylesheets
import { Container, Row, Col } from "react-bootstrap";
import '../Layout/Reports.css'
import LoadSpinner from "../Components/LoadSpinner";
import Sidebar from "../Components/Sidebar";

const apis = {
    unit: "http://localhost:8000/api/units/",
    component: "http://localhost:8000/api/comp/",
    satellites: "http://localhost:8000/api/sat/"
};

export default class QueryData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MEASUREMENTS: [],
            COMPONENTS: [],
            satObject: [],
            isLoading: true,
        };
    }

    // TODO combine axios calls into one
    componentDidMount() {
        axios.all([axios.get(apis.unit), axios.get(apis.component), axios.get(apis.satellites)])
            .then(axios.spread((...responses) => {
                this.setState({
                    MEASUREMENTS: responses[0].data,
                    COMPONENTS: responses[1].data,
                    satObject: responses[2].data
                })
            }))
            .catch(err => {
                console.log(err)
            });

        this.setState({
            isLoading: false
        });
    }

    createArray(type) {
        if(type === "units") {
            let values = this.state.MEASUREMENTS.map(function (units) {
                return (units.units);
            });
            console.log("VALUES: ", values);
            return values;
        } else if(type === "components") {
            let values = this.state.COMPONENTS.map(function (components) {
                return (components.name);
            });
            console.log("VALUES: ", values);
            return values;
        }
    }

    createSatNameObject(satName, satId) {
        return Object.create(Object.prototype, {
            value: {value: satId},
            label: {value: satName}
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
            let units = this.createArray("units");
            let components = this.createArray("components");
            let satNames = this.state.satObject.map(function(names) {return names.name});
            let satIds = this.state.satObject.map(function(ids){return ids.id});
            let satList = this.createSatArray(satNames, satIds);
            return (
                <div className={"report-container"}>
                    <Sidebar
                        units={units}
                        components={components}
                        satellites={satList}
                    >
                        Query a Dataset
                    </Sidebar>
                    <div className={"report-body"}>
                        <ReportHeader />
                        <ReportCard/>
                    </div>
                </div>
            );
        }
    }
}