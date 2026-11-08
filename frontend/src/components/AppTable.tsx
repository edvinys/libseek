import Table from "react-bootstrap/Table"
import ApiCaller from "../apiCall/ApiCaller.ts";
import type Book from "../data/Book.ts";
import {Children, isValidElement, type JSX, type ReactNode} from "react";

export type AppTableProps<T> = {
    values : T[];
    /** Should return a values.map() function, see example in where this function came from */
    /* Mapped values example:
            {books.map((book) : JSX.Element =>
                (
                    <tr key={book.id}
                        onClick={(e) => onClick ? onClick(book) : undefined}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.genre}</td>
                        <td>{book.authorName + " " + book.authorSurname}</td>
                    </tr>
                ))}
    */
    mappedValues: JSX.Element[];
    /** Headers to use for the table, should be in this format: `<th>[SOME VALUE HERE]</th>`*/
    headers: JSX.Element[];
    hidden? : boolean;
}

export default function AppTable<T>({values = [], mappedValues,
                                        hidden = values.length == 0, headers} : AppTableProps<T>)
{
    if (hidden)
        return <></>
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                {headers}
            </tr>
            </thead>
            <tbody>
                {mappedValues}
            </tbody>
        </Table>
    )
}