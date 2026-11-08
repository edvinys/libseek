import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {logout} from "../authentication/logout.ts";
import {useNavigate} from "react-router-dom";
import {NavDropdown} from "react-bootstrap";
import type {CSSProperties} from "react";
import logo from "../assets/libseek-logo-horizontal-color.svg"

type NavBarLayoutProps = {
    style?: CSSProperties;
}

function NavBar({style} : NavBarLayoutProps)
{
    const navigate = useNavigate();

    return (
        <Navbar expand="false" style={style}>
            <Container>
                <Navbar.Brand onClick={() => {navigate("")}}
                              style={{cursor: "pointer"}}>
                    <img alt="libseek" src={logo} style={{width: "120px", height:"auto"}} />
                </Navbar.Brand>
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