import React from 'react';
import ReactDOM from 'react-dom';
import {Navbar, NavbarBrand, NavDropdown, Nav, NavItem, Container} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import NavLink from "react-bootstrap/NavLink";
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from './Layout/Styles.css'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            //page container
            <Navbar fixed={'top'} variant={'light'}>
                <NavbarBrand href={"#index"}>Operations Data and Management System</NavbarBrand>
                <Container className={'justify-content-end'}>
                    <NavDropdown title={"Generate a Report"}>
                        <NavDropdown.Item>
                            <NavLink>Dataset</NavLink>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <NavLink>
                                Query a Dataset
                            </NavLink>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <NavLink>
                                Generate a Dataset w/ COSMOS
                            </NavLink>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavItem className={'justify-content-end'}>
                        <NavLink>
                            About
                        </NavLink>
                    </NavItem>
                </Container>
            </Navbar>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));