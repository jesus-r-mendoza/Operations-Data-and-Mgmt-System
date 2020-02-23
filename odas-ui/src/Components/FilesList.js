import React from "react";
import {Table} from "semantic-ui-react";

const FilesList = (props) => {
    console.log(props.files);
    return props.files.map((file) => {
        return (
            <Table.Row key={file.id}>
                <Table.Cell>{file.name}</Table.Cell>
                {/*<Table.HeaderCell>{props.fileUploadDate}</Table.HeaderCell>*/}
                <Table.Cell>{file.description}</Table.Cell>
            </Table.Row>
        )
    });
};

export default FilesList;