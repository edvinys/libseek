import NavBar from "../components/NavBar.tsx";
import {Outlet} from "react-router-dom";

export default function NavBarLayout()
{
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    )
}