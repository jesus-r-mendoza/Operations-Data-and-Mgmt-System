import React from 'react';
// Stylesheets
import '../Layout/Reports.css'
import {Button, Form, FormCheck} from "react-bootstrap";

export default class QueryData extends React.Component {
// TODO Implement the checkbox selections
// TODO Extra maybe. Pull checkbox labels from the database. Dynamic rendering
// TODO Disable generate report button while nothing is selected

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentPage: this.props.page
        };

        console.log(this.props.page)
    }

    handleSubmit() {
        console.log("chicken")
    }

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
                <div className={"sidebar-title"}>
                    {/*{this.renderBackArrow(this.props.page)}*/}
                    <span>{this.props.children}</span>
                </div>
                <div>
                    <div className={"sidebar-info"}>
                        <span>Select data to be reported</span>
                    </div>
                    <div className={"checkbox-container"}>
                        <Form>
                            <FormCheck label={"Temperature"}/>
                            <FormCheck label={"Voltage"}/>
                            <FormCheck label={"Amps"}/>
                            <FormCheck label={"Stuff"}/>
                            <FormCheck label={"Stuff"}/>
                            <FormCheck label={"Stuff"}/>
                        </Form>
                    </div>
                    <div className={"gen-button-container"}>
                        <Button
                            type={"submit"}
                            variant={"info"}
                            className={"gen-button"}
                            onClick={() => this.handleSubmit()}
                        >
                            Generate Report
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}