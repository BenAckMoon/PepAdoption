const { MongoClient } = require("mongodb");
const userDAO = require("./userDAO");
const petDAO = require("./petDAO");

module.exports.initDB = async function initDB() {
  MongoClient.connect(process.env.MONGODB_URI)
    .then(async (connection) => {
      console.log("Connection to DB established");
      await userDAO.injectDB(connection.db(process.env.DB));
      await petDAO.injectDB(connection.db(process.env.DB));

      return;
    })
    .catch((error) => {
      console.log(error);
      console.log(`DB connection failed ${error}`);
      process.exit(1);
    });
};
