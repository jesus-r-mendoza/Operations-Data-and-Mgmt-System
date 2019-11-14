import React from 'react';
//Components
import LoadSpinner from "../Components/LoadSpinner";
import Sidebar from "../Components/Sidebar";
import ReportCard from "../Components/ReportCard";
// Stylesheets
import "../Layout/UploadData.css"
import {Button, FormControl} from "react-bootstrap";
import axios from "axios";

const acceptedExtensions = [".tlm", ".bin"];

const APIs = [
    {
        unit: "http://localhost:8000/api/units/",
        component: "http://localhost:8000/api/components/"
    }
];

export default class UploadData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentPage: "upload",
            selectedFile: "File Name",
            loaded: 1,
            MEASUREMENTS: [],
            COMPONENTS: [],
        };
    }

    componentDidMount() {
        axios.get(APIs[0].unit, {
            headers: {
                'Content-type': "application/json"
            }
        })
            .then(res => {
                    this.setState({
                        MEASUREMENTS: res.data
                    })
                }
            )
            .catch(function (err) {
                console.log(err);
            });

        axios.get(APIs[0].component, {
            headers: {
                'Content-type': "application/json"
            }
        })
            .then(res => {
                    this.setState({
                        COMPONENTS: res.data
                    })
                }
            )
            .catch(function (err) {
                console.log(err);
            });

        this.setState({
            isLoading: false
        });

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

    onChangeHandler = event => {
        let extractExtension = new RegExp(/(?:\.([^.]+))?$/);
        let fileName = event.target.files[0].name;

        let extension = extractExtension.exec(fileName)[0];
        console.log(extension);
        if (acceptedExtensions.includes(extension)) {
            this.setState({
                selectedFile: event.target.files[0].name,
                loaded: 1
            });
        } else {
            this.setState({
                loaded: 0
            });
        }

        console.log(event.target.files[0].name);
    };

    showErrorMessage(loaded) {
        if(loaded === 0) {
            return(
              <span className={"error-message"}>Please choose a valid file.</span>
            );
        }
    }

    // TODO implement onFileSubmit

    createArray(type) {
        if(type === "units") {
            let values = this.state.MEASUREMENTS.map(function (units) {
                return (units.units);
            });
            console.log("VALUES: ", values);
            return values;
        } else if(type === "components") {
            let values = this.state.COMPONENTS.map(function (components) {
                return (components.name);
            });
            console.log("VALUES: ", values);
            return values;
        }
    }

    renderFileInput() {
        if (this.state.currentPage === "upload") {
            return (
                <div className={"file-container"}>
                    <div className={"file-input"}>
                        <div>
                            <label htmlFor={"logFile"} className={"file-label"}>Choose a log file:</label>
                            {this.showErrorMessage(this.state.loaded)}
                        </div>
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
            let units = this.createArray("units");
            let components = this.createArray("components");
            return (
                <div className={"report-container"}>
                    <Sidebar
                        page={this.state.currentPage}
                        units={units}
                        components={components}
                    >
                        Upload a Dataset
                    </Sidebar>
                    {this.renderFileInput()}
                </div>
            );
        }
    }
}