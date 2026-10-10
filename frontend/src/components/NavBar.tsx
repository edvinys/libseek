import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Button, Form} from "react-bootstrap";
import {logout} from "../logout.ts";

function NavBar() {
    return (
        <Navbar expand="false" style={{backgroundColor: "aliceblue"}}>
            <Container>
                <Navbar.Brand href="/">Libseek</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ms-auto align-items-end">
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/about'>About</Nav.Link>
                        <Nav.Link onClick={logout} id={"logout-button"}>Log out </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;