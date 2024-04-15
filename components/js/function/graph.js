import { urlGraph } from "../const/const.js";

export async function fetchData() {
    const mainpage = document.getElementById('page-container');
    const username = document.getElementById('pseudo');

    // Construct the GraphQL query
    const query = `
    query {
        user {
            id
            login
            attrs
            totalUp
            totalDown
            transactions ( where: {eventId: {_eq: 148}}, order_by: {createdAt:asc}){
            amount
            type
            createdAt
            }
        }
        transaction{
            id
            type
            amount     
            objectId     
            userId     
            createdAt     
            path
        }
    }`;

    // Set up the request headers with the Authorization token
    try {
    
        const response = await fetch(urlGraph, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                query: query
            })
        })

        switch (response.status) {
            case 200: // Success
                const data = await response.json(); // Parse the response JSON
                const userId = data.data.user[0].login; // Extract the user login
                mainpage.innerHTML = ""; // Clear the mainpage content
                username.innerText = "Connected as:\n" + userId; // Display the user ID
                break;
            default: // Other errors
                console.log("Something went wrong on access attempt");
                break;
        }
    } catch (e) {
        console.error(e);
    }
}
