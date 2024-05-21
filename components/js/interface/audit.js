import { formatNumberWithSuffix } from "../function/format.js";
import { newPanel } from "./panel.js";

export function auditpanel(_transaction) {
    // Create the audit div
    const div = newPanel("audit","Audits Ratio")

    // Get the amount of xp
    const userxpU = _transaction.filter(_transaction => _transaction.type === "up");
    let xpUGlobal = 0;
    for (let i = 0; i < userxpU.length; i++) {
        xpUGlobal += userxpU[i].amount;
    }
    const userxpD = _transaction.filter(_transaction => _transaction.type === "down");
    let xpDGlobal = 0;
    for (let i = 0; i < userxpD.length; i++) {
        xpDGlobal += userxpD[i].amount;
    }
    // Calculate ratio only if xpDGlobal is not zero
    let ratioText = "N/A";
    if (xpDGlobal !== 0) {
        ratioText = (xpUGlobal / xpDGlobal).toFixed(1);
    }
    // Append elements to the audit div
    div.appendChild(auditGraph(xpUGlobal,xpDGlobal,ratioText));
    return div;
}

function auditGraph(value1, value2, ratio) {
    // Constants for SVG size, circle size, and colors
    const svgWidth = 300;
    const svgHeight = 100;
    const circleRadius = 40;
    const lineStroke = 8
    const color1 = "green";
    const color2 = "orange";

    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("audit-svg");
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);

    // Calculate circle center position
    // const circleX = svgWidth / 2;
    // const circleY = svgHeight / 2;
    const circleX = circleRadius+10;
    const circleY = svgHeight / 2;

    // Calculate angles based on the ratio of two values
    const totalValue = value1 + value2;
    const angle1 = (value1 / totalValue) * 360; // Angle for color1
    const angle2 = (value2 / totalValue) * 360; // Angle for color2

    // Create the circle border (color1)
    const arc1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arc1.setAttribute("d", describeArc(circleX, circleY, circleRadius, 0, angle1));
    arc1.setAttribute("fill", "none");
    arc1.setAttribute("stroke", color1);
    arc1.setAttribute("stroke-width", lineStroke); // Adjust the border width as needed
    svg.appendChild(arc1);

    // Create the circle border (color2)
    const arc2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arc2.setAttribute("d", describeArc(circleX, circleY, circleRadius, angle1, angle1 + angle2));
    arc2.setAttribute("fill", "none");
    arc2.setAttribute("stroke", color2);
    arc2.setAttribute("stroke-width", lineStroke); // Adjust the border width as needed
    svg.appendChild(arc2);

    // Add the ratio value in the center of the circle
    const ratiotxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    ratiotxt.setAttribute("x", circleX);
    ratiotxt.setAttribute("y", circleY);
    ratiotxt.setAttribute("text-anchor", "middle");
    ratiotxt.setAttribute("dominant-baseline", "middle");
    ratiotxt.textContent = ratio;
    // Make the text bold
    ratiotxt.setAttribute("font-weight", "bold");
    
    // Add the ratio value in the center of the circle
    const messagetxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    messagetxt.setAttribute("x", circleX + circleRadius + 10); // Adjusted X position for the label
    messagetxt.setAttribute("y", circleY + 40); // Adjusted Y position for the label
    // set the text size
    messagetxt.setAttribute("font-size", "12px");
    messagetxt.setAttribute("font-style", "italic");
    // apply color to text ratio
    switch (true) {
        case (ratio > 1.2):
            ratiotxt.setAttribute("fill", "green");
            messagetxt.setAttribute("fill", "green");
            messagetxt.textContent = "Almost perfect!";
            break;
        case (ratio < 1):
            ratiotxt.setAttribute("fill", "red");
            messagetxt.setAttribute("fill", "red");
            messagetxt.textContent = "Make more audit!";
            break;
        default:
            ratiotxt.setAttribute("fill", "orange");
            messagetxt.setAttribute("fill", "orange");
            messagetxt.textContent = "You can do better!";
            break;
    }
    svg.appendChild(ratiotxt);
    svg.appendChild(messagetxt);
    // Add label for value1
    const textValue1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textValue1.setAttribute("x", circleX + circleRadius + 20); // Adjusted X position for the label
    textValue1.setAttribute("y", circleY - 5); // Adjusted Y position for the label
    textValue1.textContent = "▲ Done : " + formatNumberWithSuffix(value1,2);
    textValue1.setAttribute("fill", color1)
    svg.appendChild(textValue1);

    // Add label for value2
    const textValue2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textValue2.setAttribute("x", circleX + circleRadius + 20); // Adjusted X position for the label
    textValue2.setAttribute("y", circleY + 15); // Adjusted Y position for the label
    textValue2.textContent = "▼ Recieve : " + formatNumberWithSuffix(value2,2);
    textValue2.setAttribute("fill", color2)
    svg.appendChild(textValue2);

    // Return the SVG element
    return svg;
}

// Function to describe an arc
function describeArc(x, y, radius, startAngle, endAngle){
    const startRadians = (startAngle - 90) * Math.PI / 180;
    const endRadians = (endAngle - 90) * Math.PI / 180;

    const startX = x + (radius * Math.cos(startRadians));
    const startY = y + (radius * Math.sin(startRadians));

    const endX = x + (radius * Math.cos(endRadians));
    const endY = y + (radius * Math.sin(endRadians));

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
        "M", startX, startY,
        "A", radius, radius, 0, largeArcFlag, 1, endX, endY
    ].join(" ");

    return d;
}



