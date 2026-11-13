import RegisterForm from "../forms/RegisterForm.tsx";
import registerImage from "../assets/library.svg";

export default function Register()
{
    return<div style={{
        display: "flex",
        gap: "40px",
        flexWrap: "wrap",
    }}>
        <img src={registerImage} alt="books"
             height="500px"
             width="500px"
             style={{marginLeft: "300px", marginTop: "150px" }}></img>
        <div className="shadow-sm main-form" style={{position: "relative", left:"0px"}}>
            <RegisterForm/>
        </div>
    </div>
}