import React from "react";
// Components
import {Table, Button} from "semantic-ui-react";
import {Spinner} from "react-bootstrap";
// Stylesheets
import "../Layout/Utilities.css"

// Explicit declaration of props require {}
// Files is array of objects, map() iterates over for each {file} object
const FilesList = ({ files, isLoading, downloadHandler }) => {
    console.log(files);
    if (isLoading) {
        return (
            <Spinner
                as={"tr"}
                animation={"border"}
                role={"status"}
            />
        );
    } else {
        return files.map((file) => {
            return (
                <Table.Row key={file.id}>
                    <Table.Cell>{file.name}</Table.Cell>
                    <Table.Cell>Today</Table.Cell>
                    <Table.Cell>{file.description}</Table.Cell>
                    <Table.Cell>
                        <Button
                            size={"tiny"}
                            icon={"download"}
                            onClick={() => downloadHandler(file.id, file.name)}
                        />
                        <Button
                            size={"tiny"}
                            icon={"delete"}
                            onClick={() => console.log("Delete", file.id, file.name)}
                        />
                    </Table.Cell>
                </Table.Row>
            )
        });
    }
};

export default FilesList;