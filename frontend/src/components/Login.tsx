import {type ReactNode, useEffect, useState} from "react";
import login from "../authentication/login"
import {useNavigate} from "react-router-dom";
import ApiCaller from "../apiCall/ApiCaller.ts";

export default function Login()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const urlIfAuthorized : string = "/dashboard";
    const navigate = useNavigate();

    // check if logged in
    useEffect(() =>
    {
        async function authenticateUserOnLoad() : Promise<void>
        {
            const response : Response = await ApiCaller.authenticate()
            if (response.ok)
            {
                navigate(urlIfAuthorized, {replace : true})
            }
        }
        void authenticateUserOnLoad()

    }, [navigate])

    return (
        <div title="login form">
        <h3 className="text-center" style={{marginTop: "200px"}}>Log in</h3>
        <form
            className='form-center-width-limit'
            id="loginForm"
            onSubmit={(event: React.SubmitEvent<HTMLFormElement>) =>
            {event.preventDefault(); void handleLogin();}}>
            <div className="mb-3">
                <label htmlFor="emailInput"
                       className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    aria-describedby="emailHelp"
                    onChange={(event) => setEmail(event.target.value)}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="passwordInput"
                    onChange={(event) =>
                        setPassword(event.target.value)}/>
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                id="submitButton"
                disabled={buttonDisabled}>Submit</button>
            <p id="loginMessage" style={{textAlign: "center", color:messageColor}}>{message}</p>
        </form>
    </div>
    )

    async function handleLogin()
    {
        setButtonDisabled(true);
        if (email == "" && password == "")
            setMessage("Please enter a valid email address and password.");
        else if (email == "")
            setMessage("Please enter a valid email");
        else if (password == "")
            setMessage("Please enter your password");
        else
        {
            setMessageColor("gray");
            setMessage("...");
            const loginResponse : Response = await login(email, password);
            setTimeout(async () =>
            {
                if (loginResponse.status == 401)
                {
                    console.log("Unauthorized");
                    setMessageColor("darkred")
                    setMessage("Email or password is incorrect");
                }
                if (loginResponse.status == 200)
                {
                    console.log("Ok");
                    setMessageColor("green");
                    setMessage("Login successful");
                    navigate(urlIfAuthorized, {replace : true});
                }
                setButtonDisabled(false);
            }, 200)
        }
    }
}
