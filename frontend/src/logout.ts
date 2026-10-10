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

    window.location.assign("/index.html");
}
