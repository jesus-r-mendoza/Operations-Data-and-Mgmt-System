import React from 'react';
// Redux
// import {postFile} from "../Actions";
// import {connect} from "react-redux";
import {reduxForm} from "redux-form";
//Components
import LoadSpinner from "../Components/LoadSpinner";
import Sidebar from "../Components/Sidebar";
import ReportCard from "../Components/ReportCard";
// Stylesheets
import "../Layout/UploadData.css"
import {Button, FormControl, Container} from "react-bootstrap";
import axios from "axios";

const acceptedExtensions = [".tlm", ".bin", ".txt"];
// const fileForm = reduxForm({
//     form: 'file'
// });

const apis = {
    unit: "http://localhost:8000/api/units/",
    component: "http://localhost:8000/api/comp/",
    satellites: "http://localhost:8000/api/sat/"
};

class UploadData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentPage: "upload",
            selectedFile: "Select a file",
            loaded: 1,
            fileSubmit: false,
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

     //TODO Needs implementation. May need rethinking.
     // Will need to find where the database connection and call will be
    goToReport() {
        this.setState({
            currentPage: "renderReport"
        });
    }

    onFileChangeHandler = event => {
        let extractExtension = new RegExp(/(?:\.([^.]+))?$/);
        let fileName = event.target.files[0].name;
        let extension = extractExtension.exec(fileName)[0];

        console.log(extension);
        if (acceptedExtensions.includes(extension)) {
            this.setState({
                selectedFile: event.target.files[0],
                loaded: 1,
                fileSubmit: true
            });
        } else {
            this.setState({
                loaded: 0
            });
            console.log("No file selected");
        }

        console.log(fileName);
    };

    handleFileSubmit = () => {
        let fileForm = new FormData();
        let upfile = this.state.selectedFile;
        let description = "This is a description";
        fileForm.append("upfile", upfile);
        fileForm.append("description", description);

        let fileObj = Object.create({}, {
            upfile: {value: upfile},
            description: {value: description}
        });

        console.log(fileObj);

        axios.post('http://localhost:8000/files/upload/', {
            data: fileObj
        })
            .then(
                res =>console.log(res)
            )
            .catch(err => console.log(err))
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
                    </div>
                    <Button
                        variant={"primary"}
                        className={"submit-btn"}
                        disabled={!this.state.fileSubmit}
                        onClick={() => this.handleFileSubmit()}
                    >
                        Submit
                    </Button>
                </div>
            );
        }

        else if (this.state.currentPage === "renderReport") {
            let units = this.createArray("units");
            let components = this.createArray("components");

            return (
                <div>
                    <Sidebar
                        page={this.state.currentPage}
                        units={units}
                        components={components}
                    >
                        Upload a Dataset
                    </Sidebar>
                    <Container>
                        <ReportCard/>
                    </Container>
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
                    {this.renderFileInput()}
                </div>
            );
        }
    }
}


export default reduxForm({
    form: 'file'
})(UploadData)