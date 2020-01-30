import React from 'react';
import CheckComponent from "./CheckComponent";
// Stylesheets
import '../Layout/Sidebar.css'
import {Button} from "react-bootstrap";
import {Divider} from "semantic-ui-react";
import Select from 'react-select';
// Components
import LoadSpinner from "./LoadSpinner";
// Redux
import { connect } from 'react-redux';
import { fetchSatellites, fetchComponents, fetchUnits } from "../Actions";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        let MEASUREMENTS = this.props.units;
        let COMPONENTS = this.props.components;
        this.state = {
            isLoading: true,
            currentPage: this.props.page,
            formSubmit: [],
            loadDropdown: true,
            satPlaceHolder: "Satellite",
            componentCheckboxes: COMPONENTS.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            ),
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    selectAllComponentCheckboxes = isSelected => {
        Object.keys(this.state.componentCheckboxes).forEach(checkboxC => {
            this.setState(prevStateC => ({
                componentCheckboxes: {
                    ...prevStateC.componentCheckboxes,
                    [checkboxC]: isSelected
                }
            }));
        });
    };

    handleComponentCheckboxChange = componentChangeEvent => {
        const { name } = componentChangeEvent.target;

        this.setState(prevState => ({
            componentCheckboxes: {
                ...prevState.componentCheckboxes,
                [name]: !prevState.componentCheckboxes[name]
            }
        }));
    };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
    // Append to formdata variables and submit
        Object.keys(this.state.measurementCheckboxes)
            .filter(checkbox => this.state.measurementCheckboxes[checkbox])
            .forEach(checkbox => {

                console.log(checkbox, "is selected.");
            });
        Object.keys(this.state.componentCheckboxes)
            .filter(checkbox => this.state.componentCheckboxes[checkbox])
            .forEach(checkbox => {

                console.log(checkbox, "is selected.");
            });
    };

    componentCheckboxes = option => (
        <CheckComponent
            label={option}
            isSelected={this.state.componentCheckboxes[option]}
            onCheckboxChange={this.handleComponentCheckboxChange}
            key={option}
        />
    );

    // selectAllComponents = () => this.selectAllComponentCheckboxes(true, "components");
    deselectAllComponents = () => this.selectAllComponentCheckboxes(false, "components");

    createMeasurementCheckboxes = units => units.map(this.unitCheckboxes);
    createComponentCheckboxes = components => components.map(this.componentCheckboxes);

    dropDownChange = e => {
        this.setState({
            satPlaceHolder: e.label
        })
    };

    render() {
        let satellites = this.props.satellites;

        if (this.state.isLoading === true) {
            return (
                <LoadSpinner/>
            );
        } else {
            return (
                <div>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className={"sidebar"}>
                            <div className={"sidebar-title"}>
                                <span>{this.props.children}</span>
                            </div>
                            <div>
                                <div className={"dropdown-style"}>
                                    <Select
                                        name="form-field-name"
                                        value="one"
                                        options={satellites}
                                        onChange={this.dropDownChange}
                                        placeholder={this.state.satPlaceHolder}
                                    />
                                </div>
                                <div className={"checkbox-selection-btn"}>
                                        <Divider horizontal>Components</Divider>
                                        {this.createComponentCheckboxes(this.props.components)}
                                        <div className={"selection-buttons"}>
                                            {/*<Button*/}
                                            {/*    variant={"outline-success"}*/}
                                            {/*    onClick={() => this.selectAllComponents()}*/}
                                            {/*    size={"sm"}*/}
                                            {/*>*/}
                                            {/*    Select All*/}
                                            {/*</Button>*/}
                                            <Button
                                                variant={"outline-danger"}
                                                onClick={() => this.deselectAllComponents()}
                                                size={"sm"}
                                            >
                                                Deselect All
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className={"gen-button-container"}>
                            <Button
                                type={"submit"}
                                variant={"info"}
                                className={"gen-button"}
                            >
                                Generate Report
                            </Button>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        sats: state.name
    };
};

export default connect(mapStateToProps, { fetchSatellites, fetchUnits, fetchComponents })(Sidebar)

// TODO Bring api calls back into sidebar