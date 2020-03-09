import React from 'react';
// Stylesheets
import '../Layout/Sidebar.css'
// import { Button } from "react-bootstrap";
import { Divider } from "semantic-ui-react";
import Select from 'react-select';
// Components
import CheckComponent from "./CheckComponent";
// Redux
import { connect } from 'react-redux';
import { fetchSatellites, fetchComponents, fetchUnits, satCompQuery } from "../Actions";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isSelected: false,
            currentPage: this.props.page,
            loadDropdown: true,
            selectedSatellite: null,
            formSubmit: [],
        };
    }

    selectAllCheckboxes = isSelected => {
        Object.keys(this.state.checkboxes).forEach(checkbox => {
            this.setState(prevState => ({
                checkboxes: {
                    ...prevState.checkboxes,
                    [checkbox]: isSelected
                }
            }));
        });

        console.log(this.state.checkboxes);
    };

    selectAll = () => this.selectAllCheckboxes(true);
    deselectAll = () => this.selectAllCheckboxes(false);

    componentDidMount() {
        this.setState({
            isLoading: false
        });

        // API call to get list of satellites associated with current logged in user
        this.props.fetchSatellites();
    }

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

    };

    dropDownChange = e => {
        this.setState({
            selectedSatellite: e
        });

        console.log("value", e.value);
        this.props.fetchComponents(e.value);
    };

    onCheckboxChange = e => {
        console.log("event", e.target)
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
        if (this.props.components.isLoading === null) {
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
                    isSelected={this.state.isSelected}
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
                    </div>
                </form>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        components: state.components,
        satellites: state.fetchSatellites
    };
};

export default connect(mapStateToProps, {
    fetchSatellites,
    fetchUnits,
    fetchComponents,
    satCompQuery
})(Sidebar)
