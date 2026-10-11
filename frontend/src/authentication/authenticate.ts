import ApiCaller from "../apiCall/ApiCaller.ts";

window.onload = async (event : Event): Promise<void> =>
{
    console.log("Checking backend for authentication...");
    await ApiCaller.authenticate();
}