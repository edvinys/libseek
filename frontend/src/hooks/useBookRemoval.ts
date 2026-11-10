import ApiCaller, {type Result} from "../apiCall/ApiCaller.ts";
import Author from "../data/Author.ts";
import useNotification from "./useNotification.ts";
import {useState} from "react";
import type {Variant} from "react-bootstrap/cjs/types";
import type Book from "../data/Book.ts";

export default function useBookRemoval()
{
    const [books, setBooks] = useState<Book[]>([]);
    const {notificationVisible, notificationText, showNotification} = useNotification();
    const [notificationVariant, setNotificationVariant] = useState<Variant>("warning");
    const [removeAuthor, setRemoveAuthor] = useState<boolean>(false);

    async function removeBook(book: Book): Promise<void>
    {
        const success : boolean = await ApiCaller.removeBook(book);
        if (success)
        {
            books.splice(books.indexOf(book), 1);
            setBooks(books);

            let outerMessage : string = "The id we received from our end was not valid."
            if (removeAuthor)
            {
                if (typeof book.id == "string")
                {
                    const id : number = Number.parseInt(book.id);
                    const author : Author = new Author(id, book.authorName, book.authorSurname);
                    const response : Result<Author> = await ApiCaller.removeAuthor(author);
                    if (response.ok)
                    {
                        SuccessfullyRemoved();
                        return;
                    }
                    outerMessage = response.error;
                }
            }
            else
            {
                SuccessfullyRemoved();
                return;
            }
            setNotificationVariant("light");
            showNotification("Removed book, but author wasn't able to be removed. " + outerMessage, 1500);
        }
        else
        {
            showNotification("Failed to Remove", 1500);
        }

    }

    function SuccessfullyRemoved() : void
    {
        setNotificationVariant("success");
        showNotification("Removed", 1500);
    }

    return {
        books: books,
        setBooks,
        notificationVisible,
        notificationText,
        showNotification,
        notificationVariant,
        setNotificationVariant,
        removeAuthor,
        setRemoveAuthor,
        removeBook};
}