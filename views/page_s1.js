// Explore and analyze the provided UNWTO dataset(s)
// and provide insights to at least 5 data
// sets.


// Create 5 insightful visualizations.
// At least 2 of the insights must use a minimum of 2 dataset unions.
// Explain each insight with a short paragraph (a Google docs page)

const URL = "/a1_q1";
const { inbound_tourism_arrivals } = require('../util/inbound_tourism_arrivals');

const TAG = "page_s1";
exports.page_s1 = async (req, res, _next) => {
    try {
        const { } = req;

        const inbound_tourism_arrivals_list = await inbound_tourism_arrivals();

        //console.log(inbound_tourism_arrivals_list);

        return res.render("page_s1", {
            layout: 'inc_layout',
            data: {
                inbound_tourism_arrivals_list
            }
        });

    } catch (error) {
        console.log(TAG, error.message);
        return res.status(500).json({ message: "server error" });
    }
};
