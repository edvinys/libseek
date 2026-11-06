import BookTable from "../../components/BookTable.tsx";
import SearchBarButton from "../../components/SearchBarButton.tsx";
import {useEffect, useState} from "react";
import type Book from "../../data/Book.ts";
import ApiCaller, {type Result} from "../../apiCall/ApiCaller.ts";
import InfoAlert from "../../components/InfoAlert.tsx";
import useNotification from "../../hooks/useNotification.ts";
import type {Variant} from "react-bootstrap/cjs/types";
import Form from 'react-bootstrap/Form'
import Author from "../../data/Author.ts";

export default function BookRemove()
{
    const [books, setBooks] = useState<Book[]>([]);
    const [hideTable, setHideTable] = useState(true);
    const {notificationVisible, notificationText, showNotification} = useNotification();
    const [notificationVariant, setNotificationVariant] = useState<Variant>("warning");
    const [removeAuthor, setRemoveAuthor] = useState<boolean>(false);

    // rerender when a book gets removed
    useEffect(() : void =>
    {

    },[books])

    const onClick = async (book : Book) : Promise<void> =>
        {
            // TO CHECK
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
                        const response : Result = await ApiCaller.removeAuthor(author);
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

            function SuccessfullyRemoved() : void
            {
                setNotificationVariant("success");
                showNotification("Removed", 1500);
            }
        }


    async function handleSearch(title : string) : Promise<void>
    {
        const getBook : Book[] | null = await ApiCaller.getBook(title);

        if (getBook == null)
        {
            setHideTable(true);
            showNotification("Not found", 1500);
        }
        else
        {
            setBooks(getBook);
            setHideTable(false);
        }
    }

    return (
        <>
            <h4 className="mb-4">Remove book</h4>
            <SearchBarButton onSearch={handleSearch} onBadInputs={() => setHideTable(true)}/>
            <div style={{width: "70%", marginTop: "20px"}} hidden={books.length == 0 || hideTable}>
                <BookTable books={books} onClick={onClick}/>
                    <Form.Check type="checkbox" id="checkboxAuthor" style={{marginBottom: "20px"}}>
                        <Form.Check.Input type="checkbox" checked={removeAuthor}
                                          onChange={(e): void =>
                                              setRemoveAuthor(e.target.checked)}/>
                        <Form.Check.Label> Try remove author? </Form.Check.Label>
                    </Form.Check>
                <p> Click the user you want to remove. </p>
            </div>
            <div>
                <InfoAlert text={notificationText} visible={notificationVisible} variant={notificationVariant}/>
            </div>
        </>
    );
}