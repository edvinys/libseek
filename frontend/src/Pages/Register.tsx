import {Link} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DateRange from "../components/DateRange.tsx";
import {Button} from "react-bootstrap";
import {type SubmitEvent, useState} from "react";

export default function Register()
{
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event : SubmitEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (!form.checkValidity())
            return;

        setValidated(true);
    };

    return <>
        <Form className="form-center-width-limit"
              noValidate validated={validated} onSubmit={handleSubmit}>
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

            <Form.FloatingLabel controlId="registrationPassword" label="Password*" className="mb-3">
                <Form.Control name="registrationPassword" type="password" placeholder="Drama" required/>
                <Form.Control.Feedback type="invalid">
                    Please enter a valid password.
                </Form.Control.Feedback>
            </Form.FloatingLabel>

            {/* Repeat password */}

            <Form.FloatingLabel controlId="registrationRepeatPassword" label="Repeat password*"
                                className="mb-3">
                <Form.Control name="registrationRepeatPassword" type="password" placeholder="Drama" required/>
                <Form.Control.Feedback type="invalid">
                    Passwords don't match.
                </Form.Control.Feedback>
            </Form.FloatingLabel>

            {/* Button */}
            <Button type="submit"
                    variant="outline-primary"
                    className={"mb-3 d-block mx-auto rounded-pill"}>
                Register
            </Button>
        </Form>
    </>
}