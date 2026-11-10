import type Author from "../data/Author.ts";
import AppTable from "./AppTable.tsx";
import type {JSX} from "react";

type authorTableProps =
    {
        authors : Author[];
        onClick?: (author : Author) => void;
    }

function headers() : JSX.Element[]
{
    return [<th>Author id</th>,
    <th>Author name</th>,
    <th>Author surname</th>,
    <th>Author birthdate</th>]
}


function typedValues(authors : Author[], onClick? : (author : Author) => void) : JSX.Element[]
{
    return authors.map((author : Author) =>
        (
        <tr key={author.id}
            onClick={(e): void => onClick ? onClick(author) : undefined}>
            <td> {author.id} </td>
            <td> {author.name} </td>
            <td> {author.surname} </td>
            <td> {author.birthdate ? "error" : author.birthdate} </td>
        </tr>
        ));
}

export default function AuthorTable({authors, onClick} : authorTableProps)
{
    return <AppTable values={authors} mappedValues={typedValues(authors, onClick)} headers={headers()} />
}