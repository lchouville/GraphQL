import { formatNumberWithSuffix } from "../function/format.js";
import { auditpanel } from "./audit.js";
import { skillspanel } from "./skill.js";

export function loadMainContent(_data){
    // get existing elements
    const mainpage = document.getElementById('page-container');
    const username = document.getElementById('pseudo');
    
    // Clear the mainpage content
    mainpage.innerHTML = "";

    // Create elements for displaying data
    const userInfo = document.createElement('div');
    userInfo.id = 'user-info';
    userInfo.className = 'user-info';
    const user = document.createElement('h3')
    user.id = 'user';
    user.className = 'user-profil';

    const level = document.createElement('p');
    level.id = 'level';
    level.className = 'user-level';

    const xp = document.createElement('p');
    level.id = 'xp';
    level.className = 'user-xp';

    // attributes data
    const userId = _data.data.user[0].login; // Extract the user login
    username.innerText = "Connected as:\n" + userId; // Display the user ID
    user.innerText = userId+"'s Profil"

    // get all transactions
    const transaction = _data.data.user[0].transactions

    const levels = transaction.filter(transaction => transaction.type === "level");
    level.innerText = "Level : "+levels[levels.length - 1].amount
    
    const userxp = transaction.filter(transaction => transaction.type === "xp");
    let xpGlobal = 0;
    for (let i = 0; i <userxp.length; i++) {
        xpGlobal += userxp[i].amount;
    }
    xp.innerText = "XP : "+ formatNumberWithSuffix(xpGlobal,0)
    
    // add elements to the page
    userInfo.appendChild(user);
    userInfo.appendChild(level);
    userInfo.appendChild(xp);
    mainpage.appendChild(userInfo);
    mainpage.appendChild(auditpanel(transaction));
    mainpage.appendChild(skillspanel(transaction));
}