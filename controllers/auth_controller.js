const { response, request } = require("express");
// const { handleDisconnect } = require("../database/config");
const authGet = (req = request, res = response) => {
  // var dbConnect = handleDisconnect();
  // var q = "SELECT COUNT(*) AS count FROM users";
  // dbConnect.query(q, (error, results, fields) => {
  //   if (error) throw error;
  //   console.log(results[0].count);
  //   res.send(`${results[0].count} `);
  //   dbConnect.end();
  // });
  res.json({
      msg:"Auth OK"
    });
};
// const repositoryPost = (req, res = response) => {
//   const body = req.body;
//   res.json({
//     msg: "post controlador",
//     body,
//   });
// };
// const repositoryPut = (req, res = response) => {
//   const id = req.params.id;
//   res.json({
//     msg: "put controlador",
//     id,
//   });
// };
// const repositoryDelete = (req, res = response) => {
//   res.json({
//     msg: "Delete controlador",
//   });
// };
module.exports = {
  authGet,
  // repositoryPost,
  // repositoryPut,
  // repositoryDelete,
};
