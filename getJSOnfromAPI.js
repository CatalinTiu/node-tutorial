const https = require("https");
const fs = require("fs");

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
        console.log("success");
      });
    });
  })
  .on("error", (err) => {
    console.log("error");
  });
