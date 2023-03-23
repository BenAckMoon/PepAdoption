const jwt = require("jsonwebtoken");
const userDAO = require("../dao/userDAO");
const { addPetValidation } = require("../validations/petSchema");

const AuthMiddleware = async (req, res, next) => {
  let { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({
      success: false, message: "Please try and login again",
    });
  }
  authorization = authorization.replace("Bearer ", "");
  try {
    const tokenData = jwt.verify(authorization, process.env.JWT_SECRET);
    const userData = await userDAO.getUserById(tokenData.user_id);
    req.currentUser = userData;
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Unsuccessful decryption of token.",
    });
  }
  next();
};

const RoleCheckerMiddleware = async (req, res, next) => {
  if (req.currentUser.role !== "admin") {
    return res.status(401).send({
      success: false, message: "not permissions for his action",
    });
  }

  next();
};

const ValidatePetObjectMiddleware = async (req, res, next) => {
  const jsonString = req.body.text;
  const reviver = (key, value) => {
    if (/^\d+$/.test(value)) {
      return parseInt(value);
    }
    return value;
  };

  const petObject = JSON.parse(jsonString, reviver);
  const { errors } = addPetValidation(petObject);

  if (errors) {
    return res.status(400).json({ success: false, message: errors });
  }

  next();
};

module.exports = {
  AuthMiddleware, RoleCheckerMiddleware, ValidatePetObjectMiddleware
};
