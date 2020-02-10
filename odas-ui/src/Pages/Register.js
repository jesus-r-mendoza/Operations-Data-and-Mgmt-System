import React from 'react';
// Stylesheets
import {Button, Form} from "react-bootstrap";
import "../Layout/Register.css"
// Redux
import { connect } from 'react-redux';
import { register } from '../Actions/AuthActions';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            inviteCode: ''
        };

        // Prevents TypeError: setState is undefined
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // e.target.name takes HTML tag property from Form.Control
    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(e.target.name, "updated with: ", e.target.value)
    };

    handleRegister = e => {
        e.preventDefault();
        this.props.register(
            this.state.username,
            this.state.email,
            this.state.password,
            this.state.inviteCode);
    };

    handleRegisterResult = () => {
        this.setState({
            username: '',
            email: '',
            password: '',
            inviteCode: ''
        })
    };

    render() {
        console.log(this.props.registerUser);
        return (
            <div className={"register-container"}>
                <div className={"register-box"}>
                    <div className={"input-cluster"}>
                        <span className={"registration-text"}>ODAS User Registration</span>
                        <div className={"register-form"}>
                            <Form onSubmit={this.handleRegister}>
                                <Form.Control
                                    name={"username"}
                                    placeholder={"Username"}
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                    className={"register-input"}
                                />
                                <Form.Control
                                    name={"email"}
                                    type={"email"}
                                    placeholder={"Email"}
                                    value ={this.state.email}
                                    onChange={this.handleInputChange}
                                    className={"register-input"}
                                />
                                <Form.Control
                                    name={"password"}
                                    type={"password"}
                                    placeholder={"Password"}
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    className={"register-input"}
                                />
                                <Form.Control
                                    name={"inviteCode"}
                                    type={""}
                                    placeholder={"Invite Code (Optional)"}
                                    value={this.state.inviteCode}
                                    onChange={this.handleInputChange}
                                    className={"register-input"}
                                />
                                <div className={'register-btn'}>
                                    <Button
                                        type={"submit"}
                                        variant={"info"}
                                        onClick={this.handleRegister}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        registerUser: state.register
    };
};

export default connect(mapStateToProps, { register })(Register);