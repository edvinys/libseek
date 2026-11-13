import NavBar from "../components/NavBar.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import ApiCaller from "../API/ApiCaller.ts";
import Footer from "../components/Footer.tsx";

export default function UserLayout()
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
            <NavBar
                style={{
                    background: "rgba(248, 246, 240, 0.6)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(230, 233, 242, 1)",
                }}
            />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}