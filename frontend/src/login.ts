const emailInput: HTMLInputElement  = document.getElementById("emailInput") as HTMLInputElement;
const passwordInput : HTMLInputElement = document.getElementById("passwordInput") as HTMLInputElement;
const loginButton: HTMLButtonElement = document.getElementById("submitButton") as HTMLButtonElement;
const message : HTMLParagraphElement = document.getElementById("loginMessage") as HTMLParagraphElement;

export default async function LoginAuth() : Promise<void>
{
    // if (emailInput == null || passwordInput  == null)
    // {
    //     message.textContent = "Email or password is incorrect";
    // }

    let email : string = emailInput.value;
    let password : string = passwordInput.value;

    const ticket: string = await Login(email, password);
}

async function Login(email : string, password : string): Promise<string>
{
    console.log("Fetching backend...");
    try
    {
        console.log("Sent:", JSON.stringify({ Email: email, Password: password }));
        let response : Response = await fetch
        (
            "https://localhost:7151/api/login",
            {
                method: "POST",
                headers:
                    {
                    "Content-Type": "application/json",
                   // ""
                },
                body: JSON.stringify({ Email: email, Password: password }),
            }
        )
        console.log("Done fetching backend" + response.status)

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
        }
    }
    catch(error)
    {
        console.log(error);
        message.style.color = "darkred";
        message.textContent = "Server error: try again later.";
    }

    return "null";
}


// type="submit"
const form = document.getElementById("loginForm") as HTMLFormElement;

form.addEventListener("submit", async (event) : Promise<void> =>
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
        await LoginAuth()
    }
})

// loginButton.addEventListener("click", LoginAuth)
