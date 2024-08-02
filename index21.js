const express = require("express");
const http = require("http");
const url = require("url");

async function main() {
  const app = express();
  const server = http.createServer(app);

  app.get("/api/session", async (req, res) => {
    const result = await url.parse(req.url, true).query;
    console.log(result);
    return res.status(202).json(result);
  });

  server.listen(8081, () => {
    console.log(`server listning at 8081`);
  });
}
main().catch((e) => console.log(e));
