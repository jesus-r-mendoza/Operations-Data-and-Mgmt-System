import React from 'react';
import {Link} from "react-router-dom";
// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, FormControl} from "react-bootstrap";
import "../Layout/MainStyles.css"


export default class Main extends React.Component {
    render() {
        return (
            <div className={"main-page"}>
                <div className={"main-container"}>
                    <div id={"form"}>
                        <span className={"main-text"}>Welcome to ODAS Report Generator</span>
                        <div className={"main-button"}>
                            <Link to={"/query"}>
                                <Button size={"lg"} variant={"info"}>Query a Dataset</Button>
                            </Link>
                            <Link to={"/generate"}>
                                <Button size={"lg"} variant={"info"}>Generate a Dataset</Button>
                            </Link>
                            <Link to={"/upload"}>
                                <Button size={"lg"} variant={"info"}>Upload a Dataset</Button>
                            </Link>
                        </div>
                        <div className={"email-input"}>
                            <div className={"email-header"}>
                                <span className={"email-header"}>Sign up to receive email reports</span>
                                <Button size={"sm"} variant={"outline-info"} type={"submit"}>Info</Button>
                            </div>
                            <FormControl type={"text"} placeholder={"Email"} />
                            <div className={"email-button"}>
                                <Button size={"sm"} variant={"info"} type={"submit"}>Sign Up</Button>
                            </div>
                        </div>
                    </div>
                    <div id={"img"} className={"main-image"}>
                        <img src={require("../Images/front-page.gif")} alt={""} />
                    </div>
                </div>
            </div>
        );
    }
}