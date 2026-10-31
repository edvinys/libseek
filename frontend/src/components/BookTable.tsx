import Table from "react-bootstrap/Table"
import ApiCaller from "../apiCall/ApiCaller.ts";
import type Book from "../data/Book.ts";

export type BookTableProps = {
    books? : Book[];
    hidden? : boolean;
    onClick? : (book : Book) => void;
}

export default function BookTable({books = [], hidden = false, onClick = undefined} : BookTableProps)
{
    if (hidden)
        return <></>

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Author</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book) =>
                (
                    <tr key={book.id}
                        onClick={(e) => onClick ? onClick(book) : ""}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.genre}</td>
                        <td>{book.authorName + book.authorSurname}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}