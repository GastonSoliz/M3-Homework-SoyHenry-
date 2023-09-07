const http = require("http");
const PORT = 3001;
//const characters = require("./utils/data");
const getCharById = require("./controllers/getCharById");

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const url = req.url.split("/").pop();
    // if (url.includes("rickandmorty/character")) {
    //   const urlID = url.split("/").pop();
    //   let chFound = characters.find((ch) => ch.id === Number(urlID));

    //   res.writeHead(200, { "content-type": "application/json" });
    //   const obj = JSON.stringify(chFound);
    //   res.end(obj);
    // }
    if (req.url.includes("rickandmorty/character")) {
      getCharById(res, url);
    }
  })
  .listen(PORT);
