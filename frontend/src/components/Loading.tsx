import {useEffect, useState} from "react";
import ApiCaller from "../apiCall/ApiCaller.ts"
import {LoadingSpinner} from "./LoadingSpinner.tsx";
import {SideBar} from "./SideBar.tsx";
import PencilCard from "./PencilCard.tsx";
import LoggedInPage from "./LoggedInPage.tsx";

export default function Loading()
{
    const[isLoading, setIsLoading] = useState<boolean>(true);
    useEffect((): void =>
    {
        async function isAuthenticated() : Promise<void>
        {
            let response : Response = await ApiCaller.authenticate(); // will redirect if not Auth

            setTimeout(() => {setIsLoading(!response.ok);}, 2000);
        }
        isAuthenticated()
    }, []);
    if (isLoading)
        return <LoadingSpinner />
    else
        return(<LoggedInPage />)
}