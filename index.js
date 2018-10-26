const Server = require("./server");
const Database = require("./database");

(async () => {
  const connection = await Database();
  const server = await Server();
})();
