const URL = "/";
const { getData } = require('../util/get_data');

exports.page_index = async (req, res, _next) => {
    try {
        const { } = req;

        const data = await getData();

        console.log(data);

        return res.render("page_index", {
            data
        });
    } catch (error) {
        console.log(TAG, error.message);
        return res.status(500).json({ message: "server error" });
    }
};
