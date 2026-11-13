import Login from "../components/Login.tsx";

export default function Front()
{
    return(
        <>
            <h1 className="font-family-poppins-bold darker-green-color"
            style={{
                textAlign: "center",
                marginTop: "100px",
                fontSize: "100px"
            }}>Reserve your <span className="bright-orange-color">spot.</span></h1>
            <div className={"shadow main-form"} style={{marginTop: "50px"}}>
                <Login />
            </div>
        </>)
}