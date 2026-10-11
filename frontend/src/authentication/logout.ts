export async function logout() : Promise<void>
{
    await fetch
    (
        "https://localhost:7151/api/logout",
        {
            method: "POST",
            credentials: "include",
        }
    );
    const isBaseUrl : boolean = document.baseURI == "http://localhost:5173";

    if (isBaseUrl)
        window.location.reload();
    else
        window.location.replace("dashboard.html");
}
