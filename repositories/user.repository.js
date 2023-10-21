import { connect } from "./db.js";

async function userExists(email) {
  const conn = await connect();
  try {
    const resultEmail = await conn.query(
      "SELECT 1 FROM users WHERE email = $1",
      [email]
    );

    return resultEmail.rows.length > 0;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function insertUser(user) {
  const conn = await connect();
  try {
    const sql = "INSERT INTO users (name, email, pass) VALUES ($1, $2, $3)";
    const values = [user.name, user.email, user.pass];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getUsers() {
  const conn = await connect();
  try {
    const res = await conn.query("SELECT * FROM users");
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getUser(id) {
  const conn = await connect();
  try {
    const res = await conn.query("SELECT * FROM users WHERE id_user = $1", [
      id,
    ]);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function deleteUser(id) {
  const conn = await connect();
  try {
    await conn.query("DELETE FROM users WHERE id_user = $1", [id]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function updateUser(user) {
  const conn = await connect();
  try {
  } catch (err) {
    const sql = "UPDATE users SET name = $1, email = $2, pass = $3";
    const values = [user.name, user.email, user.pass];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } finally {
    conn.release();
  }
}

export default {
  insertUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  userExists,
};
