import {SideBar} from "../components/SideBar.tsx";
import PencilCard from "../components/PencilCard.tsx";
import BookTable from "../components/BookTable.tsx";
import SearchBarButton from "../components/SearchBarButton.tsx";
import {useEffect, useState} from "react";
import type Book from "../data/Book.ts";
import ApiCaller from "../apiCall/ApiCaller.ts";

export default function BookRemove()
{
    const [book, setBook] = useState<Book[]>([]);
    const [hideTable, setHideTable] = useState(true);

    async function handleSearch(title : string) : Promise<void>
    {
        const getBook : Book = await ApiCaller.getBook(title);
        console.log(typeof(getBook));
        if (typeof(getBook) == "undefined")
        {
            setHideTable(true);
        }
        else
        {
            setBook([getBook]);
            setHideTable(false);
        }
    }

    return(
        <>
            <h4 className="mb-4">Remove book</h4>
            <SearchBarButton onSearch={handleSearch} />
            <div style ={{width: "70%", marginTop: "20px"}}>
                <BookTable books={book} hidden ={hideTable} />
            </div>
        </>
    )
}