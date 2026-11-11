import {Link} from "react-router-dom";
import LoadingBouncingDots from "../components/LoadingBouncingDots.tsx";
import {useState} from "react";

type ForgotPasswordFormProps =
{
   onSubmit: (email : string) => void
}

export default function ForgotPasswordForm({onSubmit}: ForgotPasswordFormProps)
{
    const [email, setEmail] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");

    return( <div title="login form">
        <h3 className="text-center">Forgot password</h3>
        <form
            className='form-center-width-limit'
            id="loginForm"
            onSubmit={(event: React.SubmitEvent<HTMLFormElement>) =>
            {event.preventDefault();
                void onSubmit(email);}}>
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
            <div className="d-flex justify-content-between align-items-center">
                <button
                    type="submit"
                    className="btn btn-primary btn-ghost"
                    id="submitButton"
                    disabled={buttonDisabled}
                    style={{backgroundColor: "#0F4C45", borderColor: "#F26B3A", borderWidth:"0px"}}>Log in</button>
                <Link to={"/forgot/password"} className="fw-bold" style={{color: "#126b62"}}>Forgot password?</Link>
            </div>
            <p id="loginMessage" style={{textAlign: "center", color:messageColor, padding:"10px"}}
               hidden={buttonDisabled}>{message}</p>
            <div style={{display:"flex", justifyContent:"center"}} hidden={!buttonDisabled}>
                <LoadingBouncingDots />
            </div>
            <p className="small fw-bold mt-2 pt-1 mb-0 text-center">Don't have an account? {" "}
                <Link to={"/register"} style={{color: "#126b62"}}>Register</Link></p>
        </form>
    </div>)
}