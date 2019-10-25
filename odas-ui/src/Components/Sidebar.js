import React from 'react';
// Stylesheets
import '../Layout/Sidebar.css'
import {Button} from "react-bootstrap";
import CheckComponent from "./CheckComponent";
// TODO map the attributes from API of the measurements table into this array
const LABELS = ["Temperature", "Voltage", "Velocity", "Chicken", "Nuggets", "Naomi", "Wada"];

export default class QueryData extends React.Component {
// TODO Extra maybe. Pull checkbox labels from the database. Dynamic rendering
// TODO Disable generate report button while nothing is selected

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentPage: this.props.page,
            checkboxes: LABELS.reduce(
                (options, option) => ({
                    ...options,
                        [option]: false
                }),
                {}
            ),
        };

        console.log(this.props.page)
    }

// TODO currently required to uncheck hidden initialization of array of letters .. ?
    componentDidMount() {
        this.selectAllCheckboxes(false);
    }

    goBack() {
        this.setState({
            currentPage: "upload"
        });

        console.log(this.state.currentPage)
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
    };

    handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            }
        }));
    };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        Object.keys(this.state.checkboxes)
            .filter(checkbox => this.state.checkboxes[checkbox])
            .forEach(checkbox => {
                console.log(checkbox, "is selected.");
            });
    };

    createCheckbox = option => (
        <CheckComponent
            label={option}
            isSelected={this.state.checkboxes[option]}
            onCheckboxChange={this.handleCheckboxChange}
            key={option}
        />
    );

    selectAll = () => this.selectAllCheckboxes(true);
    deselectAll = () => this.selectAllCheckboxes(false);
    createCheckboxes = () => LABELS.map(this.createCheckbox);

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
                                {this.createCheckboxes()}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

// TODO Find out how to use the key prop to use for the query