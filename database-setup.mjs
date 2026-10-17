import { open, eachLine } from "line-reader"

// Read each csv line
eachLine("./games.csv", (line, last) => {

    
    if (!(line.includes("Broken on Main") || line.includes("Does not work")
            || line.includes("Hover over column headers")
            || line.includes("Game,Stability,PR Status,18+ / Unrated,Links & Downloads,Setup Guides,Support,Disclosures,Notes")
            || line.includes(",,--,FALSE,,,,—,,,,,,,"))) {
        var parsedLine = line.split(",", 2);
        console.log(parsedLine);
    }

    if (line == ",,--,FALSE,,,,—,,,,,,," || last) {
        return false;
    }
})