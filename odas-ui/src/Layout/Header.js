import {Container, Navbar, NavbarBrand, NavDropdown, NavItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

import "./Styles.css";

export default class Header extends React.Component {
    render() {
        return (
            <Navbar expand={"lg"} variant={"light"} className={"nav-bar"}>
                <NavbarBrand href={"/"} className={"title-text"}>Operations Data and Management System</NavbarBrand>
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