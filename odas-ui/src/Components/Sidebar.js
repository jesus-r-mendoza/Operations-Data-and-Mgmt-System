import React from 'react';
// Stylesheets
import '../Layout/Sidebar.css'
import { Button } from "react-bootstrap";
import { Divider } from "semantic-ui-react";
import Select from 'react-select';
// Components
import CheckComponent from "./CheckComponent";
// Redux
import { connect } from 'react-redux';
import {
    fetchSatellites,
    fetchComponents,
    fetchUnits,
    getRecentMeasurements,
    getMeasurementsByTime,
    selectStartDate,
    selectEndDate
} from "../Actions";
import {authToken} from "../Definitions/BrowserCookie";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            loadDropdown: true,
            selectedSatellite: null,
            checkedItems: new Map()
        };

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });

        // API call to get list of satellites associated with current logged in user
        this.props.fetchSatellites();
        // API call to get unit names
        this.props.fetchUnits();
    }

    async handleFormSubmit (e) {
        e.preventDefault();
        let satId;
        let compIds = [];

        if (this.state.selectedSatellite) {
            satId = this.state.selectedSatellite.value;
        }

        if (!this.props.startDate || !this.props.endDate) {
            this.state.checkedItems.forEach(item => {
                compIds.push(item);
            });

            await this.props.getRecentMeasurements(satId, compIds, this.props.recent)
        } else {
            await this.props.getMeasurementsByTime(satId, compIds, this.props.startDate, this.props.endDate)
        }

        // Refresh the checkboxes or they will not appear after submit
        this.props.fetchComponents(satId);
    };

    dropDownChange = e => {
        this.setState({
            selectedSatellite: e,
            checkedItems: new Map()
        });

        this.props.fetchComponents(e.value);
    };

    onCheckboxChange = e => {
        const item = e.target.id;
        const isChecked = e.target.checked;

        this.setState(prevState => ({
            checkedItems: prevState.checkedItems.set(item, isChecked)
        }));

        console.log(this.state.checkedItems)
    };

    createSatelliteObject = satelliteObject => {
        let satelliteOptions = [];
        for (let i = 0; i < satelliteObject.length; i++) {
            satelliteOptions.push(
                Object.create(Object.prototype, {
                    value: {value: satelliteObject[i].id},
                    label: {value: satelliteObject[i].name}
                })
            );
        }
        
        return satelliteOptions;
    };

    showCheckboxes = () => {
        if (!authToken && this.props.satellites.error === true) {
            return (
                <div className={"placeholder-text-div"}>
                    <span className={"placeholder-text"}>{this.props.satellites.message}</span>
                </div>
            );
        } else if (authToken && this.state.selectedSatellite === null) {
            return (
                <div className={"placeholder-text-div"}>
                    <span className={"placeholder-text"}>Please select a satellite to continue</span>
                </div>
            );
        } else {
            return (
                <CheckComponent
                    labels={this.props.components.data}
                    isLoading={this.props.components.isLoading}
                    checked={this.state.checkedItems}
                    onCheckboxChange={this.onCheckboxChange}
                />
            )
        }
    };

    render() {
        return (
            <div className={"sidebar-container"}>
                <form onSubmit={this.handleFormSubmit}>
                    <div className={"sidebar"}>
                        <div className={"sidebar-title"}>
                            <span>{this.props.children}</span>
                        </div>
                        <div>
                            <div className={"dropdown-style"}>
                                <Select
                                    name="form-field-name"
                                    value={this.state.selectedSatellite}
                                    options={this.createSatelliteObject(this.props.satellites)}
                                    onChange={this.dropDownChange}
                                />
                            </div>
                            <div className={"checkbox-selection-btn"}>
                                <Divider horizontal>Components</Divider>
                                {this.showCheckboxes()}
                            </div>
                        </div>
                        <div className={"gen-btn-container"}>
                            <Button
                                className={"gen-btn"}
                                onClick={this.handleFormSubmit}
                            >
                                Generate Report
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        components: state.components,
        satellites: state.fetchSatellites,
        units: state.fetchUnits,
        recent: state.selectRecent,
        recentMeasurements: state.getRecentMeasurements,
        measurementsByTime: state.getMeasurementsByTime,
        startDate: state.selectStartDate,
        endDate: state.selectEndDate
    };
};

export default connect(mapStateToProps, {
    fetchSatellites,
    fetchUnits,
    fetchComponents,
    getRecentMeasurements,
    getMeasurementsByTime,
    selectStartDate,
    selectEndDate
})(Sidebar)
