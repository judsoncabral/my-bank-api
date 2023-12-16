import AccountRepository from "../repositories/account.repository.js";


async function createAccount(account) {
  return await AccountRepository.createAccount(account);
}

async function findAll() {
    return await AccountRepository.findAll();
}

async function findById(id) {
   return await AccountRepository.findById(id);
}

async function deleteById(id) {
    await AccountRepository.deleteById(id);
}

async function updateAccount(account) {
   return await AccountRepository.updateAccount(account);
}

async function updateBalance(id,balance) {
   return await AccountRepository.updateBalance(id, balance);
}

export default {
  createAccount,
  findAll,
  findById,
  deleteById,
  updateAccount,
  updateBalance,
};

