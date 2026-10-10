import getCookie from './authenticate.ts'
const emailInput: HTMLInputElement = document.getElementById("emailInput") as HTMLInputElement;
const passwordInput: HTMLInputElement = document.getElementById("passwordInput") as HTMLInputElement;
const loginButton: HTMLButtonElement = document.getElementById("submitButton") as HTMLButtonElement;
const message: HTMLParagraphElement = document.getElementById("loginMessage") as HTMLParagraphElement;

export default async function LoginAuth(): Promise<Response>
{
    let email: string = emailInput.value;
    let password: string = passwordInput.value;

    return await Login(email, password);
}

async function Login(email: string, password: string): Promise<Response>
{
    let response : Response = new Response();

    console.log("Fetching backend...");
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
        console.log("Done fetching backend" + response.status)
        return response;
    } catch (error)
    {
        console.log(error);
        message.style.color = "darkred";
        message.textContent = "Server error: try again later.";
    }

    return response;
}

// type="submit"
const form = document.getElementById("loginForm") as HTMLFormElement;

form.addEventListener("submit", async (event): Promise<void> =>
{
    event.preventDefault(); // stop the refresh
    message.style.color = "gray";
    if (emailInput.value == "" && passwordInput.value == "")
        message.textContent = "Please enter a valid email and password";
    else if (emailInput.value == "")
        message.textContent = "Please enter a valid email";
    else if (passwordInput.value == "")
        message.textContent = "Please enter your password";
    else
    {
        const response : Response = await LoginAuth()
        if (response.status == 401)
        {
            console.log("Unauthorized");
            message.style.color = "darkred";
            message.textContent = "Email or password is incorrect";
        }
        if (response.status == 200)
        {
            console.log("Ok");
            message.style.color = "green";
            message.textContent = "Login successful";
            window.location.replace("/dashboard")
        }
    }

    return;
})
