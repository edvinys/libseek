import {useEffect, useState} from "react";
import ApiCaller from "../apiCall/ApiCaller.ts"
import {LoadingSpinner} from "./LoadingSpinner.tsx";
import {type NavigateFunction, Outlet, useNavigate} from "react-router-dom";
import {SideBar} from "./SideBar.tsx";

export default function LoadingLayout()
{
    const[isLoading, setIsLoading] = useState<boolean>(true);
    let navigate : NavigateFunction = useNavigate();

    useEffect((): void =>
    {
        async function isAuthenticated() : Promise<void>
        {
            let response : Response = await ApiCaller.authenticate();
            if (!response.ok)
                navigate("/", {replace : true})

            setTimeout(() => {setIsLoading(!response.ok);}, 2000);
        }
        isAuthenticated()
    }, []);
    if (isLoading)
        return <LoadingSpinner />
    else
        return(
            <div className="d-flex min-vh-100">
            <SideBar />
            <main className="flex-grow-1 p-4 bg-body-tertiary">
                <Outlet/>
            </main>
        </div>)
}