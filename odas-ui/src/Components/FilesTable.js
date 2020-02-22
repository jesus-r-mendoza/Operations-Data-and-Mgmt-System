import React from "react";
import {Table} from "semantic-ui-react";

const FilesTable = ({filename, fileUploadDate, description}) => {
    return (
        <div>
            <span className={"file-table-text"}>Recent Files</span>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>File Name</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>{filename}</Table.HeaderCell>
                        <Table.HeaderCell>{fileUploadDate}</Table.HeaderCell>
                        <Table.HeaderCell>{description}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table>
        </div>
    )
};

export default FilesTable;