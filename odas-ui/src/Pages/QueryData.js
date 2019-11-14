import React from 'react';
//Components
import ReportCard from "../Components/ReportCard";
// Stylesheets
import '../Layout/Reports.css'
import LoadSpinner from "../Components/LoadSpinner";
import Sidebar from "../Components/Sidebar";
import axios from "axios";

const APIs = [
    {
        unit: "http://localhost:8000/api/units/",
        component: "http://localhost:8000/api/components/"
    }
];

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
        axios.get("http://localhost:8000/api/satellites/", {
            headers: {
                'Content-type': "application/json"
            }
        })
            .then(res => {
                this.setState({
                    satObject: res.data
                })
            })
            .catch(function (err) {
                console.log(err)
            });
        axios.get(APIs[0].unit, {
            headers: {
                'Content-type': "application/json"
            }
        })
            .then(res => {
                    this.setState({
                        MEASUREMENTS: res.data
                    })
                }
            )
            .catch(function (err) {
                console.log(err);
            });

        axios.get(APIs[0].component, {
            headers: {
                'Content-type': "application/json"
            }
        })
            .then(res => {
                    this.setState({
                        COMPONENTS: res.data
                    })
                }
            )
            .catch(function (err) {
                console.log(err);
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
            key: {value: satId},
            text: {value: satName},
            value: {value: satName}
        });
    }

    showDropdown (satName, satId) {
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
            let satObjects = this.showDropdown(satNames, satIds);
            return (
                <div className={"report-container"}>
                    <Sidebar
                        units={units}
                        components={components}
                        satellites={satObjects}
                    >
                        Query a Dataset
                    </Sidebar>
                    <div className={"card-container"}>
                        <ReportCard/>
                    </div>
                </div>
            );
        }
    }
}