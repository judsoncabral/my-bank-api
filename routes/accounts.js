import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile("account.json"));
    console.log(data);
    account = { id: data.nextId++, ...account };
    data.accounts.push(account);
    await writeFile("account.json", JSON.stringify(data));
    res.send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  } finally {
    res.end();
  }
});
export default router;
