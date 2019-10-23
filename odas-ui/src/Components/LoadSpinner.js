import React from 'react';
import {Spinner} from "react-bootstrap";
// Stylesheets
import "../Layout/Utilities.css"

export default class LoadSpinner extends React.Component {
    render() {
        return(
          <div className={"loading-spinner"}>
              <Spinner animation={"border"} role={"status"} />
              <span className={"loading-text"}>Loading...</span>
          </div>
        );
    }
}