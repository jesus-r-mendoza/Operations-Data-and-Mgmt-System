import React from "react";
import {Link} from "react-router-dom";
// Stylesheets
import {Container, Navbar, NavbarBrand, NavDropdown, NavItem, Button, Modal, Form} from "react-bootstrap";
import "../Layout/Main.css";
// Redux
import { connect } from "react-redux";
import { login, register } from "../Actions";

export default class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalState: false,
            username: '',
            email: '',
            password: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
    }

    setModalState(state) {
        this.setState({
            modalState: state
        });
    }

    handleLogin(event) {
        event.preventDefault();
        const data = new FormData();
        data.append("1", event.target.email);
        for (let value of data.values()) {
            console.log("Header data", value);
        }
    };

    handleEmailChange(e) {
        e.preventDefault();
        this.setState({
            email: e.target.value
        });
        console.log(this.state.email);
    }

    handlePassChange(e) {
        e.preventDefault();
        this.setState({
            password: e.target.value
        });
        console.log(this.state.password);
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log("Username", this.state.username);
        console.log("Email", this.state.email);
        console.log("Password", this.state.password);

        this.props.register(this.state.username, this.state.email, this.state.password);
    };

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
                        <Form onSubmit={() => this.handleSubmit}>
                            <div className={"email-form"}>
                                <Form.Control
                                    type={"email"}
                                    placeholder={"Email"}
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                />
                            </div>
                            <div>
                                <Form.Control
                                    type={"password"}
                                    placeholder={"Password"}
                                    value={this.state.password}
                                    onChange={this.handlePassChange}
                                />
                            </div>
                            <Modal.Footer >
                                <Button
                                    variant={"info"}
                                    type={"submit"}
                                    className={"modal-btn"}
                                >
                                    Login
                                </Button>
                                <div>
                                    <Link
                                        to={"/register"}>
                                        New? Click here to register.
                                    </Link>
                                </div>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         login: state
//     }
// };

// export default connect(mapStateToProps({login, register }))(Header)