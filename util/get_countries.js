const path = require('path');
const fs = require('fs/promises');

exports.get_countries = async () => {
    const data = await fs.readFile(path.join("constants", "countries.csv"), { encoding: "utf8" });

    const rows = data.split("\n");

    const countries = [];

    for (let i = 1; i < rows.length; i++) {
        countries.push({
            id: rows[i].split(",")[0],
            name: rows[i].split(",")[1].replace("\r", "")
        })
    }

    return [...countries];
}