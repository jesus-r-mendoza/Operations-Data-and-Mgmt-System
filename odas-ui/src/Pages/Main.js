import React from 'react';
// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import "../Layout/Main.css"
import { connect } from "react-redux";
import { login } from "../Actions";

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalState: false,
            username: '',
            password: ''
        }
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleLogin = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);

        this.setState({
            username: '',
            password: ''
        });
    };

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
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Control
                                    type={"password"}
                                    name={"password"}
                                    placeholder={"Password"}
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                />
                                <div className={"email-button-container"}>
                                    <div className={"email-button"}>
                                        <Button
                                            variant={"info"}
                                            type={"submit"}
                                            size={"lg"}
                                            onClick={this.handleLogin}
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
            </div>
        );
    }
}

const mapStateToProps = userState => {
    return {
        userLogin: userState.login
    };
};

export default connect(mapStateToProps, { login })(Main);