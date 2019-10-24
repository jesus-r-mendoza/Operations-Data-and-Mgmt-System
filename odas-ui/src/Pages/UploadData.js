import React from 'react';
//Components
import LoadSpinner from "../Components/LoadSpinner";
import Sidebar from "../Components/Sidebar";
import ReportCard from "../Components/ReportCard";
// Stylesheets
import "../Layout/UploadData.css"
import {Button, FormControl} from "react-bootstrap";

var acceptedExtensions = [".tlm"];

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

    sanitizeFile(fileName) {

    }

    onChangeHandler = event => {
        let extractExtension = new RegExp(/(?:\.([^.]+))?$/);
        let fileName = event.target.files[0].name;

        let extension = extractExtension.exec(fileName)[0];
        console.log(extension);
        if (acceptedExtensions.contains(extension)) {
            this.setState({
                selectedFile: event.target.files[0].name,
                loaded: 0
            });
        } else {
            this.setState({
                selectedFile: "File name...",
                loaded: 0
            });
        }

        console.log(event.target.files[0].name);
    };

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
                                placeholder={this.state.selectedFile}
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