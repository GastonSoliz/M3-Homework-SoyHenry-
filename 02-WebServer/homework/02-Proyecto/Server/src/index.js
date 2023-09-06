const http = require("http");
const PORT = 3001;
const characters = require("./utils/data");

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const { url } = req;
    if (url.includes("rickandmorty/character")) {
      const urlID = url.split("/").pop();
      let chFound = characters.find((ch) => ch.id === Number(urlID));

      res.writeHead(200, { "content-type": "application/json" });
      const obj = JSON.stringify(chFound);
      res.end(obj);
    }
  })
  .listen(PORT);
