import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Button, InputGroup} from "react-bootstrap";
import {type SubmitEvent, useState} from "react";
import type Book from "../data/Book.ts";
import ApiCaller from "../apiCall/ApiCaller.ts";
import "react-bootstrap/"
import DateRange from "../components/DateRange.tsx";

export default function AddBookForm()
{
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<Date | null>(null);


    const handleSubmit = (event : SubmitEvent<HTMLFormElement>) : void =>
    {
        // validity logic
        const form = event.currentTarget;
        event.preventDefault();
        if (!form.checkValidity())
        {
            return;
        }

        // try to add book
        setIsLoading(true);
        const data = new FormData(form);
        const book : Book =
        {
            id: "-1",
            title: String(data.get("bookTitle") ?? ""),
            genre: String(data.get("bookGenre") ?? ""),
            authorName : String(data.get("authorName") ?? ""),
            authorSurname : String(data.get("authorSurname") ?? ""),
            authorBirthDate : date
        }

        async function tryAddBook(): Promise<void>
        {
            const success : boolean = await ApiCaller.addBook(book);
            setIsLoading(false);
            setValidated(true);
        }

        void tryAddBook();
    }
    return (
        <>
            <Form className="mb-3" noValidate validated={validated} onSubmit={handleSubmit}>

                {/* Book title */}

                <Form.FloatingLabel controlId="floatingInput" label="Book title*" className="mb-3">
                    <Form.Control name="bookTitle" type="text" placeholder="The Glass Bridge at Midnight" required />
                    <Form.Control.Feedback type="invalid">
                        Please enter a book title.
                    </Form.Control.Feedback>
                </Form.FloatingLabel>

                {/* Book genre */}

                <Form.FloatingLabel controlId="floatingInput" label="Book genre*" className="mb-3">
                    <Form.Control name="bookGenre" type="text" placeholder="Drama" required />
                    <Form.Control.Feedback type="invalid">
                        Please enter a book genre.
                    </Form.Control.Feedback>
                </Form.FloatingLabel>

                {/* Author name */}

                <Form.FloatingLabel controlId="floatingInput" label="Author name*" className="mb-3">
                    <Form.Control name="authorName" type="text" placeholder="Drama" required/>
                    <Form.Control.Feedback type="invalid">
                        Please enter the authors name.
                    </Form.Control.Feedback>
                </Form.FloatingLabel>

                {/* Author surname */}

                <Form.FloatingLabel controlId="floatingInput" label="Author surname*" className="mb-3">
                    <Form.Control name="authorSurname" type="text" placeholder="Drama" required/>
                    <Form.Control.Feedback type="invalid">
                        Please enter the authors surname.
                    </Form.Control.Feedback>
                </Form.FloatingLabel>

                {/* Author birthdate */}

                <DateRange onDateChange={(date) => {setDate(date)}} />

                {/* Button */}
                <Button type="submit"
                        variant="outline-primary"
                        className={"mb-3 d-block mx-auto"}
                        disabled={isLoading}>{isLoading ? "Loading..." : "Add book"}</Button>
            </Form>
        </>
    );
}