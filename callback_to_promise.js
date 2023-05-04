const fs = require("fs");
const util = require("util");
const path = require("path");

const readFile = util.promisify(fs.readFile);
const filePath = path.join(__dirname, "json_from_api.txt");

const callback = async () => {
  try {
    const content = await readFile(filePath, "utf-8");
    return content;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { callback };
