import { urlLog } from "../const/const.js";
import { fetchData } from "./graph.js";

export async function logSubmit(){
    // Get The Credentials
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    
    const headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username.value + ":" + password.value))
    try {
        const response = await fetch(urlLog, {
            method: "POST",
            headers: headers,
        });
        switch (response.status){
            case 200: // Success
                const token = await response.json();
                // store the connection token
                localStorage.setItem("token", token);
                connected()
            break;
            case 403: // Invalid credentials
                console.log("Invalid credentials")
                alert("Invalid credentials. Please check your username and password.");    
            break;
            case 401: // Invalid credentials
                console.log("Invalid credentials")
                alert("Invalid credentials. Please check your username and password.");    
            break;
            default: // other errors
                console.log("somthing gone wrong on connection tentative");
                alert("Something went wrong on connection attempt. Please try again later.");
            
            break; 
        }
    } catch (e) {
        console.error(e);
        alert("An unexpected error occurred. Please try again later.");
    }
    
} 

function dlog() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

export function connected(){
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    // replace the username input to <p>
    const pseudo = document.createElement('p');
    pseudo.id = "pseudo";
    username.parentNode.replaceChild(pseudo, username);
    // remove the form
    username.remove()
    password.remove()
    const button = document.getElementById('logSubmit')
    button.className = 'btn btn-unlog';button.innerText = "Disconnect";
    button.onclick = dlog;
    fetchData();
}