import { logSubmit } from "../function/login.js";

export function loadLogAction(){
    // get the elements
    const pseudo = document.getElementById('username')
    const password = document.getElementById('password')
    const button = document.getElementById('logSubmit')
    button.onclick= logSubmit;
    // create the event listeners
    /* 
        when the user press Enter on pseudo input 
        change the focus to password 
    */
    pseudo.onkeydown = (e) => {
        if(e.key === 'Enter'){
            password.focus()
        }
    }
    /* 
        when the user press Enter on password input 
        submit
    */
    password.onkeydown = (e) => {
        if(e.key === 'Enter'){
            button.click()
        }
    }
}