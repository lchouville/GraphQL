export function newPanel(_id,_value){
    // Create the audit div
    const div = document.createElement('div');
    div.id = _id;
    div.className = _id+'-container panel-default';

    const title = document.createElement('H4');
    title.id = _id+'-title';
    title.className = _id+'-title';
    title.innerText = _value;

    div.appendChild(title);
    return div;
}