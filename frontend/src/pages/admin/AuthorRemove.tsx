import InfoAlert from "../../components/InfoAlert.tsx";
import ApiCaller, {type Result} from "../../apiCall/ApiCaller.ts";
import type Author from "../../data/Author.ts";
import {useEffect, useState} from "react";
import useNotification from "../../hooks/useNotification.ts";
import type {Variant} from "react-bootstrap/cjs/types";
import useBookRemoval from "../../hooks/useBookRemoval.ts";
import type Book from "../../data/Book.ts";
import SearchBarButton from "../../components/SearchBarButton.tsx";
import BookTable from "../../components/BookTable.tsx";
import Form from "react-bootstrap/esm/Form";
import AuthorTable from "../../components/AuthorTable.tsx";

export default function AuthorRemove()
{
    // TO FIX: if there are 2 authors with the same name and surname, it will pick the first one.
    const [authors, setAuthors] = useState<Author[]>([]);
    const {notificationVisible, notificationText, showNotification} = useNotification();
    const [notificationVariant, setNotificationVariant] = useState<Variant>("warning");
    const [removeAuthor, setRemoveAuthor] = useState<boolean>(false);

    const [hideTable, setHideTable] = useState(true);

    // rerender when a book gets removed
    useEffect(() : void =>
    {

    },[authors])

    async function onClick(author : Author) : Promise<void>
    {
        const result : Result<Author> = await ApiCaller.removeAuthor(author);

        if (result.ok)
        {
            authors.splice(authors.indexOf(author), 1);
            setAuthors(authors);

            showNotification("Successfully removed", 1500);
        }
        else
        {
            showNotification("Failed to remove author. " + result.error, 1500);
        }
    }


    async function onSearch(authorNameOrSurname : string) : Promise<void>
    {
        const result : Result<Author>  = await ApiCaller.getAuthorsByNameOrSurname(authorNameOrSurname);

        if (!result.ok)
        {
            showNotification("Couldn't find anything." + result.error, 1500);
            return;
        }
        else
        {
            if (Array.isArray(result.fetchResult))
            {
                setAuthors(result.fetchResult);
                setHideTable(false);
            }
        }
    }

    return <>
        <h4 className="mb-4">Remove author</h4>
        <SearchBarButton onSearch={onSearch} onBadInputs={() => setHideTable(true)}/>
        <div style={{width: "70%", marginTop: "20px"}} hidden={authors.length == 0 || hideTable}>
            <AuthorTable authors={authors} onClick={onClick}/>
            <p> Click the Author you want to remove. </p>
        </div>
        <div>
            <InfoAlert text={notificationText} visible={notificationVisible} variant={notificationVariant}/>
        </div>
    </>;
}