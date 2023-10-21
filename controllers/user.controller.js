import UserService from "../services/user.service.js";
import UserRepository from "../repositories/user.repository.js";

function isPasswordValid(pass) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(pass);
}

async function createUser(req, res, next) {
  try {
    let user = req.body;

    const userAlreadyExists = await UserRepository.userExists(user.email);

    if (userAlreadyExists) {
      throw new Error("Por favor, utilize outro e-mail.");
    }

    if (!isPasswordValid(user.pass)) {
      throw new Error(
        "A senha não atende aos critérios de segurança. A senha deve conter pelo menos 8 caracteres e incluir pelo menos uma letra maiúscula, um número e um caractere especial, como @$!%*?&."
      );
    }

    if (!user.name || !user.email || !user.pass) {
      throw new Error("Nome, Email e Senha são obrigatórios");
    }

    user = await UserService.createUser(user);
    res.send(user);
    logger.info(`POST /user - ${JSON.stringify(user)}`);
  } catch (err) {
    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    res.send(await UserService.getUsers());
    logger.info("GET /user");
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    res.send(await UserService.getUser(req.params.id));
    logger.info("GET /user");
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    await UserService.deleteUser(req.params.id);
    res.end();
    logger.info("DELETE /user");
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    let user = req.body;

    if (!user.id_user || !user.name || !user.email || !user.pass) {
      throw new Error("User ID, Nome, Email e Senha são obrigatórios");
    }

    user = await UserService.updateUser(user);

    res.send(user);
    logger.info(`PUT /user - ${JSON.stringify(user)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
