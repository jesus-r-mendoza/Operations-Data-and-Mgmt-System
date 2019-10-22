import React from 'react';
import {Spinner} from "react-bootstrap";
// Stylesheets
import "../Layout/Main.css"

export default class LoadSpinner extends React.Component {
    render() {
        return(
          <div className={"spinner"}>
              <Spinner animation={"border"} role={"status"} />
              <span>Loading...</span>
          </div>
        );
    }
}