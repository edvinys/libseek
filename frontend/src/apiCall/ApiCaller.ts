import type Book from "../data/Book.ts";
import User from "../data/User.ts";
import Author from "../data/Author.ts";
import mappers from "../apiCall/mappers.ts";

export type Result<T = never> =
    {ok: true, fetchResult? : T | T[]} | {ok: false, error: string};

// TO FIX: Remake returns with type Result.

export default class ApiCaller
{
    private static urlForApi : string = "https://localhost:7151/"

    private constructor() {}

    //==================AUTHENTICATION=========================//
    static async authenticate() : Promise<Response>
    {
        const response : Response = await fetch(
            this.urlForApi + "api/auth",
            {
                method: "GET",
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

    //==================USER=========================//
    static async getEmailNameSurname() : Promise<User | null>
    {
        const response: Response = await fetch(
            this.urlForApi + "api/user",
            {
                method: "GET",
                credentials: "include",
            }
        )
        if (response.status == 200)
        {
            return await response.json();
        }
        if (response.status == 401)
        {
            console.log("User isn't logged in when fetching getEmailNameSurname");
        }
        if (response.status == 404)
        {
            console.log("User wasn't found in database when fetching getEmailNameSurname");
        }
        return null;
    }

    static async registerUser(user : User, password : string) : Promise<Result>
    {
        const userCreds = {
            name : user.name,
            surname : user.surname,
            email : user.email,
            password : password
        }

        try
        {
            const response : Response = await fetch(
                this.urlForApi + "api/auth/register",
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify(userCreds),
                    headers: {
                        "Content-Type": "application/json",
                        }
                }

            )
            if (response.ok)
                return {ok: true}
            else
                return {ok: false, error: await response.text()}


        }
        catch (e)
        {
            console.log("Error trying to register user: " + user.name + user.surname);
        }
        return {ok: false, error: "It is likely that the server is offline."};
    }

    //==================BOOKS=========================//
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
    static async getBooksByTitle(title : string ) : Promise<Book[] | null>
    {
        console.log(`Retrieving book by title: ${title}...`)

        const params = new URLSearchParams({ title: title });

        const response : Response = await fetch(
            this.urlForApi + `api/books?${params}`,
            {
                method: "GET",
                credentials: "include",
            }
        )
        console.log("Successfully retrieved book by id: " + title);

        if (response.ok)
        {
            return await response.json();
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
            let dataString : string | null = mappers.dateFromTypeScriptToCSharp(book.authorBirthDate);

            let bookRecord  =
            {
                Title: book.title,
                Genre: book.genre,
                AuthorName: book.authorName,
                AuthorSurname: book.authorSurname,
                authorBirthDate: dataString,
            }

            const json: string = JSON.stringify(bookRecord);

            const response : Response = await fetch(
                this.urlForApi + `api/books`,
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
    static async removeBook(book : Book) : Promise<boolean>
    {
       try
       {
           console.log("Trying to remove book: " + book.title + " with id: " + book.id);

           const json : string = JSON.stringify(book);
           const response : Response = await fetch(
               this.urlForApi + `api/books`,
               {
                   method: "DELETE",
                   credentials: "include",
                   headers:
                       {
                           "Content-Type": "application/json",
                       },
                   body: json
               }
           )

           if (response.ok)
           {
               console.log("Successfully removed book: " + book.title);
               return true;
           }
       }
       catch(e)
       {
           console.log("Error trying to remove book: " + book.title);
       }

       return false;
    }

    //==================AUTHORS=========================//
    static async addAuthor(author : Author) : Promise<Result>
    {
        try
        {
            console.log("Trying to add author: " + author.name + " " + author.surname)

            const json : string = JSON.stringify(mappers.toAuthorDto(author));

            const response : Response = await fetch(
                this.urlForApi + `api/authors`,
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

            if (response.ok)
                return {ok: true}
            else
                return {ok: false, error:  await response.text()};
        }
        catch(e)
        {
            console.log("Error trying to remove author: " + author.name + author.surname);
            console.log("It is likely that the server is offline.");
        }
        return {ok: false, error: "It is likely that the server is offline."}
    }
    static async removeAuthor(author : Author) : Promise<Result>
    {
        try
        {
            console.log("Trying to remove author: " + author.name + " " + author.surname);

            const json : string = JSON.stringify(mappers.toAuthorDto(author));
            const response : Response = await fetch(
                this.urlForApi + `api/authors`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers:
                        {
                            "Content-Type": "application/json",
                        },
                    body: json
                }
            )
            if (response.ok)
                return {ok: true};
            else
                return {ok: false, error: await response.text()};
        }
        catch (e)
        {
            console.log("Error trying to remove author: " + author.name + author.surname);
        }
        return {ok: false, error: "It is likely that the server is offline."};
    }

    static async getAuthorsByNameOrSurname(nameOrSurname : string) : Promise<Result<Author>>
    {
        try
        {
            console.log("Trying to get authors: " + nameOrSurname);
            const params = new URLSearchParams({ nameOrSurname: nameOrSurname });

            const response : Response = await fetch(
                this.urlForApi + `api/authors?${params}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            )
            if (response.ok)
                return {ok: true, fetchResult: await response.json()};
            else
                return {ok: false, error: await response.text()};
        }
        catch(e)
        {
            console.log("Error trying to fetch author: " + nameOrSurname);
        }

        return {ok: false, error: "It is likely that the server is offline."};
    }

}