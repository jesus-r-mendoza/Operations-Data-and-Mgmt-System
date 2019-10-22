import React from 'react';
// Stylesheets
import '../Layout/Reports.css'
import {Button} from "react-bootstrap";
import Checkbox from "./Checkbox";

const LABELS = ["", "Temperature", "Voltage", "Velocity"];

export default class QueryData extends React.Component {
// TODO Implement the checkbox selections
// TODO Extra maybe. Pull checkbox labels from the database. Dynamic rendering
// TODO Disable generate report button while nothing is selected

    constructor(props) {
        super(props);
        // TODO map the attributes of the measurements table into this array
        this.state = {
            isLoading: true,
            currentPage: this.props.page,
            checkboxes: LABELS.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false
                }),
            )
        };
        console.log(this.props.page)
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

    selectAll = () => this.selectAllCheckboxes(true);

    deselectAll = () => this.selectAllCheckboxes(false);

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
        <Checkbox
            label={option}
            isSelected={this.state.checkboxes[option]}
            onCheckboxChange={this.handleCheckboxChange}
            key={option}
        />
    );

    createCheckboxes = () => LABELS.map(this.createCheckbox);

    goBack() {
        this.setState({
            currentPage: "upload"
        });


        console.log(this.state.currentPage)
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
                        <div>

                            {this.createCheckboxes()}
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
                    </div>
                </form>
            </div>
        );
    }
}