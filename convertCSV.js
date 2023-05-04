var fs = require("fs");
var path = require("path");
var http = require("http");

const convert = () => {
  var filePath = path.join(__dirname, "CSV_file.csv");
  var f = fs.readFileSync(filePath, { encoding: "utf-8" }, function (err) {
    console.log(err);
  });

  f = f.split("\n");

  headers = f.shift().split(",");

  var json = [];
  f.forEach(function (d) {
    tmp = {};
    row = d.split(",");
    for (var i = 0; i < headers.length; i++) {
      tmp[headers[i]] = row[i];
    }
    json.push(tmp);
  });

  var outPath = path.join(__dirname, "newJson.json");
  fs.writeFileSync(outPath, JSON.stringify(json), "utf8", function (err) {
    console.log(err);
  });

  const data = fs.readFileSync(__dirname + "/newJson.json");
  return data;
};

module.exports = { convert };
