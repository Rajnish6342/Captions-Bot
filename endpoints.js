module.exports = (req, res) => {
  var endpoints = new Object();
  (endpoints["status"] = "Bot is Running Currently "),
    
    res.json(endpoints);
};
