import React from 'react';
//Components
import LoadSpinner from "../Components/LoadSpinner";
import Sidebar from "../Components/Sidebar";
import ReportCard from "../Components/ReportCard";
// Stylesheets
import "../Layout/UploadData.css"
import {Button, FormControl} from "react-bootstrap";

export default class UploadData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentPage: "upload",
            selectedFile: "File name"
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

     //TODO Needs implementation. May need rethinking.
     // Will need to find where the database connection and call will be
    goToReport() {
        this.setState({
            currentPage: "renderReport"
        });
    }

    renderFileInput() {
        if (this.state.currentPage === "upload") {
            return (
                <div className={"file-container"}>
                    <div className={"file-input"}>
                        <label htmlFor={"logFile"} className={"file-label"}>Choose a log file</label>
                        <div className={"input-container"}>
                            <FormControl
                                disabled
                                type={"text"}
                                name={"data-file"}
                                placeholder={this.state.selectedFile.name}
                                className={"input-box"}
                            />
                            <div className={"upload-btn-wrapper"}>
                                <Button
                                    variant={"info"}
                                    type={"submit"}
                                    className={"browse-btn"}
                                >
                                    Browse...
                                </Button>
                                <input
                                    type="file"
                                    name="logFile"
                                    data-multiple-caption="{count} files selected"
                                    multiple
                                    onChange={this.onChangeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <Button
                        variant={"primary"}
                        className={"submit-btn"}
                        onClick={() => this.goToReport()}
                    >
                        Submit
                    </Button>
                </div>
            );
        }

        else if (this.state.currentPage === "renderReport") {
            return (
                <div className={"card-container"}>
                    <ReportCard/>
                </div>
            );
        }
    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });

        console.log(event.target.files[0]);
    };

    render() {
        if (this.state.isLoading) {
            return(
                <LoadSpinner />
            );
        }

        if(!this.state.isLoading) {
            return (
                <div className={"report-container"}>
                    <Sidebar page={this.state.currentPage}>Upload a Dataset</Sidebar>
                    {this.renderFileInput()}
                </div>
            );
        }
    }
}