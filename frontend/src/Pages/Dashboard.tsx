import PencilCard from "../components/PencilCard.tsx";
import BookTable from "../components/BookTable.tsx";
import {useEffect, useState} from "react";
import type Book from "../data/Book.ts";
import ApiCaller from "../apiCall/ApiCaller.ts";

export default function Dashboard()
{
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() =>
    {
        void ApiCaller.getBooks().then(setBooks);
    }, [])

    return(
        <>
            <h4 className="mb-4">Dashboard</h4>
            <PencilCard/>
            <BookTable books={books}></BookTable>
        </>
    )
}
