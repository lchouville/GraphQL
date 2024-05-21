import { loadLogAction } from "./action/actionlogin.js";
import { fetchData } from "./function/graph.js";
import { connected } from "./function/login.js"; 

// Set the onclick to button
function main(){
    // check if the token are stored in local storage
    if(localStorage.getItem("token")!== null){
        connected();
        fetchData();
    }else{
        loadLogAction();
    }
    
}

// Call the main function when the script is loaded
main();