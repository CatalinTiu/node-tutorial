const port = 3000;
const http = require("http");
const fs = require("fs");

const routeMap = {
  "/": "html/static.html",
};

server = http.createServer((req, res) => {
  response.writeHead(200, {
    "Content-Type": "text/html",
  });

  if (routeMap[req.url]) {
    fs.readFile(routeMap[req.url], (error, data) => {
      res.write(data);
      res.end();
    });
  } else {
    res.end("<h1>Sorry, page not found</h1>");
  }
});

server.listen(port);
console.log(`The server is listening on port: ${port}`);
