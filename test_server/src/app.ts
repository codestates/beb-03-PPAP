import express, { Request, Response, NextFunction } from "express";
const connection = require("./mysql/config/mysql");
const query = require("./mysql/query/query");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:19002",
      "exp://172.30.1.41:19000",
      "exp://ks-299.ressom.nomadweather.exp.direct:80",
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
  })
);

app.get("/welcome", (req: Request, res: Response, next: NextFunction) => {
  query.getClientUser((err: any, data: any) => {
    if (err) {
      // error handling code goes here
      console.log("ERROR : ", err);
    } else {
      // code to execute on data retrieval
      console.log("result from db is : ", data);
      res.send(data);
    }
  });
});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("/ 진입");
  res.send("연결 완료");
});

app.listen("1234", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
});
