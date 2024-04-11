import { urlGraph } from "../const/const.js";

export async function fetchData(){
    // Get html elements
    const mainpage = document.getElementById('page-container')
    const username = document.getElementById('pseudo');
    mainpage.innerHTML = "";
    username.innerText = "connected as \n"+ "pseudo"

    const headers = new Headers();
    headers.append("Authorization", "Bearer " + localStorage.getItem("token"))
    try {
        const response = await fetch(urlGraph, {
            method: "POST",
            headers: headers,
        });
        switch (response.status){
            case 200: // Success
            
            break;
            default: // other errors
                console.log("somthing gone wrong on access tentative");
            break; 
        }
    } catch (e) {
        console.error(e);
    }
}