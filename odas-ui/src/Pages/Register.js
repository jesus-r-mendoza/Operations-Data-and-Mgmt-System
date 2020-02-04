import React from 'react';
// Stylesheets
import { Form } from "react-bootstrap";
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
            password: ''
        };

        // Prevents TypeError: setState is undefined
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // e.target.name takes HTML tag property from Form.Control
    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <div className={"register-container"}>
                <div className={"register-box"}>
                    <Form className={"register-form"}>
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
                    </Form>
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