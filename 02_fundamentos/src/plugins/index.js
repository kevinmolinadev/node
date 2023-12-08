const { getId } = require("./get_id.plugin");
const { getAge } = require("./get_age.plugin");
const { htttClient } = require("./http.plugin")
module.exports = {
    getId,
    getAge,
    http: htttClient
}