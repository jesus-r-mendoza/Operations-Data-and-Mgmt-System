import React from 'react';
import CheckComponent from "./CheckComponent";
// Stylesheets
import '../Layout/Sidebar.css'
import {Button} from "react-bootstrap";
import {Divider} from "semantic-ui-react";
import axios from "axios";

const MEASUREMENTS = ["Temperature", "Voltage", "Velocity", "Chicken", "Nuggets", "Cheeseburgers"];
const COMPONENTS = ["Something", "Some other thing", "Some more things"];

export default class QueryData extends React.Component {
// TODO Extra maybe. Pull checkbox labels from the database. Dynamic rendering
// TODO Disable generate report button while nothing is selected

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentPage: this.props.page,
            data: [],
            measurementCheckboxes: MEASUREMENTS.reduce(
                (options, option) => ({
                    ...options,
                        [option]: false
                }),
                {}
            ),
            moreCheckboxes: COMPONENTS.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
                {}
            ),
        };

        console.log(this.props.page)
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/units/', {
            headers: {
                'Content-type': "application/json"
            }})
            .then((response) => {
                // const units = response.data;
                console.log(response.data)
            })
            .catch(function (err) {
                console.log(err);
            });


        this.setState({

        })
    }

    goBack() {
        this.setState({
            currentPage: "upload"
        });

        console.log(this.state.currentPage)
    }

    selectAllCheckboxes = isSelected => {
        Object.keys(this.state.measurementCheckboxes).forEach(checkbox => {
            this.setState(prevState => ({
                measurementCheckboxes: {
                    ...prevState.measurementCheckboxes,
                    [checkbox]: isSelected
                }
            }));
        });
    };

    handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            measurementCheckboxes: {
                ...prevState.measurementCheckboxes,
                [name]: !prevState.measurementCheckboxes[name]
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
    };

    createCheckbox = option => (
        <CheckComponent
            label={option}
            isSelected={this.state.measurementCheckboxes[option]}
            onCheckboxChange={this.handleCheckboxChange}
            key={option}
        />
    );

    selectAll = () => this.selectAllCheckboxes(true);
    deselectAll = () => this.selectAllCheckboxes(false);
    createCheckboxes = type => type.map(this.createCheckbox);

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
        return (
            <div className={"sidebar"}>
                <form onSubmit={this.handleFormSubmit}>
                    <div className={"sidebar-title"}>
                        {/*{this.renderBackArrow(this.props.page)}*/}
                        <span>{this.props.children}</span>
                    </div>
                    <div>
                        <div className={"sidebar-info"}>
                            <span>Select data to be reported</span>
                        </div>
                        <div className={"selection-buttons"}>
                            <Button
                                variant={"secondary"}
                                onClick={() => this.selectAll()}
                                size={"sm"}
                            >
                                Select All
                            </Button>
                            <Button
                                variant={"secondary"}
                                onClick={() => this.deselectAll()}
                                size={"sm"}
                            >
                                Deselect All
                            </Button>
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
                        <div className={"checkbox-selection-btn"}>
                            <div className={"checkbox-container"}>
                                <Divider horizontal>Measurements</Divider>
                                {this.createCheckboxes(MEASUREMENTS)}
                                <Divider horizontal>Components</Divider>
                                {this.createCheckboxes(COMPONENTS)}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

// TODO Find out how to use the key prop to use for the query