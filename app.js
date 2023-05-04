const http = require("http");
const https = require("https");
const fs = require("fs");
const util = require("util");
const path = require("path");
const { callback } = require("./callback_to_promise.js");
const { convert } = require("./convertCSV.js");

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
      //res.write(convert());
      res.write(convert());
    } else if (url === "/jsonAPI") {
      const url =
        "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";

      https
        .get(url, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            fs.writeFile("json_from_api.txt", data, (err) => {
              //   res.write(data);
              //   res.end();
              if (err) throw err;
              console.log("success");
            });
          });
        })
        .on("error", (err) => {
          console.log("error");
        });
    } else {
      res.write("Choose a path!");
      res.end();
    }
  })
  .listen(3000, function () {
    // The server object listens on port 3000
    console.log("server start at port 3000");
  });
