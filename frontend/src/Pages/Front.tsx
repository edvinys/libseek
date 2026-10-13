import NavBar from "../components/NavBar.tsx";
import {StrictMode} from "react";
import Login from "../components/Login.tsx";

export default function Front()
{
    return(<>
        <NavBar />
        <Login></Login>
    </>)
}