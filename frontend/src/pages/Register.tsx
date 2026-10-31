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
        <div className="shadow-sm" style={{marginTop: "150px",
            marginLeft:"auto",
            marginRight:"auto",
            padding:"20px",
            width:"100%",
            maxWidth:"500px",
            borderStyle: "solid",
            borderColor: "#dee2e6",
            borderWidth: "1px",
            borderRadius: "9px", position: "relative", left:"0px"}}>
            <RegisterForm/>
        </div>
    </div>
}