import type Book from "../data/Book.ts";
import {data} from "react-router-dom";
import UserInfo from "../data/UserInfo.ts";

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
            return true;
        }
        else if (response.status == 401)
        {
            console.log("User is unauthenticated.");
        }
        else
        {
            console.log("Server error: unable to connect/unknown error");
        }
        return false;
    }

    static async authenticate() : Promise<Response>
    {
        const response : Response = await fetch
        (
            this.urlForApi + "api/login/auth",
            {
                method: "POST",
                credentials: "include",
            }
        );

        if (response.status == 202)
        {
            console.log("User is authenticated.")
        }
        else if (response.status == 401)
        {
            console.log("User is unauthenticated.");
        }
        else
        {
            console.log("Server error: unable to connect/unknown error");
        }

        return response;
    }

    static async getCountOfBooks() : Promise<number>
    {
        console.log("Fetching count of books...");

        const response : Response = await fetch(
            this.urlForApi + "api/books/count",
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
            this.urlForApi + "api/user/getinfo",
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
        }
        if (response.status == 404)
        {
            console.log("User wasn't found in database");
        }
        return null;
    }

    static async getBooks() : Promise<Book[]>
    {
        console.log("Retrieving books...")

        const response : Response = await fetch(
            this.urlForApi + "api/books",
            {
                method: "GET",
                credentials: "include",
            }
        )
        console.log("Successfully retrieved books")
        return await response.json();
    }
    static async getBook(title : string ) : Promise<Book | null>
    {
        console.log(`Retrieving book by title: ${title}...`)

        const response : Response = await fetch(
            this.urlForApi + `api/books/get/${title}`,
            {
                method: "GET",
                credentials: "include",
            }
        )
        console.log("Successfully retrieved book by id: " + title);

        if (response.ok)
        {
            return response.json();
        }
        else
        {
            return null;
        }
    }
    static async addBook(book : Book) : Promise<boolean>
    {
        try
        {
            console.log("Trying to add book: " + book.title);
            let dataString : string | undefined = undefined;

            if (book.authorBirthDate)
            {
                if (book.authorBirthDate?.getMonth() + 1 > 10)
                {
                    dataString =
                        book.authorBirthDate?.getFullYear() + "-" +
                        (book.authorBirthDate?.getMonth() + 1) + "-" +
                        book.authorBirthDate?.getDate();
                }
                else
                {
                    dataString =
                        book.authorBirthDate?.getFullYear() + "-" +
                        (book.authorBirthDate?.getMonth() + 1) + "-" +
                        book.authorBirthDate?.getDate();
                }
            }


            let bookRecord  =
            {
                Title: book.title,
                Genre: book.genre,
                AuthorName: book.authorName,
                AuthorSurname: book.authorSurname,
                authorBirthDate: dataString ? dataString : null,
            }

            const json: string = JSON.stringify(bookRecord);

            const response : Response = await fetch(
                this.urlForApi + `api/books/add`,
                {
                    method: "POST",
                    credentials: "include",
                    headers:
                        {
                            "Content-Type": "application/json",
                        },
                    body: json
                }
            )

            if (response.status == 200)
            {
                console.log("Successfully added book: " + book.title)
                return true;
            }
            if (response.status == 409)
            {
                console.log("Conflict error trying to add book: " + book.title);
                console.log("Backend response: " + await response.text())
            }
            else if (response.status == 400)
            {
                console.log("Bad request on book: " + book.title);
                console.log("Backend response: " + await response.text());
            }
            return false;
        }
        catch(e)
        {
            console.log("Error trying to add book: " + book.title);
            console.log("It is likely that the server is offline.");
            return false;
        }
    }
}