import Form from 'react-bootstrap/Form';
import {Button, InputGroup} from "react-bootstrap";
import {type SubmitEvent, useState} from "react";
import type Book from "../../data/Book.ts";
import ApiCaller from "../../API/ApiCaller.ts";
import "react-bootstrap/"
import DateRange from "../../components/DateRange.tsx";
import useNotification from "../../hooks/useNotification.ts";
import InfoAlert from "../../components/InfoAlert.tsx";
import type {Variant} from "react-bootstrap/cjs/types";
import AppForm from "../AppForm.tsx";

export default function AddBookForm()
{
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<Date | null>(null);
    const {notificationVisible, showNotification, notificationText} = useNotification();
    const [notificationVariant, setNotificationVariant] = useState<Variant>("");

    const handleSubmit = (event : SubmitEvent<HTMLFormElement>) : void =>
    {
        // validity logic
        const form = event.currentTarget;
        event.preventDefault();
        setValidated(true);
        if (!form.checkValidity())
        {
            return;
        }

        // try to add book
        setIsLoading(true);
        const data = new FormData(form);
        const book : Book =
        {
            id: null,
            title: String(data.get("bookTitle") ?? ""),
            genre: String(data.get("bookGenre") ?? ""),
            authorName : String(data.get("authorName") ?? ""),
            authorSurname : String(data.get("authorSurname") ?? ""),
            authorBirthDate : date
        }
        void tryAddBook();

        async function tryAddBook(): Promise<void>
        {
            const success : boolean = await ApiCaller.addBook(book);
            if (success)
            {
                setNotificationVariant("success");
                showNotification("Successfully added", 1500);
                setIsLoading(false);
            }
            else
            {
                setNotificationVariant("warning");
                showNotification("There was an error.", 1500);
                setIsLoading(false);
            }
        }
    }
    return (
        <>
            <AppForm onSubmit={handleSubmit}
                     validated={validated}
                     buttonLabel="Add book"
                     isLoading={isLoading}
                     hideDateRange={false}
                     onDateChange={(date : Date | null) => {setDate(date)}}>
                <AppForm.Check
                    label="Book title"
                    id="bookTitle"
                    feedback="Please enter a book title."
                    required={true}
                    placeholder="The Glass Bridge at Midnight"/>
                <AppForm.Check label="Book genre"
                               id="bookGenre"
                               feedback={"Please enter a book genre."}
                               required={true}
                               placeholder="Drama"/>
                <AppForm.Check label="Author name"
                               id="authorName"
                               required={false}
                               placeholder={"John"} />
                <AppForm.Check label="Author surname"
                               id="authorSurname"
                               required={false}
                               placeholder={"Doe"} />
            </AppForm>
            <InfoAlert text={notificationText} visible={notificationVisible} variant={notificationVariant} />
        </>
    );
}
