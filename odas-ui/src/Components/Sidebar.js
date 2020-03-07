import React from 'react';
// Stylesheets
import '../Layout/Sidebar.css'
import { Button } from "react-bootstrap";
import { Divider } from "semantic-ui-react";
import Select from 'react-select';
// Components

// Redux
import { connect } from 'react-redux';
import { fetchSatellites, fetchComponents, fetchUnits, satCompQuery } from "../Actions";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            currentPage: this.props.page,
            loadDropdown: true,
            satPlaceHolder: "Satellite",
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
        this.props.fetchSatellites()
    }

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

    };

    dropDownChange = e => {
        this.setState({
            satPlaceHolder: e.label
        })
    };

    createSatelliteObject = satelliteObject => {
        let satelliteOptions = [];

        for (let i = 0; i < satelliteObject.length; i++) {
            satelliteOptions.push(
                Object.create(Object.prototype, {
                    value: {value: satelliteObject[i].id},
                    label: {value: satelliteObject[i].name}
                })
            )
        }

        return satelliteOptions;
    };

    render() {
        // TODO new satellite API state
        console.log("This is it", this.props.satellites);
        console.log(this.createSatelliteObject(this.props.satellites));

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
                                    value="one"
                                    options={this.createSatelliteObject(this.props.satellites)}
                                    onChange={this.dropDownChange}
                                    placeholder={this.state.satPlaceHolder}
                                />
                            </div>
                            <div className={"checkbox-selection-btn"}>
                                <Divider horizontal>Components</Divider>

                                    <div className={"selection-buttons"}>
                                        {/*<Button*/}
                                        {/*    variant={"outline-success"}*/}
                                        {/*    onClick={this.selectAll}*/}
                                        {/*    size={"sm"}*/}
                                        {/*>*/}
                                        {/*    Select All*/}
                                        {/*</Button>*/}
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
                    {/*<div className={"gen-button-container"}>*/}
                    {/*    <Button*/}
                    {/*        type={"submit"}*/}
                    {/*        variant={"info"}*/}
                    {/*        className={"gen-button"}*/}
                    {/*    >*/}
                    {/*        Generate Report*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
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
