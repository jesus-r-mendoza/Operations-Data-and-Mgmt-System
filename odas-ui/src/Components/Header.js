import React from "react";
import {Link} from "react-router-dom";
// Stylesheets
import {Container, Navbar, NavbarBrand, NavDropdown, NavItem, Button, Modal, Form} from "react-bootstrap";
import "../Layout/Main.css";
// Redux
import { connect } from "react-redux";
import { login } from "../Actions/AuthActions";

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalState: false,
            username: '',
            email: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    setModalState(state) {
        this.setState({
            modalState: state
        });
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(e.target.name, "updated with: ", e.target.value)
    };

    handleLogin = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
        console.log(this.props.user);
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
                        <Form onSubmit={() => this.handleLogin}>
                            <div className={"email-form"}>
                                <Form.Control
                                    name={"username"}
                                    type={"email"}
                                    placeholder={"Email"}
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div>
                                <Form.Control
                                    name={"password"}
                                    type={"password"}
                                    placeholder={"Password"}
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <Modal.Footer className={"modal-footer"}>
                                <Button
                                    variant={"info"}
                                    onClick={this.handleLogin}
                                    className={"modal-btn"}
                                >
                                    Login
                                </Button>
                                <div>
                                    <Link
                                        to={"/register"}
                                        onClick={() => {this.setModalState(false)}}
                                    >
                                        New user? Click here to register.
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

const mapStateToProps = state => {
    return {
        userLogin: state.login
    }
};

export default connect(mapStateToProps, { login })(Header)