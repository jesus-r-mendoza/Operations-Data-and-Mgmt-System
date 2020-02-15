import React from 'react';
// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Modal, Form} from "react-bootstrap";
import "../Layout/Main.css"

export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalState: false
        }
    }

    setModalState(state) {
        this.setState({
            modalState: state
        });
    }

    render() {
        return (
            <div className={"main-page"}>
                <div className={"main-container"}>
                    <div className={"main-content"}>
                        <span className={"main-text"}>Welcome to <br/> ODAS Report Generator</span>
                        <div className={"user-box"}>
                            <div className={"main-form"}>
                                <span className={"sub-text"}>Get started by signing in</span>
                                <Form.Control
                                    type={"username"}
                                    name={"username"}
                                    placeholder={"Username"}
                                    className={"email-form"}
                                />
                                <Form.Control
                                    type={"password"}
                                    name={"password"}
                                    placeholder={"Password"}
                                />
                                <div className={"email-button-container"}>
                                    <div className={"email-button"}>
                                        <Button
                                            variant={"info"}
                                            type={"submit"}
                                            size={"lg"}
                                            onClick={() => this.setModalState(true)}
                                        >
                                            Login
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id={"img"} className={"main-image"}>
                        <img src={require("../Images/front-page.gif")} alt={""} />
                    </div>
                </div>
                <Modal
                    size="med"
                    show={this.state.modalState}
                    onHide={() => this.setModalState(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">
                            User Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <div className={"email-form"}>
                                <Form.Control type={"text"} placeholder={"Email"} />
                            </div>
                            <div>
                                <Form.Control type={"password"} placeholder={"Password"} />
                            </div>
                            <Modal.Footer className={"modal-btn"}>
                                <Button
                                    variant={"info"}
                                    type={"submit"}
                                    onClick={() => console.log("Submit")}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant={"info"}
                                    type={"submit"}
                                    onClick={() => console.log("Submit")}
                                >
                                    Register
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}