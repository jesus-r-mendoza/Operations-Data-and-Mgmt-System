import React from 'react';
import axios from "axios";
// Redux
import { postFile } from "../Actions";
import { connect } from "react-redux";
//Components
import ReportHeader from "../Components/ReportHeader";
import LoadSpinner from "../Components/LoadSpinner";
import Sidebar from "../Components/Sidebar";
import ReportCard from "../Components/ReportCard";
import { apiURL } from "../Apis/SatApi";
// Stylesheets
import "../Layout/UploadData.css"
import {Alert, Button, Form} from "react-bootstrap";

const acceptedExtensions = [".tlm", ".bin", ".txt", ".docx"];

const apis = {
    unit: `${apiURL}api/units/`,
    component: `${apiURL}api/comp/`,
    satellites: `${apiURL}api/sat/`
};

class UploadData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentPage: "upload",
            selectedFile: '',
            description: '',
            loaded: 1,
            MEASUREMENTS: [],
            COMPONENTS: [],
        };
    }

    componentDidMount() {
        axios.all([axios.get(apis.unit), axios.get(apis.component), axios.get(apis.satellites)])
            .then(axios.spread((...responses) => {
                this.setState({
                    MEASUREMENTS: responses[0].data,
                    COMPONENTS: responses[1].data,
                    satObjects: responses[2].data
                })
            }))
            .catch(err => {
                console.log(err)
            });

        this.setState({
            isLoading: false
        });
    }

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

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(e.target.name, "updated with: ", e.target.value)
    };

    onFileChangeHandler = event => {
        let extractExtension = new RegExp(/(?:\.([^.]+))?$/);
        let fileName = event.target.files[0].name;
        let extension = extractExtension.exec(fileName)[0];

        console.log(extension);
        if (acceptedExtensions.includes(extension)) {
            this.setState({
                selectedFile: event.target.files[0],
                loaded: 1
            });
        } else {
            this.setState({
                loaded: 0
            });
            console.log("No file selected");
        }

        console.log(fileName);
    };

    handleFileSubmit = e => {
        e.preventDefault();
        const selectedFile = this.state.selectedFile;
        const description = this.state.description;

        this.props.postFile(selectedFile, description);
    };

    showErrorMessage(loaded) {
        if(loaded === 0) {
            return(
              <span className={"error-message"}>Please choose a valid file.</span>
            );
        }
    }

    showResultMessage = () => {
        // Returns false if file upload failed (See API)
        let uploadData = this.props.uploadFile.data;
        // Will be the error message upon upload failure
        let uploadError = this.props.uploadFile.error;

        if (uploadData === false) {
            return (
                <Alert
                    dismissible={true}
                    variant={'warning'}
                >
                    {uploadError}
                </Alert>
            );
        }
    };

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
                            <Form.Control
                                disabled
                                type={"text"}
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
                                    onChange={this.onFileChangeHandler}
                                />
                            </div>
                        </div>
                        <div className={"warning-message"}>
                            <Form.Control
                                type={"text"}
                                name={"description"}
                                placeholder={"Please include a description"}
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                className={"input-box"}
                            />
                            {this.showResultMessage()}
                        </div>
                    </div>
                    <Button
                        variant={"primary"}
                        className={"submit-btn"}
                        onClick={this.handleFileSubmit}
                    >
                        Submit
                    </Button>
                </div>
            );
        }

        else if (this.state.currentPage === "renderReport") {
            return  (
                <div>
                    <ReportHeader />
                    <ReportCard />
                </div>
            );
        }
    }

    render() {
        console.log(this.props.uploadFile);
        let components = this.createArray("components");

        if (this.state.isLoading) {
            return(
                <LoadSpinner />
            );
        }

        if(!this.state.isLoading) {
            return (
                <div className={"report-container"}>
                    <Sidebar
                        components={components}
                    >
                        Upload a Dataset
                    </Sidebar>
                    <div className={"report-body"}>
                        {this.renderFileInput()}
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = uploadState => {
    return {
        uploadFile: uploadState.postFile
    };
};

export default connect(mapStateToProps, { postFile })(UploadData);