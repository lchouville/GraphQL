import { newPanel } from "./panel.js";

export function skillspanel(_transaction){
    // Create the skills div
    const div = newPanel("skills", "Best Skills")

    // Filter objects with type starting with "skill-"
    let skillObjects = _transaction.filter(_transaction => _transaction.type.startsWith("skill_"));
    skillObjects = filterLastOc(skillObjects);
    skillObjects = filter6HighestAmount(skillObjects);
    
    // Sort the skillObjects array by type in ascending order
    skillObjects.sort((a, b) => {
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        return 0;
    });
    const svg = skillsGraph(skillObjects)
    

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
function filter6HighestAmount(objects) {
    // Sort the objects by 'amount' property in descending order
    objects.sort((a, b) => b.amount - a.amount);
    
    // Take the first 6 elements
    return objects.slice(0, 6);
}
function skillsGraph(objects){
    // Elements properties
    const svgWidth = 300;
    const svgHeight = 300;
    const nbSegment = objects.length;
    const prefix = "skill_";

    // Create the skills div
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);
    svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

    // Starting angle for the first segment
    let startAngle = -90;
    const segmentLength = (360 / nbSegment);
    // create the graduation
    for (let i = 0; i < 10; i++){

        const graduation =document.createElementNS("http://www.w3.org/2000/svg", "circle");
        graduation.setAttribute("cx", svgWidth / 2);
        graduation.setAttribute("cy", svgHeight / 2);
        graduation.setAttribute("r", ((svgWidth / 2)/10)*(i+1)-0.25);
        graduation.setAttribute("fill", "none");
        if (i%2==0){
            graduation.setAttribute("stroke", "rgba(25, 25, 25, 0.65)");
        }else{
            graduation.setAttribute("stroke", "rgba(0, 0, 0, 0.75)");
        }
        graduation.setAttribute("stroke-width", 0.5);

        svg.appendChild(graduation);
    }
    // Loop on objects to create all segments and labels
    for (let i = 0; i < nbSegment; i++) {
        const object = objects[i];
        const { type, amount } = object;
        const typeWithoutPrefix = type.replace(prefix, "");

        // Calculate end angle for this segment
        const endAngle = startAngle + segmentLength;
        const radius = (svgWidth / 2) * (amount / 100);

        // Create path element for the segment
        const segmentPath = describeArcSkill(svgWidth / 2, svgHeight / 2, radius, startAngle, endAngle);

        // Create path element
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", segmentPath);

        

        // Calculate angle for label
        const labelAngle = startAngle + segmentLength / 2; // Middle angle of the segment
        let rotationAngle = labelAngle + Math.PI / 2; // Rotate by 90 degrees to make text parallel to the center

        
        // Calculate coordinates for label
        const labelX = svgWidth / 2 + 110 * Math.cos(labelAngle * Math.PI / 180);
        const labelY = svgHeight / 2 + 110 * Math.sin(labelAngle * Math.PI / 180);
        // Calculate coordinates for value
        const valueX = svgWidth / 2 + 140 * Math.cos(labelAngle * Math.PI / 180);
        const valueY = svgHeight / 2 + 140 * Math.sin(labelAngle * Math.PI / 180);
        
        // Create text element for label
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", labelX);
        label.setAttribute("y", labelY);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("alignment-baseline", "middle");
        label.setAttribute("font-weight", "bold");
        label.setAttribute("font-size", "18px");
        label.setAttribute("stroke-width", "0.9px");
        label.textContent = typeWithoutPrefix; // Set label text to typeWithoutPrefix
        
        // Create text element for label
        const value = document.createElementNS("http://www.w3.org/2000/svg", "text");
        value.setAttribute("x", valueX);
        value.setAttribute("y", valueY);
        value.setAttribute("text-anchor", "middle");
        value.setAttribute("alignment-baseline", "middle");
        value.setAttribute("font-weight", "bold");
        value.setAttribute("font-size", "14px");
        value.setAttribute("stroke-width", "0.9px");
        value.setAttribute("fill", "rgb(0, 125, 185)");
        value.setAttribute("stroke", "rgb(10, 10, 10)");
        value.textContent = amount+"%"; // Set label text to typeWithoutPrefix

        if (i<5 && i>0){
            rotationAngle -=90
            label.setAttribute("writing-mode", "");
        }else{
            rotationAngle +=90
        }
        
        label.setAttribute("transform", `rotate(${rotationAngle}, ${labelX}, ${labelY})`); // Rotate the text
        value.setAttribute("transform", `rotate(${rotationAngle}, ${valueX}, ${valueY})`); // Rotate the text
        
        // Set stroke and fill colors based on segment index
        if (i % 2 == 0) {
            path.setAttribute("stroke", "rgb(235, 185, 0)");
            path.setAttribute("fill", "rgba(215, 165, 0, 0.5)");
            label.setAttribute("fill", "rgb(235, 185, 0)");
            label.setAttribute("stroke", "rgb(10, 10, 10)");
        } else {
            path.setAttribute("stroke", "rgb(27, 27, 27)");
            path.setAttribute("fill", "rgba(7, 7, 7, 0.5)");
            label.setAttribute("fill", "rgb(140, 50, 45)");
            label.setAttribute("stroke", "rgb(10, 5, 5)");
        }

        // Append path to SVG
        svg.appendChild(path);
        svg.appendChild(label);
        svg.appendChild(value);

        // Update start angle for next segment
        startAngle = endAngle;
    }

    return svg;
}


// Function to describe an arc
function describeArcSkill(x, y, radius, startAngle, endAngle){
    const startRadians = (startAngle) * Math.PI / 180;
    const endRadians = (endAngle) * Math.PI / 180;

    const startX = x + (radius * Math.cos(startRadians));
    const startY = y + (radius * Math.sin(startRadians));

    const endX = x + (radius * Math.cos(endRadians));
    const endY = y + (radius * Math.sin(endRadians));

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
        "M", startX, startY,
        "A", radius, radius, 0, largeArcFlag, 1, endX, endY,
        "L", x, y,
        "Z"
    ].join(" ");

    return d;
}

