import express, { Request, Response, NextFunction } from "express";
var router = express.Router();

/* example page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.status(200).send({ message: "This is sample Auth" });
});

export default router;
