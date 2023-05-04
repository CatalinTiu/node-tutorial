const http = require("http");
const https = require("https");
const fs = require("fs");
const util = require("util");
const path = require("path");

const readFile = util.promisify(fs.readFile);

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });

    const url = req.url;

    if (url === "/callback") {
      (async () => {
        try {
          const content = await readFile("./json_from_api.txt", "utf-8");
          res.write(content);
          res.end();
        } catch (err) {
          console.error(err);
        }
      })();
    } else if (url === "/convertcvs") {
      const filePath = path.join(__dirname, "CSV_file.csv");
      const f = fs.readFileSync(
        filePath,
        { encoding: "utf-8" },
        function (err) {
          console.log(err);
        }
      );

      f = f.split("\n");

      headers = f.shift().split(",");

      const json = [];
      f.forEach(function (d) {
        tmp = {};
        row = d.split(",");
        for (const i = 0; i < headers.length; i++) {
          tmp[headers[i]] = row[i];
        }
        json.push(tmp);
      });

      const outPath = path.join(__dirname, "newJson.json");
      fs.writeFileSync(outPath, JSON.stringify(json), "utf8", function (err) {
        console.log(err);
      });

      fs.readFile(__dirname + "/newJson.json", function (err, data) {
        res.writeHead(200, { "Content-Type": " application/json" });
        res.write(data);
        res.end();
      });
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
              res.write(data);
              res.end();
              if (err) throw err;
              console.log("success");
            });
          });
        })
        .on("error", (err) => {
          console.log("error");
        });
    }
  })
  .listen(3000, function () {
    // The server object listens on port 3000
    console.log("server start at port 3000");
  });
