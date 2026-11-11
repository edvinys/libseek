import {type SubmitEvent, useState} from "react";
import Form from "react-bootstrap/esm/Form";
import {Button} from "react-bootstrap";
import User from "../data/User.ts";
import ApiCaller, {type Result} from "../apiCall/ApiCaller.ts";
import useNotification from "../hooks/useNotification.ts";
import InfoAlert from "../components/InfoAlert.tsx";
import type {Variant} from "react-bootstrap/cjs/types";

export default function RegisterForm()
{
    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");
    const {notificationVisible, notificationText, showNotification} = useNotification();
    const [notificationVariant, setNotificationVariant] = useState<Variant>("success");

    const handleSubmit = (event : SubmitEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        setValidated(true);
        const data = new FormData(form);

        if (!form.checkValidity())
        {
            return;
        }

        void Register();
        async function Register()
        {
            if (password != repeat) return;

            const name : string = String(data.get("registrationName") ?? "");
            const surname : string = String(data.get("registrationSurname") ?? "");
            const email : string = String(data.get("registrationEmail") ?? "");

            const user : User = new User(email, name, surname);
            const result : Result = await ApiCaller.registerUser(user, password);
            if (result.ok)
            {
                setNotificationVariant("success");
                showNotification("Success!", 1500);
            }

            else
            {
                setNotificationVariant("danger");
                showNotification("Error! " + result.error, 1500);
            }


        }

    };

    const mismatch : boolean = repeat.length > 0 && password != repeat;

    return <>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h3 className="text-center mb-4">Registration</h3>
            {/* Name */}
            <Form.FloatingLabel controlId="registrationName" label="Name*" className="mb-3">
                <Form.Control name="registrationName" type="text" placeholder="John" required />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid name.
                </Form.Control.Feedback>

            </Form.FloatingLabel>

            {/* Surname */}

            <Form.FloatingLabel controlId="registrationSurname" label="Surname*" className="mb-3">
                <Form.Control name="registrationSurname" type="text" placeholder="Doe" required />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid surname.
                </Form.Control.Feedback>
            </Form.FloatingLabel>

            {/* Email */}

            <Form.FloatingLabel controlId="registrationEmail" label="Email*" className="mb-3">
                <Form.Control name="registrationEmail" type="email" placeholder="Drama" required/>
                <Form.Control.Feedback type="invalid">
                    Please enter a valid email.
                </Form.Control.Feedback>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </Form.FloatingLabel>

            {/* Password */}

            <Form.FloatingLabel
                controlId="registrationPassword"
                label="Password*"
                className="mb-3">
                <Form.Control
                    name="registrationPassword"
                    type="password"
                    placeholder="Drama"
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
                <Form.Control.Feedback type="invalid">
                    Please enter a valid password.
                </Form.Control.Feedback>
            </Form.FloatingLabel>

            {/* Repeat password */}

            <Form.FloatingLabel
                controlId="registrationRepeatPassword"
                label="Repeat password*"
                className="mb-3">
                <Form.Control
                    name="registrationRepeatPassword"
                    type="password"
                    placeholder="Drama"
                    onChange={(e) => setRepeat(e.target.value)}
                    isInvalid={mismatch}
                    required/>
                <Form.Control.Feedback type="invalid">
                    Passwords don't match.
                </Form.Control.Feedback>
            </Form.FloatingLabel>

            {/* Button */}
            <Button type="submit"
                    variant="outline-primary"
                    className={"mb-3 d-block mx-auto rounded-pill"} disabled={mismatch && !password}>
                Register
            </Button>
        </Form>
        <div>
            <InfoAlert text={notificationText} visible={notificationVisible} variant={notificationVariant}/>
        </div>
    </>
}