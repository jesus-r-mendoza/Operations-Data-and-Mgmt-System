import React from "react";
import { Link } from "react-router-dom";
// Stylesheets
import {
    Container,
    Navbar,
    NavbarBrand,
    NavDropdown,
    Button,
    Modal,
    Form,
    Toast, DropdownButton, Alert
} from "react-bootstrap";
import "../Layout/Main.css";
// Redux
import { connect } from "react-redux";
import { login, logout } from "../Actions/AuthActions";
// Definitions
import {authToken, cookie} from "../Definitions/BrowserCookie";

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalState: false,
            toastState: false,
            signedIn: false,
            username: '',
            email: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    };

    componentDidMount() {
        if (authToken) {
            this.setState({
                signedIn: true
            })
        }
    };

    setElementStates(element, state) {
        this.setState({
            [element]: state
        })
    };

    // Set input states
    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(e.target.name, "updated with: ", e.target.value)
    };

    handleLogin = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);

    };

    handleLogout = e => {
        e.preventDefault();
        this.props.logout();

    };

    setToastState = (result) => {
        if (result === "userLogin") {
            this.setElementStates('modalState', false);
            this.setElementStates('signedIn', true);
            this.setElementStates('toastState', true);

        } else if (result === "userFail") {
            this.setElementStates('username', '');
            this.setElementStates('password', '');
            this.setElementStates('signedIn', false);
            this.setElementStates('toastState', true);

        } else {
            console.log("error");
        }
    };

    showLoginToast = () => {
        console.log(this.props.userLogin);
        if (this.props.userLogin) {
            return (
                <Toast
                    onClose={() => this.setElementStates('toastState', false)}
                    show={this.state.toastState}
                    delay={3000} autohide
                    className={"login-toast"}
                >
                    <Toast.Header>
                        <strong className={"toast-title"}>Welcome!</strong>
                    </Toast.Header>
                    <Toast.Body className={"toast-body"}>You have successfully logged in.</Toast.Body>
                </Toast>
            );
        } else if (this.props.userLogout) {
            return (
                <Toast
                    onClose={() => this.setElementStates('toastState', false)}
                    show={this.state.toastState}
                    delay={3000} autohide
                    className={"login-toast"}
                >
                    <Toast.Header>
                        <strong className={"toast-title"}>See you next time!</strong>
                    </Toast.Header>
                    <Toast.Body className={"toast-body"}>You have successfully logged out.</Toast.Body>
                </Toast>
            );
        }
    };

    changeLoginButton () {
        if (!authToken) {
            return (
                <Button
                    onClick={() => this.setElementStates('modalState', true)}
                    variant={"info"}
                >
                    Sign in
                </Button>
            );
        } else {
            return (
                <Button
                    onClick={this.handleLogout}
                    variant={"info"}
                >
                    Sign out
                </Button>
            );
        }
    }

    showLoginFailAlert = () => {
        if (this.props.userLogin.status === false ) {
            return (
                <Alert variant={"warning"}>
                    {this.props.userLogin.message}
                </Alert>
            );
        } else {
            return (
                <div>{""}</div>
            );
        }
    };

    render() {
        console.log();
        return (
            <div>
                <Navbar sticky={"top"} expand={"lg"} className={"nav-bar"}>
                    <NavbarBrand href={"/"}>
                        <span className={"title-text"}>Operations Data Analysis and Management System</span>
                    </NavbarBrand>
                    <Container>
                        <div className={"nav-items"}>
                            <DropdownButton variant={"info"} id={'drop'} title={"Generate a Report"} className={"nav-drop"}>
                                <NavDropdown.Item href={"/upload"}>Upload a Dataset</NavDropdown.Item>
                                <NavDropdown.Item href={"/query"}>Query a Dataset</NavDropdown.Item>
                            </DropdownButton>
                            <Link to={"/profile"}>
                                <Button variant={"info"}>
                                    Profile
                                </Button>
                            </Link>
                            <span className={"link-text"}>{"\xa0\xa0"}|{"\xa0\xa0"}</span>
                            {this.changeLoginButton()}
                        </div>
                    </Container>
                </Navbar>
                <Modal
                    size={"med"}
                    show={this.state.modalState}
                    onHide={() => this.setElementStates('modalState', false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
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
                                {this.showLoginFailAlert()}
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
                {this.showLoginToast()}
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