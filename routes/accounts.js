import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let account = req.body;
    if (account.balance == null || !account.name) {
      throw new Error("Name and Balance are required");
    }
    const data = JSON.parse(await readFile(global.fileName));
    console.log(data);
    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };
    data.accounts.push(account);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
});

router.get("/", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    res.send(account);
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
});

router.put("/", async (req, res, next) => {
  try {
    let account = req.body;
    if (!account.id || account.balance == null || !account.name) {
      throw new Error("Id, Name and Balance are required");
    }
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(
      (accountToFind) => accountToFind.id === parseInt(account.id)
    );
    if( index === -1 ) {
      throw new Error("Account does not exist");
    }
    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
});

router.patch("/updateBalance", async (req, res, next) => {
  try {
    let account = req.body;
    if (account.balance == null || !account.id) {
      throw new Error("Id and Balance are required");
    }
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(
      (accountToFind) => accountToFind.id === parseInt(account.id)
    );
    if (index === -1) {
      throw new Error("Account does not exist");
    }
    data.accounts[index].balance = account.balance;
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
});

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
