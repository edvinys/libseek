import NavBar from "../components/NavBar.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import ApiCaller from "../apiCall/ApiCaller.ts";

export default function NavBarLayout()
{
    const navigate = useNavigate();

    useEffect((): void =>
    {
        async function isAuthenticated() : Promise<void>
        {
            let response : Response = await ApiCaller.authenticate();
            if (response.ok)
                navigate("/dashboard", {replace : true})
        }
        void isAuthenticated()
    }, []);
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    )
}