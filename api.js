const axios = require("axios");
const instance = axios.create({ baseURL: 'https://captionss.herokuapp.com/' });
module.exports = instance;