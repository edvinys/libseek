import AppTable from "../../components/AppTable.tsx";
import SearchBarButton from "../../components/SearchBarButton.tsx";
import {type JSX, useEffect, useState} from "react";
import type Book from "../../data/Book.ts";
import ApiCaller, {type Result} from "../../apiCall/ApiCaller.ts";
import InfoAlert from "../../components/InfoAlert.tsx";
import Form from 'react-bootstrap/Form'
import useBookRemoval from "../../hooks/useBookRemoval.ts";
import BookTable from "../../components/BookTable.tsx";

export default function BookRemove()
{
    const {books, setBooks, notificationVisible, showNotification,
        notificationVariant, removeAuthor, setRemoveAuthor,
        setNotificationVariant, notificationText, removeBook} = useBookRemoval()

    const [hideTable, setHideTable] = useState(true);

    // rerender when a book gets removed
    useEffect(() : void =>
    {

    },[books])

    const onClick = async (book : Book) : Promise<void> =>
        {
            await removeBook(book);
        }


    async function handleSearch(title : string) : Promise<void>
    {
        const getBook : Book[] | null = await ApiCaller.getBook(title);

        if (getBook == null)
        {
            setHideTable(true);
            showNotification("Not found", 1500);
        }
        else
        {
            setBooks(getBook);
            setHideTable(false);
        }
    }
    return (
        <>
            <h4 className="mb-4">Remove book</h4>
            <SearchBarButton onSearch={handleSearch} onBadInputs={() => setHideTable(true)}/>
            <div style={{width: "70%", marginTop: "20px"}} hidden={books.length == 0 || hideTable}>
                <BookTable books={books}/>
                <Form.Check type="checkbox" id="checkboxAuthor" style={{marginBottom: "20px"}}>
                    <Form.Check.Input type="checkbox" checked={removeAuthor}
                                      onChange={(e): void =>
                                          setRemoveAuthor(e.target.checked)}/>
                    <Form.Check.Label> Try remove author? </Form.Check.Label>
                </Form.Check>
                <p> Click the book you want to remove. </p>
            </div>
            <div>
                <InfoAlert text={notificationText} visible={notificationVisible} variant={notificationVariant}/>
            </div>
        </>
    );
}