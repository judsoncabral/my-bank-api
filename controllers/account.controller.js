import { promises as fs } from "fs";
import AccountService from "../services/account.service.js";

async function createAccount(req, res, next) {
  try {
    let account = req.body;
    if (account.balance == null || !account.name) {
      throw new Error("Name and Balance are required");
    }
    account = await AccountService.createAccount(account);
    res.send(account);
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
}

async function findAll(req,res,next){
   try {
     const data =await AccountService.findAll();;
     res.send(data);
   } catch (err) {
     next(err);
   } finally {
     res.end();
   }
}

async function findById(req, res, next) {
  try {
    const account = await AccountService.findById(req.params.id);
    res.send(account);
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
}

async function deleteById(req, res, next) {
  try {
    await AccountService.deleteById(req.params.id);
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
}

async function updateAccount(req,res,next){
    try {
      let account = req.body;
      if (!account.id || account.balance == null || !account.name) {
        throw new Error("Id, Name and Balance are required");
      }
      res.send(await AccountService.updateAccount(account));
    } catch (err) {
      next(err);
    } finally {
      res.end();
    }
}

async function updateBalance(req,res,next) {
  try {
    let account = req.body;
    if (account.balance == null || !account.id) {
      throw new Error("Id and Balance are required");
    }
    res.send(await AccountService.updateBalance(account.id, account.balance));
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
}

export default {
  createAccount,
  findAll,
  findById,
  deleteById,
  updateAccount,
  updateBalance,
};

