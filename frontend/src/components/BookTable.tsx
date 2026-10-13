import Table from "react-bootstrap/Table"
import ApiCaller from "../apiCall/ApiCaller.ts";
import type Book from "../data/Book.ts";

type BookTableProps = {
    books? : Book[];
    hidden? : boolean;
}

export default function BookTable({books = [], hidden = false} : BookTableProps)
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
                    <tr key={book.id}>
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