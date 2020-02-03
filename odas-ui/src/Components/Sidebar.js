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
import { fetchSatellites, fetchComponents, fetchUnits, satCompQuery } from "../Actions";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        let COMPONENTS = this.props.components;

        this.state = {
            isLoading: true,
            currentPage: this.props.page,
            loadDropdown: true,
            satPlaceHolder: "Satellite",
            formSubmit: [],
            checkboxes: COMPONENTS.reduce(
                (options, option) => ({
                    ...options,
                    [option]: true
                }),
                {}
            ),
        };
    }

    selectAllCheckboxes = isSelected => {
        Object.keys(this.state.checkboxes).forEach(checkbox => {
            // BONUS: Can you explain why we pass updater function to setState instead of an object?
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

    createCheckbox = option => (
        <CheckComponent
            label={option}
            isSelected={this.state.checkboxes[option]}
            onCheckboxChange={this.handleCheckboxChange}
            key={option}
        />
    );

    createCheckboxes = com => com.map(this.createCheckbox);

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        Object.keys(this.state.checkboxes)
            .filter(checkbox => this.state.checkboxes[checkbox])
            .forEach(checkbox => {
                this.state.formSubmit.push(checkbox);
                console.log(this.state.formSubmit)
            });
    };

    dropDownChange = e => {
        this.setState({
            satPlaceHolder: e.label
        })
    };

    render() {
        let satellites = this.props.satellites;
        let components = this.props.components;
        let obj = this.props.satCompQuery(1);
        console.log(obj);

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
                                        {this.createCheckboxes(components)}
                                        <div className={"selection-buttons"}>
                                            <Button
                                                variant={"outline-success"}
                                                onClick={this.selectAll}
                                                size={"sm"}
                                            >
                                                Select All
                                            </Button>
                                            <Button
                                                variant={"outline-danger"}
                                                onClick={this.deselectAll}
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

export default connect(mapStateToProps, { fetchSatellites, fetchUnits, fetchComponents, satCompQuery })(Sidebar)

// TODO Bring api calls back into sidebar