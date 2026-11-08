import {useState} from "react";
import login from "../authentication/login"
import {Link, useNavigate} from "react-router-dom";
import LoadingBouncingDots from "../components/LoadingBouncingDots.tsx";
import ForgotPasswordForm from "../forms/ForgotPasswordForm.tsx";

export default function ForgotPassword()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const urlIfAuthorized : string = "/dashboard";
    const navigate = useNavigate();

    async function handleForgotPassword(email : string) : Promise<void>
    {

    }

    return (
        <>
        {/*<ForgotPasswordForm onSubmit={(email : string) : Promise<void> => handleForgotPassword(email)}/> */ }
            <div className="container" style={{
                marginTop: "200px",
                marginLeft:"auto",
                marginRight:"auto",
                padding:"20px",
                maxWidth:"658px",
                borderStyle: "solid",
                borderColor: "#dee2e6",
                borderWidth: "1px",
                borderRadius: "9px"}}>
                <h2>
                    For now, we are not resetting passwords.</h2>
                <Link to={"/"} className={"align-content-center"} style={{color: "#126b62"}}> Go back</Link>
            </div>
        </>

    )
}
