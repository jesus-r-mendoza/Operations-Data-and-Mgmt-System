import React from "react";
import { Link } from "react-router-dom";
import Cookie from 'universal-cookie';
// Stylesheets
import {
    Container,
    Navbar,
    NavbarBrand,
    NavDropdown,
    Button,
    Modal,
    Form,
    Toast, DropdownButton
} from "react-bootstrap";
import "../Layout/Main.css";
// Redux
import { connect } from "react-redux";
import { login, logout } from "../Actions/AuthActions";

let cookie = new Cookie();

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalState: false,
            toastState: false,
            loginBtnState: true,
            username: '',
            email: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    setElementStates(element, state) {
        this.setState({
            [element]: state
        })
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(e.target.name, "updated with: ", e.target.value)
    };

    handleLogin = e => {
        e.preventDefault();
        this.setElementStates('loginBtnState', true);
        this.props.login(this.state.username, this.state.password);
        this.showLoginToast();
    };

    handleLogout = e => {
        e.preventDefault();
        this.props.logout();
    };

    changeLoginButton () {
        if (!cookie.get('auth')) {
            return (
                <Button
                    onClick={() => this.setElementStates('modalState', true)}
                >
                    Sign in
                </Button>
            );
        } else {
            return (
                <Button
                    onClick={this.handleLogout}
                >
                    Sign out
                </Button>
            );
        }
    }

    showLoginToast = () => {
        if (this.props.userLogin === true) {
            this.setElementStates('modalState', false);
            this.setElementStates('toastState', true);
        } else {

        }
    };

    render() {
        console.log(this.props.userLogin);
        return (
            <div>
                <Navbar sticky={"top"} expand={"lg"} className={"nav-bar"}>
                    <NavbarBrand href={"/"}>
                        <span className={"title-text"}>Operations Data Analysis and Management System</span>
                    </NavbarBrand>
                    <Container>
                        <div className={"nav-items"}>
                            <DropdownButton id={'drop'} title={"Generate a Report"} className={"nav-drop"}>
                                <NavDropdown.Item href={"/upload"}>Upload a Dataset</NavDropdown.Item>
                                <NavDropdown.Item href={"/query"}>Query a Dataset</NavDropdown.Item>
                            </DropdownButton>
                            <Link to={"/user-dashboard"}>
                                <Button>
                                    Dashboard
                                </Button>
                            </Link>
                            <span className={"link-text"}>{"\xa0\xa0"}|{"\xa0\xa0"}</span>
                            {this.changeLoginButton(this.props.userLogin.pop())}
                        </div>
                    </Container>
                </Navbar>
                <Modal
                    size={"med"}
                    show={this.state.modalState}
                    onHide={() => this.setElementStates('modalState', false)}
                    aria-labelledby={"example-modal-sizes-title-sm"}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id={"example-modal-sizes-title-sm"}>
                            User Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={() => this.handleLogin(this.changeLoginButton())}>
                            <div className={"email-form"}>
                                <Form.Control
                                    name={"username"}
                                    type={"username"}
                                    placeholder={"Username"}
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
                                    type={"submit"}
                                >
                                    Login
                                </Button>
                                <div>
                                    <Link
                                        to={"/register"}
                                        onClick={() => {this.setElementStates('modalState', false)}}
                                    >
                                        New user? Click here to register.
                                    </Link>
                                </div>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Toast
                    onClose={() => this.setElementStates('toastState', false)}
                    show={this.state.toastState}
                    delay={3000} autohide
                    className={"login-toast"}
                >
                    <Toast.Header>
                        <strong className={"toast-title"}>Welcome!</strong>
                    </Toast.Header>
                    <Toast.Body className={"toast-body"}>You have logged in successfully.</Toast.Body>
                </Toast>
            </div>
        )
    }
}

const mapStateToProps = userState => {
    return {
        userLogin: userState.login,
        userLogout: userState.logout
    };
};

export default connect(mapStateToProps, { login, logout })(Header);