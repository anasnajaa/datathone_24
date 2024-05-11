const path = require('path');
const fs = require('fs/promises');

exports.getData = async () => {
    const data = await fs.readFile(path.join("constants", "11.csv"), { encoding: "utf8" });

    const rows = data.split("\n");

    const allData = [];

    for (let i = 0; i < rows.length; i++) {
        const country = rows[i].split(",")[0];
        const year = rows[i].split(",")[1];

        const both_q1 = rows[i].split(",")[2];
        const male_q1 = rows[i].split(",")[3];
        const female_q1 = rows[i].split(",")[4];

        const both_q2 = rows[i].split(",")[5];
        const male_q2 = rows[i].split(",")[6];
        const female_q2 = rows[i].split(",")[7];

        const both_q3 = rows[i].split(",")[8];
        const male_q3 = rows[i].split(",")[9];
        const female_q3 = rows[i].split(",")[10];

        const both_q4 = rows[i].split(",")[11];
        const male_q4 = rows[i].split(",")[12];
        const female_q4 = rows[i].split(",")[13];

        const temp = {
            country: country.toLocaleLowerCase(),
            year,
            quarters: [
                {
                    male: male_q1,
                    female: female_q1,
                    both: both_q1
                },
                {
                    male: male_q2,
                    female: female_q2,
                    both: both_q2
                },
                {
                    male: male_q3,
                    female: female_q3,
                    both: both_q3
                },
                {
                    male: male_q4,
                    female: female_q4,
                    both: both_q4
                }
            ]
        };
        allData.push(temp);
    }

    return [...allData];
}