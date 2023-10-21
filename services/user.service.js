import UserRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

async function createUser(user) {
  const saltRounds = 8;
  const salt = await bcrypt.genSalt(saltRounds);
  const passwordHash = await bcrypt.hash(user.pass, salt);
  user.pass = passwordHash;

  return await UserRepository.insertUser(user);
}


async function getUsers() {
  return await UserRepository.getUsers();
}

async function getUser(id) {
  return await UserRepository.getUser(id);
}

async function deleteUser(id) {
  await UserRepository.deleteUser(id);
}

async function updateUser(user) {
  return await UserRepository.updateUser(user);
}

export default {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
