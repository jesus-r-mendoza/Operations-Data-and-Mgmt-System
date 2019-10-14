import React from 'react';
// Stylesheets
import '../Layout/Reports.css'
import {Button, Form, FormCheck} from "react-bootstrap";

export default class QueryData extends React.Component {
// TODO Implement the checkbox selections
// TODO Extra maybe. Pull checkbox labels from the database. Dynamic rendering
// TODO Make generate report button adaptive to all screens

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    render() {

        function handleSubmit() {
            console.log("chicken")
        }

        return (
            <div className={"sidebar"}>
                <div className={"sidebar-title"}>
                    <span>{this.props.children}</span>
                </div>
                <div>
                    <div className={"sidebar-info"}>
                        <span>Select data to be reported</span>
                    </div>
                    <div className={"checkbox-container"}>
                        <Form onSubmit={handleSubmit()}>
                            <FormCheck label={"Stuff"}/>
                            <FormCheck label={"Stuff"}/>
                            <FormCheck label={"Stuff"}/>
                            <FormCheck label={"Stuff"}/>
                            <FormCheck label={"Stuff"}/>
                            <FormCheck label={"Stuff"}/>
                        </Form>
                    </div>
                    <div className={"gen-button-container"}>
                        <Button type={"submit"} variant={"info"} className={"gen-button"}>
                            Generate Report
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}