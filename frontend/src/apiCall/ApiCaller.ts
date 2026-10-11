import type Book from "../data classes/Book.ts";
import {data} from "react-router-dom";
import UserInfo from "../data classes/UserInfo.ts";

export default class ApiCaller
{
    private static urlForApi : string = "https://localhost:7151/"
    private static urlForWebsite : string = "http://localhost:5173/";
    private static authorizedUrl : string = "http://localhost:5173/dashboard"

    private constructor() {}

    private static checkCommonStatuses(response : Response | null) : boolean
    {
        const isBaseUrl : boolean = document.baseURI == this.urlForWebsite;

        if (response == null)
        {
            return false;
        }
        if (response.status == 202)
        {
            console.log("User is authenticated.")
            if (isBaseUrl)
                window.location.replace(this.authorizedUrl);
            return true;
        }
        else if (response.status == 401)
        {
            console.log("User is unauthenticated.");
            if (!isBaseUrl)
                window.location.replace(this.urlForWebsite);
        }
        else
        {
            console.log("Server error: unable to connect/unknown error");
            if (!isBaseUrl)
                window.location.replace(this.urlForWebsite);
        }
        return false;
    }

    static async getBooks() : Promise<Book[]>
    {
        console.log("Retrieving books...")

        const response : Response = await fetch(
            "https://localhost:7151/api/books",
            {
                method: "GET",
                credentials: "include",
            }
        )
        console.log("Successfully retrieved books")
        return await response.json();
    }

    static async authenticate() : Promise<Response>
    {
        const response : Response = await fetch
        (
            "https://localhost:7151/api/login/auth",
            {
                method: "POST",
                credentials: "include",
            }
        );

        const isBaseUrl : boolean = document.baseURI == this.urlForWebsite;

        if (response.status == 202)
        {
            console.log("User is authenticated.")
            if (isBaseUrl)
                window.location.replace(this.authorizedUrl);
        }
        else if (response.status == 401)
        {
            console.log("User is unauthenticated.");
            if (!isBaseUrl)
                window.location.replace(this.urlForWebsite);
        }
        else
        {
            console.log("Server error: unable to connect/unknown error");
            if (!isBaseUrl)
                window.location.replace(this.urlForWebsite);
        }

        return response;
    }

    static async getCountOfBooks() : Promise<number>
    {
        console.log("Fetching count of books...");

        const response : Response = await fetch(
            "https://localhost:7151/api/books/count",
            {
                method: "GET",
                credentials: "include",
            }
        );

        const data : {count : number} = await response.json()
        if (response.ok)
        {
            console.log("Successfully fetched books count")
        }
        return data.count;
    }
    static async getEmailNameSurname() : Promise<UserInfo | null>
    {
        const base : string = "http://localhost:5173"

        const response: Response = await fetch
        (
            "https://localhost:7151/api/user/getinfo",
            {
                method: "GET",
                credentials: "include",
            }
        )
        if (response.status == 200)
        {
            let userInfo : UserInfo = await response.json();
            return userInfo;
        }
        if (response.status == 401)
        {
            console.log("User isn't logged in");
            window.location.replace(base);
        }
        if (response.status == 404)
        {
            console.log("User wasn't found in database");
            window.location.replace(base);
        }
        return null;
    }
}