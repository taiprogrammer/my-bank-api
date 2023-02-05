import {
  getAccounts,
  getAccountById,
  deleteAccount,
  updateAccount,
  updateBalanceAccount,
  insert,
} from "../repository/account.repository.js";

export async function create(account, keys) {
  return await insert(account, keys);
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

export async function update(id, nome, balance) {
  return await updateAccount(id, nome, balance);
}

export async function balanceUpdate(id, balance, keys) {
  return await updateBalanceAccount(id, balance, keys);
}
