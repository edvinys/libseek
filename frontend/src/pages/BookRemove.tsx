import BookTable from "../components/BookTable.tsx";
import SearchBarButton from "../components/SearchBarButton.tsx";
import {useState} from "react";
import type Book from "../data/Book.ts";
import ApiCaller from "../apiCall/ApiCaller.ts";
import InfoAlert from "../components/InfoAlert.tsx";
import useNotification from "../hooks/useNotification.ts";

export default function BookRemove()
{
    const [books, setBooks] = useState<Book[]>([]);
    const [hideTable, setHideTable] = useState(true);
    const [wasFound, setWasFound] = useState(true);
    const onClick = async (book : Book) : void =>
        {
            await ApiCaller.removeBook(book);
        }

    const {notificationVisible, notificationText, showNotification} = useNotification();

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
                <BookTable books={books} hidden={hideTable} onClick={onClick}/>
            </div>
            <div style={{width:'20%', position:"fixed", bottom:"20px", right:"20px"}}>
                <InfoAlert text={notificationText} visible={notificationVisible}/>
            </div>
       </>
    )
}