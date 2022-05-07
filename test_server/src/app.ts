import express, { Request, Response, NextFunction } from "express";
const connection = require("./mysql/config/mysql");
const query = require("./mysql/query/query");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth");
const holderDIDRouter = require("./routes/holderDID");

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/holderDID", holderDIDRouter);

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

app.listen("1234", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
});
