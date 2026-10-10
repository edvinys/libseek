export default async function getCookie() : Promise<Response>
{
    return await fetch
    (
        "https://localhost:7151/api/login/auth",
        {
            method: "POST",
            credentials: "include",
        }
    );
}


window.onload = async (event : Event): Promise<void> =>
{
    const baseUrl : boolean = document.baseURI == "http://localhost:5173/index.html";
    console.log("Checking backend for authentication...");
    const response : Response = await getCookie();

    if (response.status == 202)
    {
        console.log("User is authenticated.")
        if (baseUrl)
            window.location.replace("dashboard.html");
        return;
    }
    else if (response.status == 401)
    {
        console.log("User is unauthenticated.")
    }
    else
    {
        console.log("Server error: unable to connect/unknown error")
    }
    if (!baseUrl)
    {
        window.location.replace("index.html");
    }
}