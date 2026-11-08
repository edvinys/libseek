import {type SubmitEvent, useState} from "react";
import useNotification from "../../hooks/useNotification.ts";
import type {Variant} from "react-bootstrap/cjs/types";
import type Author from "../../data/Author.ts";
import ApiCaller, {type Result} from "../../apiCall/ApiCaller.ts";
import AppForm from "../../components/AppForm.tsx";
import InfoAlert from "../../components/InfoAlert.tsx";

export default function RemoveAuthorForm()
{
    // TO FIX: if there are 2 authors with the same name and surname, it will pick the first one.
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

        // try to remove author
        setIsLoading(true);
        const data = new FormData(form);
        const author : Author =
            {
                id : null,
                name : String(data.get("authorName") ?? ""),
                surname : String(data.get("authorSurname") ?? ""),
                birthdate : null
            }
        void removeAuthor();

        async function removeAuthor(): Promise<void>
        {
            const result : Result = await ApiCaller.removeAuthor(author);
            if (result.ok)
            {
                setNotificationVariant("success");
                showNotification("Successfully removed", 1500);
                setIsLoading(false);
                return;
            }

            setNotificationVariant("danger");
            showNotification("Could not remove. " + result.error, 1500);
            setIsLoading(false);
            return
        }
    }
    return (
        <>
            <AppForm onSubmit={handleSubmit}
                     validated={validated}
                     buttonLabel="Remove author"
                     isLoading={isLoading}>
                <AppForm.Check
                    label="Author name"
                    id="authorName"
                    feedback="Please enter the authors name."
                    required={true}
                    placeholder="John"/>
                <AppForm.Check label="Author surname"
                               id="authorSurname"
                               feedback={"Please enter the authors surname."}
                               required={true}
                               placeholder="Doe"/>
            </AppForm>
            <InfoAlert text={notificationText} visible={notificationVisible} variant={notificationVariant} />
        </>
    );
}