export default async function Login(email: string, password: string): Promise<Response>
{
    let response : Response = new Response(null, {status: 404});

    console.log("Fetching backend for login...");
    try
    {
        console.log("Sent:", JSON.stringify({Email: email, Password: password}));
        let response: Response = await fetch
        (
            "https://localhost:7151/api/login",
            {
                method: "POST",
                credentials: "include",
                headers:
                    {
                        "Content-Type": "application/json",
                    },
                body: JSON.stringify({Email: email, Password: password}),
            }
        )
        console.log("Done fetching backend for login" + response.status)
        return response;
    } catch (error)
    {
        console.log("Could not fetch backend for login, it is likely that the server is offline.");
    }

    return response;
}