const express = require("express");

let publications = [];
let id = 0;
const server = express();

server.use(express.json());

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  if (author && title && contents) {
    const Publicacion = {
      author: author,
      title: title,
      contents: contents,
      id: ++id,
    };
    publications.push(Publicacion);
    res.status(200).json(Publicacion);
  } else
    res.status(400).json({
      error:
        "No se recibieron los parámetros necesarios para crear la publicación",
    });
});

server.get("/posts", (req, res) => {
  const { author, title } = req.query;
  const arr = publications.filter(
    (pub) => pub.author === author && pub.title === title
  );

  if (arr.length) res.status(200).json(arr);
  else
    res.status(400).json({
      error: "No existe ninguna publicación con dicho título y autor indicado",
    });
});

server.get("/posts/:author", (req, res) => {
  const { author } = req.params;
  const arr = publications.filter((pub) => pub.author === author);

  if (arr.length) {
    res.status(200).json(arr);
  } else
    res
      .status(400)
      .json({ error: "No existe ninguna publicación del autor indicado" });
});

server.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (id && title && contents) {
    const idPub = publications.find((pub) => pub.id === id);
    if (idPub) {
      idPub = { ...idPub, title: title, contents: contents };
      res.status(200).json(idPub);
    } else
      res.status(400).json({
        error:
          "No se recibió el id correcto necesario para modificar la publicación",
      });
  }
  res.status(400).json({
    error:
      "No se recibieron los parámetros necesarios para modificar la publicación",
  });
});

server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    const idPub = publications.find((pub) => pub.id === id);
    if (idPub) {
      publications = publications.filter((pub) => pub.id !== id);
      res.status(200).json({ success: true });
    } else
      res.status(400).json({
        error:
          "No se recibió el id correcto necesario para eliminar la publicación",
      });
  } else
    res
      .status(400)
      .json({ error: "No se recibió el id de la publicación a eliminar" });
});

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
