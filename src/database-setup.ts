import { eachLine } from "line-reader";

const readData = (file: string) => {
  // Read each csv line
  eachLine(file, (line, last) => {
    if (
      !(
        line.includes("Broken on Main") || // Ignore broken games
        line.includes("Does not work") || // Ignore games that do not work
        line.includes("Hover over column headers") || // Ignore first line of the csv file
        line.includes(
          "Game,Stability,PR Status,18+ / Unrated,Links & Downloads,Setup Guides,Support,Disclosures,Notes", // Ignore column headers
        ) ||
        line.includes(",,--,FALSE,,,,—,,,,,,,") // Ignore empty lines
      )
    ) {
      var parsedLine = line.split(",", 2);
      console.log(parsedLine);
    }

    if (line == ",,--,FALSE,,,,—,,,,,,," || last) {
      return false;
    }
  });
};

export { readData };
