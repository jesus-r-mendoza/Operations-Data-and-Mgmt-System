import React from "react";
import {Link} from "react-router-dom";
// Stylesheets
import {Container, Navbar, NavbarBrand, NavDropdown, NavItem, Button, Modal, Form} from "react-bootstrap";
import "../Layout/Main.css";

export default class Header extends React.Component {
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
            <div>
                <Navbar sticky={"top"} expand={"lg"} className={"nav-bar"}>
                    <NavbarBrand href={"/"}>
                        <span className={"title-text"}>Operations Data Analysis and Management System</span>
                    </NavbarBrand>
                    <Container className={"justify-content-end"}>
                        <NavDropdown id={'drop'} title={"Generate a Report"}>
                            <NavDropdown.Item href={"/upload"}>Upload a Dataset</NavDropdown.Item>
                            <NavDropdown.Item href={"/query"}>Query a Dataset</NavDropdown.Item>
                        </NavDropdown>
                        <NavItem>
                            <Link to={"/user-dashboard"}>
                                Dashboard
                            </Link>
                        </NavItem>
                        <span className={"link-text"}>{"\xa0\xa0"}|{"\xa0\xa0"}</span>
                        <Button
                            onClick={() => this.setModalState(true)}
                        >
                            Sign in
                        </Button>
                    </Container>
                </Navbar>
                <Modal
                    size={"med"}
                    show={this.state.modalState}
                    onHide={() => this.setModalState(false)}
                    aria-labelledby={"example-modal-sizes-title-sm"}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id={"example-modal-sizes-title-sm"}>
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
        )
    }
}