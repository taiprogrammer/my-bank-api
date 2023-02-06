import {
  getAccounts,
  getAccountById,
  deleteAccount,
  updateAccount,
  updateBalanceAccount,
  insert,
} from "../repository/account.repository.js";

export async function create(account) {
  return await insert(account);
}

export async function get() {
  return await getAccounts();
}

export async function getById(id) {
  return await getAccountById(id);
}

export async function deleteById(id) {
  return await deleteAccount(id);
}

export async function update(account) {
  return await updateAccount(account);
}

export async function balanceUpdate(id, balance, keys) {
  return await updateBalanceAccount(id, balance, keys);
}
