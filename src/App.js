import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Routes from "./Routes.js";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="App container">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><Link to="/">Lionel Feliho</Link></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="www.linkedin.com/in/lionel-feliho-650437134/">Linkedin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/FELIHO/">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav>
            <LinkContainer to="/signup">
              <NavItem className="NavItemSign" >Sign up &nbsp;</NavItem>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/signin">
              <NavItem className="NavItemSign">Sign in</NavItem>
            </LinkContainer>
          </Nav>
        </Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default Example;