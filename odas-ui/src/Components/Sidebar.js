import React from 'react';
import CheckComponent from "./CheckComponent";
import axios from 'axios';
// Stylesheets
import '../Layout/Sidebar.css'
import {Button} from "react-bootstrap";
import {Divider} from "semantic-ui-react";
// Components
import LoadSpinner from "./LoadSpinner";
import DropdownComp from "./DropdownComp";

export default class Sidebar extends React.Component {
// TODO Disable generate report button while nothing is selected

    constructor(props) {
        super(props);
        let MEASUREMENTS = this.props.units;
        let COMPONENTS = this.props.components;
        this.state = {
            isLoading: true,
            currentPage: this.props.page,
            formSubmit: [],
            satNames: [],
            loadDropdown: true,
            measurementCheckboxes: MEASUREMENTS.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            ),
            componentCheckboxes: COMPONENTS.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            ),
        };

        console.log(this.props.page);

    }

    componentDidMount() {
        axios.get("http://localhost:8000/api/satellites/", {
            headers: {
                'Content-type': "application/json"
            }
        })
            .then(res => {
               this.setState({
                   satNames: res.data
               })
            });

        this.setState({
            isLoading: false
        });
    }

    goBack() {
        this.setState({
            currentPage: "upload"
        });

        console.log(this.state.currentPage)
    }

    selectAllUnitCheckboxes = isSelected => {
        Object.keys(this.state.measurementCheckboxes).forEach(checkboxU => {
            this.setState(prevStateU => ({
                measurementCheckboxes: {
                    ...prevStateU.measurementCheckboxes,
                    [checkboxU]: isSelected
                }
            }));
        });
    };

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

    handleUnitCheckboxChange = unitChangeEvent => {
        const { name } = unitChangeEvent.target;

        this.setState(prevState => ({
            measurementCheckboxes: {
                ...prevState.measurementCheckboxes,
                [name]: !prevState.measurementCheckboxes[name]
            }
        }));
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

    unitCheckboxes = option => (
        <CheckComponent
            label={option}
            isSelected={this.state.measurementCheckboxes[option]}
            onCheckboxChange={this.handleUnitCheckboxChange}
            key={option}
        />
    );

    componentCheckboxes = option => (
        <CheckComponent
            label={option}
            isSelected={this.state.componentCheckboxes[option]}
            onCheckboxChange={this.handleComponentCheckboxChange}
            key={option}
        />
    );

    selectAllUnits = () => this.selectAllUnitCheckboxes(true);
    deselectAllUnits = () => this.selectAllUnitCheckboxes(false);

    selectAllComponents = () => this.selectAllComponentCheckboxes(true, "components");
    deselectAllComponents = () => this.selectAllComponentCheckboxes(false, "components");

    createMeasurementCheckboxes = units => units.map(this.unitCheckboxes);
    createComponentCheckboxes = components => components.map(this.componentCheckboxes);

    // createSatNameObject(satArray) {
    //     let nameList = Object.create(Object.prototype, {
    //         key: {value: satArray.id},
    //         text: {value: satArray.name},
    //         value: {value: satArray.id}
    //     });
    //
    //     return nameList;
    // }


    showDropdown (satArray) {
        let nameList = this.createSatNameObject();
        // let nameList = this.createDictionary(satArray);
        console.log("SAT NAMES", satArray);
        return (
            <DropdownComp
                optionsList={nameList}
            />
        );
    }

    // TODO Does not route back to the desired page.
    renderBackArrow(page) {
        if(page === "renderReport") {
            return (
                <div className={"back-arrow-container"}>
                    {/*<button className={"back-arrow-btn"} />*/}
                        <img
                            src={require("../Images/back-arrow.png")}
                            alt={""}
                            className={"back-arrow"}
                            onClick={() => this.goBack()}
                        />
                </div>
            );
        }
    }

    render() {
        console.log("ARRAY", this.state.satNames);
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
                                {/*{this.renderBackArrow(this.props.page)}*/}
                                <span>{this.props.children}</span>
                            </div>
                            <div>
                                <div className={"sidebar-info"}>
                                    {/*{this.showDropdown(this.state.satNames)}*/}
                                    {/*<span>Select data to be reported</span>*/}
                                </div>
                                <div className={"checkbox-selection-btn"}>
                                    <div className={"checkbox-container"}>
                                        <Divider horizontal>Measurements</Divider>
                                        {this.createMeasurementCheckboxes(this.props.units)}
                                        <div className={"selection-buttons"}>
                                            <Button
                                                variant={"outline-success"}
                                                onClick={() => this.selectAllUnits()}
                                                size={"sm"}
                                            >
                                                Select All
                                            </Button>
                                            <Button
                                                variant={"outline-danger"}
                                                onClick={() => this.deselectAllUnits()}
                                                size={"sm"}
                                            >
                                                Deselect All
                                            </Button>
                                        </div>
                                        <Divider horizontal>Components</Divider>
                                        {this.createComponentCheckboxes(this.props.components)}
                                        <div className={"selection-buttons"}>
                                            <Button
                                                variant={"outline-success"}
                                                onClick={() => this.selectAllComponents()}
                                                size={"sm"}
                                            >
                                                Select All
                                            </Button>
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

// TODO Bring api calls back into sidebar