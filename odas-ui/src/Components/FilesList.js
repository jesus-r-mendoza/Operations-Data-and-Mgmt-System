import React from "react";
import moment from "moment";
// Components
import {Table, Button} from "semantic-ui-react";
import {Spinner} from "react-bootstrap";
// Stylesheets
import "../Layout/Utilities.css"
// Explicit declaration of props require {}
// Files is array of objects, map() iterates over for each {file} object
const FilesList = ({ files, isLoading, downloadHandler, deleteHandler, analysisRequestHandler }) => {
    if (isLoading && typeof files === "object") {
        return (
            <Spinner
                as={"tr"}
                animation={"border"}
                role={"status"}
            />
        );
    } else {
        console.log(files);
        return files.map((file) => {
            return (
                <Table.Row key={file.id}>
                    <Table.Cell>{file.name}</Table.Cell>
                    <Table.Cell>{moment(file.date).format("MMMM Do YYYY, hh:mm:ssA")}</Table.Cell>
                    <Table.Cell>{file.description}</Table.Cell>
                    <Table.Cell>
                        <Button
                            size={"tiny"}
                            icon={"line graph"}
                            onClick={() => analysisRequestHandler(file.id)}
                        />
                        <Button
                            size={"tiny"}
                            icon={"download"}
                            onClick={() => downloadHandler(file.id, file.name)}
                        />
                        <Button
                            size={"tiny"}
                            icon={"delete"}
                            onClick={() => deleteHandler(file.id)}
                        />
                    </Table.Cell>
                </Table.Row>
            )
        });
    }
};

export default FilesList;