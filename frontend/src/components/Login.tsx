import {type ReactNode, useEffect, useState} from "react";
import login from "../authentication/login"
import {Link, useNavigate} from "react-router-dom";
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

    return (
        <div title="login form">
        <h3 className="text-center">Log in</h3>
        <form
            className='form-center-width-limit'
            id="loginForm"
            onSubmit={(event: React.SubmitEvent<HTMLFormElement>) =>
            {event.preventDefault();
                void handleLogin();}}>
            <div className="mb-3">
                <label htmlFor="emailInput"
                       className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    aria-describedby="emailHelp"
                    onChange={(event) => setEmail(event.target.value)}/>
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
            <div className="d-flex justify-content-between align-items-center">
                <button
                    type="submit"
                    className="btn btn-primary"
                    id="submitButton"
                    disabled={buttonDisabled}>Submit</button>
                <Link to={"/forgot/password"} className="fw-bold">Forgot password?</Link>
            </div>
            <p id="loginMessage" style={{textAlign: "center", color:messageColor, padding:"10px"}}>{message}</p>
            <p className="small fw-bold mt-2 pt-1 mb-0 text-center">Don't have an account? {" "}
                <Link to={"/register"}>Register</Link></p>
        </form>
    </div>
    )

    async function handleLogin() : Promise<void>
    {
        setButtonDisabled(true);
        setMessageColor("grey");
        if (email == "" && password == "")
        {
            setMessage("Please enter a valid email address and password.");
            setButtonDisabled(false);
        }

        else if (email == "")
        {
            setMessage("Please enter a valid email");
            setButtonDisabled(false);
        }
        else if (password == "")
        {
            setMessage("Please enter your password");
            setButtonDisabled(false);
        }
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
