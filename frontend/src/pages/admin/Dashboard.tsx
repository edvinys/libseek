import PencilCard from "../../components/PencilCard.tsx";
import AppTable from "../../components/AppTable.tsx";
import {type JSX, useEffect, useState} from "react";
import type Book from "../../data/Book.ts";
import ApiCaller from "../../API/ApiCaller.ts";
import BookTable from "../../components/admin/BookTable.tsx";

export default function Dashboard()
{
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() =>
    {
        async function getBooks(): Promise<void>
        {
            const books : Book[] = await ApiCaller.getBooks();
            setBooks(books);
        }
        void getBooks();
    }, [])

    return(
        <>
            <h4 className="mb-4">Dashboard</h4>
            <PencilCard/>
            <BookTable books={books}/>
        </>
    )
}
