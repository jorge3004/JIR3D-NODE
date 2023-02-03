import { faker } from "@faker-js/faker";
import mysql from "mysql";

var connection = mysql.createConnection({
  host: "162.241.62.130",
  user: "jirdcom_jir3d",
  password: "300jorge491",
  database: "jirdcom_jir3d",
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});

connection.end();

for (let index = 0; index < 5; index++) {
  console.log(faker.internet.email());
  console.log(faker.address.city());
  console.log(faker.address.state());
}
