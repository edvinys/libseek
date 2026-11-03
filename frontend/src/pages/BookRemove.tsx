import BookTable from "../components/BookTable.tsx";
import SearchBarButton from "../components/SearchBarButton.tsx";
import {useEffect, useState} from "react";
import type Book from "../data/Book.ts";
import ApiCaller from "../apiCall/ApiCaller.ts";
import InfoAlert from "../components/InfoAlert.tsx";
import useNotification from "../hooks/useNotification.ts";
import type {Variant} from "react-bootstrap/cjs/types";

export default function BookRemove()
{
    const [books, setBooks] = useState<Book[]>([]);
    const [hideTable, setHideTable] = useState(true);
    const [wasFound, setWasFound] = useState(true);
    const {notificationVisible, notificationText, showNotification} = useNotification();
    const [notificationVariant, setNotificationVariant] = useState<Variant>("");

    // rerender when a book gets removed
    useEffect(() : void =>
    {

    },[books])

    const onClick = async (book : Book) : Promise<void> =>
        {
            const success : boolean = await ApiCaller.removeBook(book);
            if (success)
            {
                setNotificationVariant("success");
                showNotification("Removed", 1500);
                books.splice(books.indexOf(book), 1);
            }
            else
            {
                setNotificationVariant("warning");
                showNotification("Failed to Remove", 1500);
            }

        }


    async function handleSearch(title : string) : Promise<void>
    {
        const getBook : Book[] | null = await ApiCaller.getBook(title);

        if (getBook == null)
        {
            setHideTable(true);
            setWasFound(false);
            showNotification("Not found", 1500);
        }
        else
        {
            setBooks(getBook);
            setHideTable(false);
            setWasFound(true);
        }
    }

    return(
        <>
            <h4 className="mb-4">Remove book</h4>
            <SearchBarButton onSearch={handleSearch} onBadInputs={() => setHideTable(true)} />
            <div style={{width: "70%", marginTop: "20px"}}>
                <BookTable books={books} hidden={books.length == 0 || hideTable} onClick={onClick}/>
                <p hidden={books.length == 0 || hideTable}> Click the user you want to remove. </p>
            </div>
            <div>
                <InfoAlert text={notificationText} visible={notificationVisible}/>
            </div>
       </>
    )
}