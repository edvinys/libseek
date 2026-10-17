import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {logout} from "../authentication/logout.ts";
import {useNavigate} from "react-router-dom";
import {NavDropdown} from "react-bootstrap";

function NavBar()
{
    const navigate = useNavigate();

    return (
        <Navbar expand="false" style={{backgroundColor: "aliceblue"}}>
            <Container>
                <Navbar.Brand href="/">libseek</Navbar.Brand>
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => navigate("/")}>Login</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate("/about")}>About</NavDropdown.Item>
                    <NavDropdown.Item onClick={logout} id={"logout-button"}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Container>
        </Navbar>
    );
}

export default NavBar;