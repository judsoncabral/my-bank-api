import express from "express";
import { promises as fs } from "fs";
import AccountController from "../controllers/account.controller.js";

const router = express.Router();

router.post("/", AccountController.createAccount);

router.get("/", AccountController.findAll);

router.get("/:id", AccountController.findById);

router.delete("/:id", AccountController.deleteById);

router.put("/", AccountController.updateAccount);

router.patch("/updateBalance", AccountController.updateBalance);

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
