const http = require("http");

const { callback } = require("./callback_to_promise.js");
const { convert } = require("./convertCSV.js");
const { jsonAPI } = require("./getJSOnfromAPI.js");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });

    const url = req.url;

    if (url === "/callback") {
      const content = callback();
      content.then((data) => {
        res.write(data);
      });
    } else if (url === "/convertcvs") {
      res.write(convert());
    } else if (url === "/jsonAPI") {
      jsonAPI();
      res.write("File created!");
    } else {
      res.write("Choose a path!");
      res.end();
    }
  })
  .listen(3000, function () {
    console.log("server start at port 3000");
  });
