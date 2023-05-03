const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

(async () => {
  try {
    const content = await readFile("./json_from_api.txt", "utf-8");
    console.log(content);
  } catch (err) {
    console.error(err);
  }
})();
