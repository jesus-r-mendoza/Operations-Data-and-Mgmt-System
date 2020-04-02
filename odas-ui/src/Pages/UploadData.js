import React from 'react';
// Redux
import {
    getFileList,
    postFile,
    downloadFile,
    deleteFile,
    analyzeFile,
    fetchUnits,
    selectSatellite,
} from "../Actions";
import {connect} from "react-redux";
//Components
import ReportHeader from "../Components/ReportHeader";
import Sidebar from "../Components/Sidebar";
// import ReportCard from "../Components/ReportCard";
import FilesList from "../Components/FilesList";
// Stylesheets
import "../Layout/UploadData.css"
import {Alert, Button, Form} from "react-bootstrap";
import {Table} from "semantic-ui-react";

const acceptedExtensions = [".tlm", ".bin", ".txt", ".docx", ".csv"];

class UploadData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "upload",
            selectedFile: '',
            description: '',
            loaded: 1
        };

        this.handleFileSubmit = this.handleFileSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getFileList();
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(e.target.name, "updated with: ", e.target.value)
    };

    onFileChangeHandler = event => {
        const extractExtension = new RegExp(/(?:\.([^.]+))?$/);
        const fileName = event.target.files[0].name;
        const extension = extractExtension.exec(fileName)[0];

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

    async handleFileSubmit(e) {
        e.preventDefault();
        const selectedFile = this.state.selectedFile;
        const description = this.state.description;

        await this.props.postFile(selectedFile, description);
        this.props.getFileList();
    };

    handleDownload = (id, name) => {
        this.props.downloadFile(id, name);
    };

    handleDelete = (id) => {
        this.props.deleteFile(id);
        this.props.getFileList()
    };

    handleAnalysisRequest = (fileId) => {
        console.log([...this.props.checkedItems]);
        let checkedItemsArray = [...this.props.checkedItems];
        let filteredItems = [];

        checkedItemsArray.forEach(item =>  {
            if (item[1] === true) {
                filteredItems.push(item[0])
            }
        });

        if (this.props.selectedSatellite) {
            this.props.analyzeFile(this.props.selectedSatellite.value, fileId, filteredItems);
            this.props.getFileList()

        } else {
            console.log("Select a satellite")
        }
    };

    showErrorMessage(loaded) {
        console.log();
        if(loaded === 0) {
            return(
              <span className={"error-message"}>Please choose a valid file.</span>
            );
        }
    }

    // TODO Message is being washed away by the file list update
    showResultMessage = () => {
        // Returns false if file upload failed (See API)
        const uploadData = this.props.uploadFile.data;
        // Will be the error message upon upload failure
        const uploadError = this.props.uploadFile.error;

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

    showFileList = () => {
        return (
            <FilesList
                files={this.props.fileList.files}
                isLoading={this.props.fileList.isLoading}
                downloadHandler={this.handleDownload}
                deleteHandler={this.handleDelete}
                analysisRequestHandler={this.handleAnalysisRequest}
            />
        );
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
                    <div className={"files-table"}>
                        <div>
                            <span className={"file-table-text"}>Recent Files</span>
                            <Table className={'file-list-table-rows'}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>File Name</Table.HeaderCell>
                                        <Table.HeaderCell>Date</Table.HeaderCell>
                                        <Table.HeaderCell>Description</Table.HeaderCell>
                                        <Table.HeaderCell>Options</Table.HeaderCell>
                                    </Table.Row>
                                    {this.showFileList()}
                                </Table.Header>
                            </Table>
                        </div>
                    </div>
                </div>
            );
        }

        else if (this.state.currentPage === "renderReport") {
            return  (
                <div>
                    <ReportHeader />
                    {/*<ReportCard />*/}
                </div>
            );
        }
    }

    render() {
        return (
            <div className={"report-container"}>
                <Sidebar>
                    Upload a Dataset
                </Sidebar>
                <div className={"report-body"}>
                    {this.renderFileInput()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        uploadFile: state.postFile,
        fileList: state.getFileList,
        downFile: state.downloadFile,
        delFile: state.deleteFile,
        units: state.fetchUnits,
        selectedSatellite: state.selectSatellite,
        checkedItems: state.selectCheckboxItems
    };
};

export default connect(mapStateToProps, {
    postFile,
    getFileList,
    downloadFile,
    deleteFile,
    analyzeFile,
    fetchUnits,
    selectSatellite,
})(UploadData);