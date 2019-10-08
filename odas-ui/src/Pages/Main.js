import React from 'react';
import {Link} from "react-router-dom";
// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, FormControl, Popover, OverlayTrigger, PopoverContent} from "react-bootstrap";
import "../Layout/Main.css"


export default class Main extends React.Component {
    render() {

        const infoPop = (
            <Popover id={"popover-basic"}>
                <PopoverContent>
                    Entering your email will sign you up to receive weekly status reports of your equipment
                </PopoverContent>
            </Popover>
        );

        return (
            <div className={"main-page"}>
                <div className={"main-container"}>
                    <div className={"email-form"}>
                        <span className={"main-text"}>Welcome to <br/> ODAS Report Generator</span>
                        <div className={"main-button"}>
                            <Link to={"/query"}>
                                <Button size={"lg"}
                                        variant={"info"}
                                        className={"query-button"}
                                >
                                    Query a Dataset
                                </Button>
                            </Link>
                            {/*Removing this feature for now*/}
                            {/*<Link to={"/generate"}>*/}
                            {/*    <Button size={"lg"} variant={"info"}>Generate a Dataset</Button>*/}
                            {/*</Link>*/}
                            <Link to={"/upload"}>
                                <Button size={"lg"} variant={"info"}>Upload a Dataset</Button>
                            </Link>
                        </div>
                        <div className={"email-input"}>
                            <div className={"email-header"}>
                                <span className={"email-header"}>Sign up to receive email reports</span>
                                <OverlayTrigger
                                    trigger={"click"}
                                    key={"placement"}
                                    placement={"top"}
                                    overlay={infoPop}
                                >
                                    <Button size={"sm"} variant={"outline-info"} type={"submit"}>Info</Button>
                                </OverlayTrigger>
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