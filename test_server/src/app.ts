import express, { Request, Response, NextFunction } from "express";
// import connection from "./mysql/config/mysql";
import query from "./mysql/query/query";
import cors from "cors";
const app = express();
import authRouter from "./routes/auth";
import holderDIDRouter from "./routes/holderDID";

// app.use(cors());
app.use(
  cors({
    origin: ["exp://ks-299.ressom.nomadweather.exp.direct:80"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
  })
);
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
