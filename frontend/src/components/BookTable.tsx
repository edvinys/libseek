import type Book from "../data/Book.ts";
import type {JSX} from "react";
import AppTable from "./AppTable.tsx";

export type BookTableProps = {
    books : Book[];
    hidden? : boolean;
    onClick? : (book : Book) => void;
}

function mapValues(books : Book[], onClick? : (book : Book) => void) : JSX.Element[]
{
    return books.map((book) : JSX.Element =>
        (
            <tr key={book.id}
                onClick={(e) => onClick ? onClick(book) : undefined}>
                <td >{book.id}</td>
                <td>{book.title}</td>
                <td>{book.genre}</td>
                <td>{book.authorName + " " + book.authorSurname}</td>
            </tr>
        ))
}
function headers() : JSX.Element[]
{
    return [
        <th>ID</th>,
        <th>Title</th>,
        <th>Genre</th>,
        <th>Author</th>];
}

export default function BookTable({books = [], hidden = books.length == 0, onClick = undefined} : BookTableProps)
{
    return <AppTable values={books} headers={headers()} mappedValues={mapValues(books, onClick)} />
}