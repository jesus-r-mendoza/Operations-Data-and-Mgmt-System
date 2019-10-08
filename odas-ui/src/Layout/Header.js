import React from "react";
import {Link} from "react-router-dom";
// Stylesheets
import {Container, Navbar, NavbarBrand, NavDropdown, NavItem} from "react-bootstrap";
import "./Main.css";

export default class Header extends React.Component {
    render() {
        return (
            <Navbar expand={"lg"} className={"nav-bar"}>
                <NavbarBrand href={"/"}>
                    <span className={"title-text"}>Operations Data and Management System</span>
                </NavbarBrand>
                <Container className={"justify-content-end"}>
                    <NavDropdown title={"Generate a Report"}>
                        <NavDropdown.Item href={"/upload"}>Upload a Dataset</NavDropdown.Item>
                        <NavDropdown.Item href={"/query"}>Query a Dataset</NavDropdown.Item>
                        <NavDropdown.Item href={"/generate"}>Generate a Dataset</NavDropdown.Item>
                    </NavDropdown>
                    <NavItem>
                        <Link to={"/documentation"}>
                            Documentation
                        </Link>
                    </NavItem>
                </Container>
            </Navbar>
        )
    }
}