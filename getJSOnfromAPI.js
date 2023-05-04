const https = require("https");
const fs = require("fs");

const jsonAPI = () => {
  const url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";
  https
    .get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        fs.writeFile("json_from_api.txt", data, (err) => {
          if (err) throw err;
          console.log("Success");
        });
      });
    })
    .on("error", (err) => {
      console.log("error");
    });
};

module.exports = { jsonAPI };
