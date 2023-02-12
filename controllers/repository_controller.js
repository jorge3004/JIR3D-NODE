const { response, request } = require("express");
const { haddleConnect } = require("../database/config");
const repositoryGet = (req = request, res = response) => {
  // const query = mreq.query;
  // const { name = "no", id = "no id" } = req.query;
  // res.json({
  //   msg: "get controlador",
  //   query,
  //   name,
  // });
  // var q = "SELECT * FROM users";

  // var dbConnect = haddleConnect();
  // const usuario = "jorge"
  // var q = "SELECT COUNT(*) AS count FROM users";
  // dbConnect.query(q, (error, results, fields) => {
  //   if (error) throw error;
  //   console.log("Se creo");
  //   res.send(`Se creo table`);
  //   // console.log(results[0].count);
  //   // res.send(`${results[0].count} `);
  //   dbConnect.end();
  // });
  res.send(`Hola Desde repositorio`);
};
const repositoryPost = (req, res = response) => {
  const body = req.body;
  res.json({
    msg: "post controlador",
    body,
  });
};
const repositoryPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "put controlador",
    id,
  });
};
const repositoryDelete = (req, res = response) => {
  res.json({
    msg: "Delete controlador",
  });
};
module.exports = {
  repositoryGet,
  repositoryPost,
  repositoryPut,
  repositoryDelete,
};
