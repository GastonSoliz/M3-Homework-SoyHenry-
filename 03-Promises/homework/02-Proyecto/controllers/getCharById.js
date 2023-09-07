const axios = require("axios");

function getCharById(res, id) {
  axios
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => response.data)
    .then((data) => {
      const char = {
        id: id,
        name: data.name,
        gender: data.gender,
        species: data.species,
        origin: data.origin?.name,
        image: data.image,
        status: data.status,
      };
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(char));
    })
    .catch((error) => {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end(error.message);
    });
}

module.exports = getCharById;
