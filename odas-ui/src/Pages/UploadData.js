import React from 'react';
//Components
import LoadSpinner from "../Components/LoadSpinner";
import Sidebar from "../Components/Sidebar";
import ReportCard from "../Components/ReportCard";
// Stylesheets
import "../Layout/UploadData.css"
import {Button} from "react-bootstrap";

export default class UploadData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentPage: "upload",
            selectedFile: null
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    renderFileInput() {
        if (this.state.currentPage === "upload") {
            return (
                <div className={"file-input"}>
                    <input type={"file"} name={"logFile"} placeholder={""} />
                    <input type="file" name="file" id="file" class="inputfile" data-multiple-caption="{count} files selected" multiple />
                    <label for={"file"}>Choose a file</label>
                    <Button type={"submit"} variant={"primary"}>Submit</Button>
                </div>
            );
        } else if (this.state.currentPage === "renderReport") {
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
                    <Sidebar>Upload a Dataset</Sidebar>
                    {this.renderFileInput()}
                </div>
            );
        }
    }
}