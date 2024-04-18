import { newPanel } from "./panel.js";

export function skillspanel(_transaction){
    // Create the skills div
    const div = newPanel("skills", "Skills level")

    // Filter objects with type starting with "skill-"
    let skillObjects = _transaction.filter(_transaction => _transaction.type.startsWith("skill_"));
    skillObjects = filterLastOc(skillObjects)
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    

    div.appendChild(svg);
    return div
}

function filterLastOc(objects) {
    // Create an object to store the last occurrence of each type
    const lastOccurrences = {};

    // Iterate over the objects array in reverse order
    for (let i = objects.length - 1; i >= 0; i--) {
        const object = objects[i];
        const { type } = object;

        // If the type is not in the last occurrences object, add it
        if (!lastOccurrences.hasOwnProperty(type)) {
            lastOccurrences[type] = object;
        }
    }

    // Convert the values of the last occurrences object to an array
    const lastOccurrenceArray = Object.values(lastOccurrences);

    return lastOccurrenceArray;
}


