import Login from "../components/Login.tsx";

export default function Front()
{
    return(
        <div style={{
            marginTop: "200px",
            marginLeft:"auto",
            marginRight:"auto",
            padding:"20px",
            maxWidth:"500px",
            borderStyle: "solid",
            borderColor: "#dee2e6",
            borderWidth: "1px",
            borderRadius: "9px"}} className={"shadow"}>
            <Login ></Login>
        </div>)
}