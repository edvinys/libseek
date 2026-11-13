import {useState} from "react";
import useNotification from "./useNotification.ts";
import type {Variant} from "react-bootstrap/cjs/types";
import type Author from "../data/Author.ts";
import ApiCaller, {type Result} from "../API/ApiCaller.ts";

export default function useAuthorRemoval()
{
    // TO FIX: if there are 2 authors with the same name and surname, it will pick the first one.
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<Date | null>(null);
    const {notificationVisible, showNotification, notificationText} = useNotification();
    const [notificationVariant, setNotificationVariant] = useState<Variant>("");

    const handleSubmit : void
    {
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
}