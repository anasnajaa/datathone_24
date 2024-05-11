const path = require('path');
const fs = require('fs/promises');

const { get_countries } = require('./get_countries');

exports.inbound_tourism_arrivals = async () => {
    const data = await fs.readFile(path.join("constants", "inbound_tourism_arrivals.csv"), { encoding: "utf8" });

    const rows = data.split("\n");


    const inbound_tourism_arrivals_rows = [];

    for (let i = 1; i < rows.length; i++) {
        inbound_tourism_arrivals_rows.push({
            country_id: rows[i].split(",")[0].replace("\r", ""),
            data_metric: rows[i].split(",")[1].replace("\r", ""),
            notes: rows[i].split(",")[2].replace("\r", ""),
            series: rows[i].split(",")[3].replace("\r", ""),
            years: [
                {
                    year: 1995,
                    value: Number(rows[i].split(",")[4].replace("\r", ""))
                },
                {
                    year: 1996,
                    value: Number(rows[i].split(",")[5].replace("\r", ""))
                },
                {
                    year: 1997,
                    value: Number(rows[i].split(",")[6].replace("\r", ""))
                },
                {
                    year: 1998,
                    value: Number(rows[i].split(",")[7].replace("\r", ""))
                },
                {
                    year: 1999,
                    value: Number(rows[i].split(",")[8].replace("\r", ""))
                },
                {
                    year: 2000,
                    value: Number(rows[i].split(",")[9].replace("\r", ""))
                },
                {
                    year: 2001,
                    value: Number(rows[i].split(",")[10].replace("\r", ""))
                },
                {
                    year: 2002,
                    value: Number(rows[i].split(",")[11].replace("\r", ""))
                },
                {
                    year: 2003,
                    value: Number(rows[i].split(",")[12].replace("\r", ""))
                },
                {
                    year: 2004,
                    value: Number(rows[i].split(",")[13].replace("\r", ""))
                },
                {
                    year: 2005,
                    value: Number(rows[i].split(",")[14].replace("\r", ""))
                },
                {
                    year: 2006,
                    value: Number(rows[i].split(",")[15].replace("\r", ""))
                },
                {
                    year: 2007,
                    value: Number(rows[i].split(",")[16].replace("\r", ""))
                },
                {
                    year: 2008,
                    value: Number(rows[i].split(",")[17].replace("\r", ""))
                },
                {
                    year: 2009,
                    value: Number(rows[i].split(",")[18].replace("\r", ""))
                },
                {
                    year: 2010,
                    value: Number(rows[i].split(",")[19].replace("\r", ""))
                },
                {
                    year: 2011,
                    value: Number(rows[i].split(",")[20].replace("\r", ""))
                },
                {
                    year: 2012,
                    value: Number(rows[i].split(",")[21].replace("\r", ""))
                },
                {
                    year: 2013,
                    value: Number(rows[i].split(",")[22].replace("\r", ""))
                },
                {
                    year: 2014,
                    value: Number(rows[i].split(",")[23].replace("\r", ""))
                },
                {
                    year: 2015,
                    value: Number(rows[i].split(",")[24].replace("\r", ""))
                },
                {
                    year: 2016,
                    value: Number(rows[i].split(",")[25].replace("\r", ""))
                },
                {
                    year: 2017,
                    value: Number(rows[i].split(",")[26].replace("\r", ""))
                },
                {
                    year: 2018,
                    value: Number(rows[i].split(",")[27].replace("\r", ""))
                },
                {
                    year: 2019,
                    value: Number(rows[i].split(",")[28].replace("\r", ""))
                },
                {
                    year: 2020,
                    value: Number(rows[i].split(",")[29].replace("\r", ""))
                },
                {
                    year: 2021,
                    value: Number(rows[i].split(",")[30].replace("\r", ""))
                },
                {
                    year: 2022,
                    value: Number(rows[i].split(",")[31].replace("\r", ""))
                }
            ]
        })
    }

    const countries = await get_countries();

    const inbound_tourism_arrivals_list = [];

    for (let i = 0; i < countries.length; i++) {

        const arrivalRows = inbound_tourism_arrivals_rows.filter(x => x.country_id === countries[i].id);

        let total_arrivals = {};
        let overnight_visitors = {};
        let same_day_visitors = {};
        let same_day_visitors_cruise = {};

        arrivalRows.forEach(r => {
            if (r.data_metric.toLocaleLowerCase().indexOf("arrivals") > -1) {
                total_arrivals = r.years
            }

            if (r.data_metric.toLocaleLowerCase().indexOf("overnights") > -1) {
                overnight_visitors = r.years
            }

            if (r.data_metric.toLocaleLowerCase().indexOf("same-day") > -1) {
                same_day_visitors = r.years
            }

            if (r.data_metric.toLocaleLowerCase().indexOf("passengers") > -1) {
                same_day_visitors_cruise = r.years
            }
        })

        inbound_tourism_arrivals_list.push({
            country_id: countries[i].id,
            country_name: countries[i].name,
            inbound_tourism: {
                total_arrivals,
                overnight_visitors,
                same_day_visitors,
                same_day_visitors_cruise
            }
        })
    }

    return [...inbound_tourism_arrivals_list];
}