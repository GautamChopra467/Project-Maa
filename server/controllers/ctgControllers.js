const axios = require("axios");
module.exports.ctgScan = async (req, res) => {
    try {
        console.log("In ctgController");
        const { user } = req.body;
        console.log(req.body)
        axios.post("http://127.0.0.1:8000/core/test", req.body).then(({ data }) => {

            if (data == "False") {
                res.send(false)
            }
            else {
                res.send(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    } catch (err) {
        console.log(err);
    }
}