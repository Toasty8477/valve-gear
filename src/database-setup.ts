import { eachLine } from "line-reader";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const database = await open({
    filename: "./games.db",
    driver: sqlite3.Database
});

const updateData = async (file: string) => {

    // Read each csv line
    eachLine(file, async (line, last) => {
        // Ignore lines that are not relevant
        if (
            !(
                line.includes("Broken on Main") || // Ignore broken games
                line.includes("Does not work") || // Ignore games that do not work
                line.includes("Hover over column headers") || // Ignore first line of the csv file
                line.includes(
                    "Game,Stability,PR Status,18+ / Unrated,Links & Downloads,Setup Guides,Support,Disclosures,Notes" // Ignore column headers
                ) ||
                line.includes(",,--,FALSE,,,,—,,,,,,,") // Ignore empty lines
            )
        ) {
            // Parse the line on commas, but only take name and stability (first two columns)
            const parsedLine: string[] = line.split(",", 2);
            console.log(parsedLine);

            // Insert the parsed game into the database
            await database.run("INSERT INTO games (name, stability) VALUES (?, ?)", parsedLine[0], parsedLine[1]);
        }

        if (line == ",,--,FALSE,,,,—,,,,,,," || last) {
            return false;
        }
    });
};

// Database first time setup, runs on startup to create the games table if it doesn't exist
const setupDatabase = async () => {
    await database.exec(`
        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            stability TEXT
        )
    `);
};

export { updateData, setupDatabase, database };
