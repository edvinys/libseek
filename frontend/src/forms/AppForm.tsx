import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Button, InputGroup} from "react-bootstrap";
import {
    type ChangeEvent,
    isValidElement,
    type ReactNode,
    type SubmitEvent,
    type SubmitEventHandler,
    useState
} from "react";
import type Book from "../data/Book.ts";
import ApiCaller from "../API/ApiCaller.ts";
import "react-bootstrap/"
import DateRange from "../components/DateRange.tsx";
import useNotification from "../hooks/useNotification.ts";
import InfoAlert from "../components/InfoAlert.tsx";
import type {Variant} from "react-bootstrap/cjs/types";
import {Children} from "react";

type AppFormCheckProps =
{
    label : string;
    id : string;
    feedback? : string;
    placeholder? : string;
    required? : boolean;
    onChange? : (event: ChangeEvent<HTMLInputElement>) => void;
}
type AppFormProps =
{
    children : ReactNode;
    onSubmit : SubmitEventHandler<HTMLFormElement>;
    validated : boolean | undefined;
    buttonLabel : string;
    isLoading : boolean;
    hideDateRange? : boolean;
    onDateChange? : (date: (Date | null)) => void;
}

export default function AppForm({children, onSubmit, validated, buttonLabel,
                                    isLoading, hideDateRange = true, onDateChange}: AppFormProps)
{
    Children.forEach(children, (child : ReactNode ) =>
    {
        if (!isValidElement(child) || child.type !== AppFormCheck)
        {
            throw new Error("AppForm children must be AppForm.Check")
        }
    });

    return (
        <Form className="mb-3" noValidate validated={validated} onSubmit={onSubmit}>
            {children}
            <DateRange hidden={hideDateRange} onDateChange={(date : Date | null) => {
                if (onDateChange)
                {
                    onDateChange(date)
                }} }/>
            <Button type="submit"
                    variant="outline-success"
                    className={"register-button mb-3 d-block mx-auto rounded-pill"}
                    disabled={isLoading}>{isLoading ? "Loading..." : buttonLabel}</Button>
        </Form>
    );
}

AppForm.Check = AppFormCheck;

function AppFormCheck({label, id, feedback = "",  placeholder = label, required = false} : AppFormCheckProps)
{
    const controlId: string = label.trim();
    if (required)
        label = label + "*";
    return <Form.FloatingLabel controlId={id} label={label} className="mb-3">
        <Form.Control name={id} type="text" placeholder={placeholder} required={required} />
        <Form.Control.Feedback type="invalid">
            {feedback}
        </Form.Control.Feedback>
    </Form.FloatingLabel>
}