import React from "react";
import {Table} from "semantic-ui-react";

const FilesList = (props) => {
    const fileList = props.fileList.map((file) => {
        return (<Table.Row>
                <Table.HeaderCell>{file}</Table.HeaderCell>
                {/*<Table.HeaderCell>{props.fileUploadDate}</Table.HeaderCell>*/}
                <Table.HeaderCell>{file}</Table.HeaderCell>
            </Table.Row>
        )
    });

    return {fileList};
};

export default FilesList;