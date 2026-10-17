import fs from "node:fs"

const fetchGames = async () => {
    const fetchPromise: Response = await fetch("https://docs.google.com/spreadsheets/d/1iuzDTOAvdoNe8Ne8i461qGNucg5OuEoF-Ikqs8aUQZw/export?format=csv&gid=58422002");
    const result: Blob = await fetchPromise.blob();
    const fileContent: string = await result.text();

    fs.writeFile("./games.csv", fileContent, err => {
        if (err) {
            console.error(err);
        } else {
            console.log("success");
        }
    });
};

export { fetchGames };