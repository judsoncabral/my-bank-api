import { promises as fs } from "fs";
const { readFile, writeFile } = fs;


async function createAccount(account) {
  const data = JSON.parse(await readFile(global.fileName));
  account = {
    id: data.nextId++,
    name: account.name,
    balance: account.balance,
  };
  data.accounts.push(account);
  await writeFile(global.fileName, JSON.stringify(data, null, 2));
  return account;
}

async function findAll() {
  const data =  JSON.parse(await readFile(global.fileName));
  return data.accounts;
}

async function findById(id) {
  const accounts = await findAll();
  const account = accounts.find((account) => account.id === parseInt(id));
  if (account) {
      return account;
  }else{
     throw new Error("Account does not exist");
  }
}

async function deleteById(id) {
  const data = JSON.parse(await readFile(global.fileName));
  data.accounts = data.accounts.filter(
    (account) => account.id !== parseInt(id)
  );
  await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

async function updateAccount(account) {
  const data = JSON.parse(await readFile(global.fileName));
  const index = data.accounts.findIndex(
    (accountToFind) => accountToFind.id === parseInt(account.id)
  );
  if (index === -1) {
    throw new Error("Account does not exist");
  }
  data.accounts[index].name = account.name;
  data.accounts[index].balance = account.balance;
  await writeFile(global.fileName, JSON.stringify(data, null, 2));
  return data.accounts[index];
}

async function updateBalance(id, balance) {
  const data = JSON.parse(await readFile(global.fileName));
  const index = data.accounts.findIndex(
    (accountToFind) => accountToFind.id === parseInt(id)
  );
  if (index === -1) {
    throw new Error("Account does not exist");
  }
  data.accounts[index].balance = balance;
  await writeFile(global.fileName, JSON.stringify(data, null, 2));
  return data.accounts[index];
}

export default {
  createAccount,
  findAll,
  findById,
  deleteById,
  updateAccount,
  updateBalance,
};

